const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./db/contacts.js');

const { program } = require('commander');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      try {
        const contacts = await listContacts();
        console.table(contacts);
      } catch (error) {
        console.error(error);
      }
      break;

    case 'getById':
      try {
        const contact = await getContactById(id);
        console.log(contact);
      } catch (error) {
        console.error(error);
      }
      break;

    case 'remove':
      try {
        const contacts = await removeContact(id);
        console.table(contacts);
      } catch (error) {
        console.error(error);
      }
      break;

    case 'add':
      const contacts = await addContact(name, email, phone);
      console.table(contacts);
      break;

    default:
      break;
  }
};

invokeAction(argv);
