const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.resolve(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const contact = JSON.parse(contacts).find(({ id }) => id === contactId);

    return contact;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async id => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const newContacts = JSON.stringify(contacts.filter(item => item.id !== id));

    await fs.writeFile(contactsPath, newContacts);

    return JSON.parse(newContacts);
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const id = contacts.length + 1 + '';

    const contact = {
      id,
      name,
      email,
      phone,
    };

    const newContacts = JSON.stringify([...contacts, contact]);
    fs.writeFile(contactsPath, newContacts);

    return JSON.parse(newContacts);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
