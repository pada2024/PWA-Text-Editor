import { openDB } from 'idb';


// export const openDB = async () => {
//   return dbPromise;
// };

const initDb = async () =>
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
    const db = await openDB('jate'); // Initialize the database
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    try {
      const result = await store.put({'jate':content, id:1}); 
      console.log('Content added with ID:', result);
      return result; // Return the ID of the added content
    } catch (err) {
      console.error('Error adding content to the IndexedDB:', err);
    }
  };

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () =>{
  const db = await openDB('jate'); // Initialize the database
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    try {
      const result = await store.get(1); 
      console.log('Content added with ID:', result);
      return result?.jate; // Return the ID of the added content
    } catch (err) {
      console.error('Error adding content to the IndexedDB:', err);
    }
}


initDb();
