import {Injectable} from '@angular/core';


declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class IndexDbService {
  constructor() {
  }

  public get _uuid(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  openDb(
    onSuccess: (event: IDBDatabase) => void,
  ) {
    return new Promise<void>(async (resolve, reject) => {
      // Open a connection to the database
      const db = await (window as any).indexedDB.open('lasagna-db', 1);

      // // Create a new object store if it doesn't exist
      // if (!db.objectStoreNames.contains('my-store')) {
      //   db.createObjectStore('my-store');
      // }

      db.onerror = (event: Event) => {
        reject(event);
      };
      db.onsuccess = (event: Event) => {
        onSuccess((event.target as any)?.result as IDBDatabase);
      };

      // This event is only implemented in recent browsers
      db.onupgradeneeded = (event: any) => {
        // Save the IDBDatabase interface
        const db = (event.target as any)?.result as IDBDatabase;

        // Create an objectStore for this database
        const productsStore = db.createObjectStore("productsStore", {
          keyPath: "uuid",
          autoIncrement: true
        });

        productsStore.createIndex("name", "name", {unique: false});

        const recipesStore = db.createObjectStore("recipesStore", {
          keyPath: "uuid",
          autoIncrement: true
        });

        recipesStore.createIndex("name", "name", {unique: false});
      };

      resolve();
    });
  }

  addData(storeKey: string, value: any) {
    // Open the database
    this.openDb(indexedDB => {
      const transaction = indexedDB.transaction(storeKey, 'readwrite');

      const store = transaction.objectStore(storeKey);
      // Put the data in the store
      store.add({
        ...value,
        uuid: this._uuid
      });
    });
  }
}

//
//   async getData(key: string) {
//     // Open the database
//     const db = await this.openDb();
//
//     // Open a transaction
//     const transaction = db.transaction('my-store', 'readonly');
//
//     // Get the object store
//     const store = transaction.objectStore('my-store');
//
//     // Get the data from the store
//     return store.get(key);
//   }
//
//   async deleteData(key: string) {
//     // Open the database
//     const db = await this.openDb();
//
//     // Open a transaction
//     const transaction = db.transaction('my-store', 'readwrite');
//
//     // Get the object store
//     const store = transaction.objectStore('my-store');
//
//     // Delete the data from the store
//     store.delete(key);
//   }
//
//   async clearData() {
//     // Open the database
//     const db = await this.openDb();
//
//     // Open a transaction
//     const transaction = db.transaction('my-store', 'readwrite');
//
//     // Get the object store
//     const store = transaction.objectStore('my-store');
//
//     // Clear the data from the store
//     store.clear();
//   }
// }
