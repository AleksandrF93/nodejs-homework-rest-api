const path = require('path');
const fs = require('fs/promises');
const { v4 } = require('uuid');
const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf8');
  const contacts = JSON.parse(data);

  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);

  if (!result) return null;

  return result;
}

const deleteContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId);

  if (idx === -1) return null;

  const updatedContacts = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

  return contacts[idx];
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: v4() };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
}

const updateContact = async (contactId, name, phone, email) => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex(contact => contact.id === contactId);

  if (contactIdx !== -1) {
  contacts[contactIdx].name = name;
  contacts[contactIdx].phone = phone;
  contacts[contactIdx].email = email;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));

  return contacts[contactIdx];
  } else {
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
}
