const express = require('express');
const router = express.Router();
const { validation, controllersWrapper } = require('../../middlewares');
const { contactSchema, contactFavoriteSchema } = require('../../models');
const { contacts: controller } = require('../../controllers');



router.get('/', controllersWrapper(controller.listContacts));

router.get('/:contactId', controllersWrapper(controller.getContactById));

router.post('/', validation(contactSchema), controllersWrapper(controller.addContact));

router.delete('/:contactId', controllersWrapper(controller.removeContact));

router.put('/:contactId', validation(contactSchema), controllersWrapper(controller.updateContact));

router.patch('/:contactId/favorite', validation(contactFavoriteSchema), controllersWrapper(controller.updateContactFavorite));

module.exports = router;
