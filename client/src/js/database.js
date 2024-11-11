import { openDB } from 'idb';

// Database setup
const dbPromise = openDB('my-database', 1, {
  upgrade(db) {
    db.createObjectStore('my-store', {
      keyPath: 'id',
    });
  },
});

export const openDB = async () => {
  return dbPromise;
};

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

  // TODO: Add logic to a method that accepts some content and adds it to the database
  export const putDb = async (content) => {
    const db = await initDb(); // Initialize the database
    try {
      const result = await db.add('jate', content); 
      console.log('Content added with ID:', result);
      return result; // Return the ID of the added content
    } catch (err) {
      console.error('Error adding content to the IndexedDB:', err);
    }
  };

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

export const getAllContent = async () => {
  const db = await getDb();
  const allContent = await db.getAll('jate'); 
  return allContent;
};

const displayContent = async () => {
  try {
    const content = await getAllContent();
    console.log(content); 
  } catch (error) {
    console.error('Error retrieving content:', error);
  }
};

displayContent();

initdb();
