const { Contact } = require('../models/contacts');
const {
  WrongParametersError,
  UpdateParametersError
} = require('../helpers/errors');

const getContacts = async (userId, { skip, limit }) => {
  const contacts = await Contact.find({ userId })
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit)
    .sort("_phone");
  console.log(contacts);
  return contacts;
};

const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId });
  if (!contact) {
    throw new WrongParametersError(`failure, no contact with id '${contactId}'found!`);
  }
  return contact;
};

const addContact = async ({ name, phone, email }, userId) => {
  const contact = new Contact({ name, phone, email, userId });
  const contacts = await contact.save();
  return contacts;
};

const changeContactById = async (contactId, { name, email, phone }, userId) => {
  await Contact.findOneAndUpdate({ _id: contactId, userId }, { $set: { name, email, phone } });
};

const deleteContactById = async (contactId, userId) => {
  await Contact.findOneAndRemove({ _id: contactId, userId });
};

const updateStatusContact = async (contactId, { favorite }) => {
  const contacts = await Contact.findByIdAndUpdate(contactId, { favorite });
  if (!contacts) {
    throw new UpdateParametersError();
  }
  return contacts;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  deleteContactById,
  updateStatusContact,
};