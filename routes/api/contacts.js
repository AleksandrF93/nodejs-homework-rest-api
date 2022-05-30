const express = require('express')
const contacts = require('../../models/contacts');
const Joi = require('joi');
const router = express.Router();

const schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(2)
    .max(20)
    .required(),
  email: Joi.string()
    .required(),
  phone: Joi.string()
    .min(5)
    .max(20)
    .required(),
});

router.get('/', async (req, res, next) => {
  try {
    const contact = await contacts.listContacts();

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const result = await contacts.getContactById(contactId);
    if (!result) res.status(404).json({ status: `Failure, no contact with id '${contactId}'found!` });

    res.json({
      status: 'succes',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const result = await contacts.addContact(req.body);

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.deleteContact(contactId);

    if (!result) res.status(404).json({ status: `Failure, no contact with id '${contactId}'found!` });

    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const { name, phone, email } = req.body;
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, name, phone, email);

    if (!result)  
        res.status(404).json({ status: `Failure, no contact with id '${contactId}'found!` });
        
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
