const { registration, login, registrationVerification, verification, forgotPassword } = require('../services/auth.service');
const { User } = require('../models/user');

const registrationController = async (req, res) => {
  const { email, password, subscription, avatarURL } = req.body;
  await registration(email, password, subscription, avatarURL);
  res.json({
    status: "success"
  });
};

const  registerVerifyController = async (req, res) => {
  const { code } = req.params;
  await registrationVerification(code);
  res.json({ status: "success" });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);
  res.json({ status: "success", token });
};

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

const getCurrentUserController = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

const  forgotPasswordController = async (req, res) => {
      const { email } = req.body;
      await forgotPassword(email);
      res.json({ status: "success" });
    };

const verifyController = async (req, res) => {
  const { email, code} = req.body;
  await verification(email, code);
  res.json({ status: "success" });

    };

module.exports = {
  registrationController,
  registerVerifyController,
  loginController,
  logoutController,
  getCurrentUserController,
  forgotPasswordController,
  verifyController
};
