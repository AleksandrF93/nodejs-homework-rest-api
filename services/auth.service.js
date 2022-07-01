const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sha256 = require('sha256');
const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const { User } = require('../models/user');
const { NotAuthorizedError } = require('../helpers/errors');
const { Verification } = require('../models/verification');

const registration = async (email, password) => {
  const user = new User({ email, password });
  await user.save();

  const code = sha256(email + JWT_SECRET);
  const verification = new Verification({
    code,
    userId: user._id,
  });
  await verification.save();

  const msg = {
  to: email,
  from: 'aleksandrfedorenko525@gmail.com',
  subject: 'Thank you for registration!',
  text: `Please, confirm your email address, POST http://localhost:8083/api/auth/registration_confirmed/${code}`,
  html: `Please, confirm your email address, POST http://localhost:8083/api/auth/registration_confirmed/${code}`,
  };
  await sgMail.send(msg);
};

const registrationVerification = async (code) => {
  const verification = await Verification.findOne({
    code,
    active: true
  });
  if (!verification) {
    throw new NotAuthorizedError('Invalid or expired confirmation code');
  }
  const user = await User.findById(verification.userId);
  if (!user) {
    throw new NotAuthorizedError('No user found');
  }
  verification.active = false;
  await verification.save()

  user.confirmed = true;
  await user.save();

  const msg = {
    to: user.email,
    from: 'aleksandrfedorenko525@gmail.com',
    subject: 'Thank you for registration!',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<h1>and easy to do anywhere, even with Node.js</h1>',
  };
  await sgMail.send(msg);

};

const login = async (email, password) => {
  const user = await User.findOne({ email, confirmed: true });
  if (!user) {
    throw new NotAuthorizedError(`No user with email '${email}' found`);
  }
  if (!await bcrypt.compare(password, user.password)) {
    throw new NotAuthorizedError(`Wrong password`);
  };

  const token = jwt.sign({
    _id: user._id,
    createdAt: user.createdAt
  }, JWT_SECRET);


  return token;
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email, confirmed: true });
  if (!user) {
    throw new NotAuthorizedError(`No user with email '${email}' found`);
  }
  const password = sha256(Date.now() + JWT_SECRET);
  user.password = password;
  await user.save();

  const msg = {
    to: user.email,
    from: 'aleksandrfedorenko525@gmail.com', 
    subject: 'forgot password',
    text: `Here is you temporary passsword:${password}`,
    html: `Here is you temporary passsword:${password}`,
  };
  await sgMail.send(msg);
};

const verification = async (email, res) => {
  if (!email) {
    throw new NotAuthorizedError('missing required field email')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotAuthorizedError('User not found')
  }
  if (user.confirmed) {
    throw new NotAuthorizedError('Verification has already been passed')
  }

  const password = sha256(Date.now() + JWT_SECRET);
  user.password = password;
  await user.save();
  const msg = {
    to: user.email,
    from: 'aleksandrfedorenko525@gmail.com', 
    subject: 'forgot password',
    text: `Here is you temporary passsword:${password}`,
    html: `Here is you temporary passsword:${password}`,
  };
  await sgMail.send(msg);

    res.json({ message: 'Verification email sent' })
  
  };

module.exports = {
  registration,
  login,
  registrationVerification,
  forgotPassword,
  verification
};
