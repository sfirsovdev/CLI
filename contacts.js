const { v4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve(__dirname, 'db/contacts.json');

async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = data ? JSON.parse(data) : [];
    return contacts;
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === contactId);
    return contact ? contact : null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
        return null;
    }
    const removedContact = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: v4(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};