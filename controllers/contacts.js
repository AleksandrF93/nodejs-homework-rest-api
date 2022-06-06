const {Contact} = require("../models");
const { createError } = require("../helpers/errors");

const listContacts = async (req, res) => {
  const contacts = await Contact.find({}, {}, {});

  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) throw createError(404, `Product with id=${contactId} not found`);

  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) throw createError(404, `Product with id=${contactId} not found`);

  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
    data: {
      result,
    },
  });
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

  if (!result) throw createError(404, `Product with id=${contactId} not found`);

  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

const updateContactFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

  if (!result) throw createError(404,`Product with id=${contactId} not found`);

  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactFavorite,
};