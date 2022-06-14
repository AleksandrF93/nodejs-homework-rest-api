const {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  deleteContactById,
  updateStatusContact,
} = require('../services/contact.service');

const getContactsController = async (req, res, next) => {
  const { _id: userId } = req.user;
  let { skip = 0, limit = 5 } = req.query;
  limit = parseInt(limit) > 10 ? 10 : parseInt(limit);
  skip = parseInt(skip);
  const contacts = await getContacts(userId, { skip, limit });
  res.json({ contacts, skip, limit });
};

const getContactByIdController = async (req, res, next) => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;
  const contact = await getContactById(contactId, userId);
  res.json({ contact, status: "succsess" });
};

const addContactController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { name, phone, email } = req.body;
  await addContact({ name, phone, email }, userId);
  res.json("succsess");
};

const changeContactController = async (req, res, next) => {
  const { name, phone, email } = req.body;
  const { contactId } = req.params;
  await changeContactById(contactId, { name, phone, email });
  res.json({ status: "200" });
};

const deleteContactController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { id: contactId } = req.params;
  deleteContactById(contactId, userId);
  res.json({ status: "succsess" });
};

const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  await updateStatusContact(contactId, { favorite });
  res.json({ status: "success OK" });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  changeContactController,
  deleteContactController,
  patchContactController,
};