enum ERROR_DATABASE_CODE {
  NOT_INITIALIZED = 0,
  DOCUMENT_NOT_FOUND = 1,
  DOCUMENT_CONFLICT = 2
}

enum ERROR_TOAST_CODE {
  UNKNOWN = 0,
  UNKNOWN_DOCUMENT = 1
}

enum ERROR_TOAST_TITLE {
  ERROR = 'Error',
  INFORMATION = 'Information',
  WARNING = 'Warning'
}

enum ERROR_TOAST_DESCRIPTION {
  UNKNOWN = 'Unknown error, please ask your administrator',
  UNKNOWN_DOCUMENT = 'Cannot found the integrity of this document, please ask your administrator'
}

enum ERROR_DATABASE_MESSAGE {
  NOT_INITIALIZED = 'Database cannot be initialized',
  DOCUMENT_NOT_FOUND = 'Document cannot be found, please check your _id',
  DOCUMENT_CONFLICT = 'Database conflict, please refer to https://pouchdb.com/guides/conflicts.html'
}

class DatabaseError extends Error {
  constructor(error: EBaseError | EBaseDatabaseError) {
    super(error.message);
    
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}

class DatabaseNotInitializedError extends DatabaseError {
  constructor() {
    super({
      code: ERROR_DATABASE_CODE.NOT_INITIALIZED,
      message: ERROR_DATABASE_MESSAGE.NOT_INITIALIZED
    });
    
    Object.setPrototypeOf(this, DatabaseNotInitializedError.prototype);
  }
}

class DatabaseDocumentNotFoundError extends DatabaseError {
  constructor() {
    super({
      code: ERROR_DATABASE_CODE.DOCUMENT_NOT_FOUND,
      message: ERROR_DATABASE_MESSAGE.DOCUMENT_NOT_FOUND
    });
    
    Object.setPrototypeOf(this, DatabaseDocumentNotFoundError.prototype);
  }
}

class DatabaseConflictError extends DatabaseError {
  constructor() {
    super({
      code: ERROR_DATABASE_CODE.DOCUMENT_CONFLICT,
      message: ERROR_DATABASE_MESSAGE.DOCUMENT_CONFLICT
    });
    
    Object.setPrototypeOf(this, DatabaseConflictError.prototype);
  }
}

class DocumentUnknownError {
  constructor() {
    return {
      code: ERROR_TOAST_CODE.UNKNOWN_DOCUMENT,
      title: ERROR_TOAST_TITLE.ERROR,
      message: ERROR_TOAST_DESCRIPTION.UNKNOWN_DOCUMENT
    };
  }
}

export {
  DatabaseNotInitializedError,
  DatabaseDocumentNotFoundError,
  DatabaseConflictError,
  DocumentUnknownError,
  ERROR_TOAST_CODE,
  ERROR_TOAST_DESCRIPTION,
  ERROR_TOAST_TITLE
};