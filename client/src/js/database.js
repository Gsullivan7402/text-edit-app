import { openDB } from 'idb';

// Initialize the database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add content to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Create a connection to the database and version we want to use.
  const contactDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .put() method on the store and pass in the content.
  const request = store.put({ id: 1, value: content });

  // Confirm the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Retrieve all content from the database
export const getDb = async () => {
  console.log('GET from the database');
  
  // Create a connection to the database and version we want to use.
  const contactDb = await openDB('jate', 1);
  
  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('jate', 'readonly');
  
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  
  // Retrieve all data in the database.
  const request = store.getAll();
  
  // Confirm the request.
  const result = await request;
  console.log('Data retrieved from the database', result);
  return result;
};

// Initialize the database when the module is evaluated
initdb();
