const express = require('express')

const router = express.Router();
const {addContactValidation,  putContactsValidation, favoriteContactScheme} = require('../middlewares/validation');
const {asyncWrapper} = require('../helpers/apiHelpers');
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  changeContactController,
  deleteContactController,
  patchContactController
} = require('../controllers/contacts');
const {authMiddleware}  = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', asyncWrapper(getContactsController));
router.get('/:contactId', asyncWrapper(getContactByIdController));
router.post('/', addContactValidation, asyncWrapper(addContactController));
router.put('/:contactId', putContactsValidation, asyncWrapper(changeContactController));
router.delete('/:contactId', asyncWrapper(deleteContactController));
router.patch('/:contactId/favorite',favoriteContactScheme, asyncWrapper(patchContactController))

module.exports = router;