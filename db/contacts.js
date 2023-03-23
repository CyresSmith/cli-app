const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.resolve(__dirname, 'contacts.json');

/**
 * Получает контакты из файла contacts.json.
 * @return {array} contacts, массив объектов с контактами
 */
const parsedContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.error(error.message);
  }
};

/**
 * Записывает контакы в файл contacts.json.
 * @param {array} contacts, массив объектов с контактами
 */
const writeContacts = async contacts => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.error(error.message);
  }
};

/**
 * Получает и озвращает объект контакта с заданным ID.
 * @param {string} contactId, ID контакта.
 * @return {object} contact, объект с данными контакта.
 */
const getContactById = async contactId => {
  try {
    const contacts = await parsedContacts();
    const contact = contacts.find(({ id }) => id === contactId);

    return contact;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Удаляет контакт с заданным ID из массива контактов файла contacts.json
 * @param {string} contactId, ID контакта.
 * @return {array} newContacts, массив обновленных контактов.
 */
const removeContact = async id => {
  try {
    const contacts = await parsedContacts();
    const newContacts = contacts.filter(item => item.id !== id);
    await writeContacts(newContacts);

    return newContacts;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Добавляет объект контакта в массив контактов файла contacts.json,
 * @param {string} name, имя.
 * @param {string} email, электронная почта.
 * @param {string} phone, номер телефона.
 * @return {array} newContacts, массив обновленных контактов.
 */
const addContact = async (name, email, phone) => {
  try {
    const contacts = await parsedContacts();

    const contact = {
      id: contacts.length + 1 + '',
      name,
      email,
      phone,
    };

    const newContacts = [...contacts, contact];
    await writeContacts(newContacts);

    return newContacts;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  parsedContacts,
  getContactById,
  addContact,
  removeContact,
};
