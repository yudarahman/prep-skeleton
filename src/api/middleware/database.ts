/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Middleware,
  UnknownAction
} from '@reduxjs/toolkit';
import {
  isUndefined,
  isNull,
  omit
} from 'lodash';

import Database from '@/store/database/base';
import { DatabaseDocumentNotFoundError } from '@/constants/errors';

import NetworkStatus from '@/lib/network';
import { decrypt } from '@/lib/encryptor';

const saveToDatabase = async <T>(id: string, data: any) => {
  const db = new Database<T>();
  const doc = { _id: id, value: data };
  await db.putData(doc);

  return await db.getData(id);
};

const getFromDatabaseWhenOffline = async (next: any, action: any) => {
  const typedAction = action as UnknownAction;

  if (!isUndefined(typedAction.payload)
    && (typedAction.payload as { [key: string]: any })?.status === 'FETCH_ERROR') {
    const networkStatus = new NetworkStatus();
    const typedActionMeta = (typedAction.meta as { [key: string]: any });
    const databaseId = (typedActionMeta.baseQueryMeta.request.headers as Headers).get('_id');

    if (!isNull(databaseId)) {
      if (networkStatus.isNetworkOnline()) {
        return next(typedAction);
      }

      // Network if offline
      try {
        const db = new Database<unknown>();
        const { value } = await db.getData(decrypt(databaseId));

        return next({
          ...typedAction,
          type: typedAction.type.replace('/rejected', '/fulfilled'),
          payload: value,
          meta: {
            ...typedActionMeta,
            baseQueryMeta: { status: 'fulfilled' }
          }
        });
      } catch (err: DatabaseDocumentNotFoundError | unknown) {
        if (err instanceof DatabaseDocumentNotFoundError) {
          return next({
            ...typedAction,
            error: err
          });
        }

        return next(typedAction);
      }
    }

    return next(typedAction);
  }

  return next(typedAction);
};

const saveToDatabaseMiddleware = async (next: any, action: any) => {
  const typedAction = action as UnknownAction;
  
  const typedActionMeta = (typedAction.meta as { [key: string]: any });
  const omitPayload = omit((typedAction.payload as { [key: string]: any }), 'authenticatorOptions');
  const databaseId = (typedActionMeta.baseQueryMeta.request.headers as Headers).get('_id');

  if (!isNull(databaseId)) {
    const { value } = await saveToDatabase(decrypt(databaseId), omitPayload);

    return next({
      ...typedAction,
      payload: value
    });
  }
    
  return next(typedAction);
};

const databaseConnectionMiddleware: Middleware = () => (next) => async (action) => {
  const typedAction = action as UnknownAction;
  
  switch (true) {
    case typedAction.type.includes('fulfilled'): {
      await saveToDatabaseMiddleware(next, action);
      break;
    }
    case typedAction.type.includes('rejected'): {
      await getFromDatabaseWhenOffline(next, action);
      break;
    }
    default: {
      next(typedAction);
      break;
    }
  }
};

export { databaseConnectionMiddleware };