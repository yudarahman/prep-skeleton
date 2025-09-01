import PouchDB from 'pouchdb';

import {
  encrypt,
  decrypt
} from '@/lib/encryptor';
import {
  DatabaseConflictError,
  DatabaseDocumentNotFoundError
} from '@/constants/errors';

class Database<T> {
  private readonly db: PouchDB.Database;

  constructor() {
    this.db = new PouchDB<DDocumentType<T>>(`${import.meta.env.VITE_DATABASE_NAME}`);
  }

  /**
   * @param {string} id your document's `_id`
   * */
  getData(id: DDocumentType<T>['_id']): Promise<DDocumentType<T>> {
    return new Promise((resolve, reject) => {
      this.db.get(id)
        .then((data) => {
          const {
            value,
            ...rest
          } = data as PouchDB.Core.IdMeta & PouchDB.Core.GetMeta & { value: string };
          const decryptedData = {
            ...rest,
            value: decrypt(value)
          } satisfies DDocumentType<T>;

          resolve(decryptedData);
        })
        .catch(() => reject(new DatabaseDocumentNotFoundError()));
    });
  }

  /**
   * @param {Object} data as { _id: 'string', value: <encoded-value-as-string> }
   * @throws {DatabaseConflictError} when conflict happened inside update mechanism
   * @throws {DatabaseDocumentNotFoundError} when document `data._id` cannot be found
   * */
  putData(data: DDocumentType<T>): Promise<PouchDB.Core.Response> {
    const {
      value,
      ...rest
    } = data;

    return new Promise((resolve, reject) => {
      this.db.get(data._id)
        .then((oldValue) => {
          /**
           * if `_id` already there, do upsert
           * */
          this.db.put({
            ...oldValue,
            ...rest,
            value: encrypt(value)
          })
            .then((updateValue) => resolve(updateValue))
            .catch(() => reject(new DatabaseConflictError()));
        })
        .catch(() => {
          /**
           * if `_id` not there, do insert
           * */
          this.db.put({
            ...rest,
            value: encrypt(value)
          })
            .then((newValue) => resolve(newValue))
            .catch(() => reject(new DatabaseDocumentNotFoundError()));
        });
    });
  }

  deleteData(id: DDocumentType<T>['_id']): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.get(id)
        .then((data) => {
          this.db.remove(data)
            .then(() => resolve())
            .catch(() => reject(new DatabaseDocumentNotFoundError()));
        })
        .catch(() => reject(new DatabaseDocumentNotFoundError()));
    });
  }

  deleteDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.destroy()
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }
}

export default Database;