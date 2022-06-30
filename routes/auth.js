const express = require('express')
const router = express.Router();
const {asyncWrapper} = require('../helpers/apiHelpers');
const {
     registrationController,
     registerVerifyController,
     loginController,
     logoutController,
     getCurrentUserController,
     verifyController,
     forgotPasswordController } = require('../controllers/auth');

const { authMiddleware, ctrlWrapper} = require('../middlewares/authMiddleware');

router.post('/registration', asyncWrapper(registrationController));
router.post('/registration_confirmed/:code', asyncWrapper(registerVerifyController));
router.post('/verify', asyncWrapper(verifyController));
router.post('/forgot_password', asyncWrapper(forgotPasswordController));
router.post('/login', asyncWrapper(loginController));
router.get('/current', authMiddleware, ctrlWrapper(getCurrentUserController));
router.get('/logout', authMiddleware, ctrlWrapper(logoutController));

module.exports = router;
