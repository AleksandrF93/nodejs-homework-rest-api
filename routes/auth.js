const express = require('express')
const router = express.Router();
const {asyncWrapper} = require('../helpers/apiHelpers');
const {
     registrationController,
     loginController,
     logoutController,
     getCurrentUserController} = require('../controllers/auth');

const { authMiddleware, ctrlWrapper} = require('../middlewares/authMiddleware');

router.post('/registration', asyncWrapper(registrationController));
router.post('/login', asyncWrapper(loginController));
router.get('/current', authMiddleware, ctrlWrapper(getCurrentUserController));
router.get('/logout', authMiddleware, ctrlWrapper(logoutController));

module.exports = router;
