const { registration, login } = require('../services/auth.service');
const { User } = require('../models/user');

const registrationController = async (req, res) => {
  const { email, password, subscription } = req.body;
  await registration(email, password, subscription);
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

module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
};
