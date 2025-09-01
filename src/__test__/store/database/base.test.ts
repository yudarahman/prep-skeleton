/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';

import Database from '@/store/database/base';
import { encrypt } from '@/lib/encryptor';
import { DatabaseDocumentNotFoundError } from '@/constants/errors';

vi.mock('pouchdb', () => {
  return {
    default: vi.fn()
      .mockImplementation(() => {
        return {
          get: (id?: string) => new Promise((resolve, reject) => {
            switch (id) {
              case 'found': {
                const encrypted = {
                  '_id': 'found',
                  '_rev': 'found_rev',
                  value: encrypt({ id: 1, name: 'test-some-random-name' })
                };
                
                resolve(encrypted);
                break;
              }
              case 'not_found': {
                reject({ error: true });
                break;
              }
              default: {
                reject({ error: 'default_error' });
                break;
              }
            }
          }),
          put: ({ _id, value }: { _id: string, value: any }) => new Promise((resolve, reject) => {
            switch (_id) {
              case 'found': {
                resolve({ _id: 'found', value: encrypt(value) });
                break;
              }
              case 'exist': {
                resolve({ _id: 'exist', value: encrypt(value) });
                break;
              }
              case 'not_exist': {
                resolve({ _id: 'not_exist', value: encrypt(value) });
                break;
              }
              default: {
                reject({ error: 'default_error' });
                break; 
              }
            }
          }),
          remove: ({ _id }: { _id: string }) => new Promise((resolve, reject) => {
            switch (_id) {
              case 'found': {
                resolve({ ok: true });
                break;
              }
              case 'not_found': {
                reject({ error: true });
                break;
              }
              default: {
                reject({ error: 'default_error' });
                break;
              }
            }
          }),
          destroy: () => new Promise((resolve) => {
            resolve({ ok: true });
          })
        };
      })
  };
});

describe('store/database/base.ts', () => {
  it('should return expected value when get and _id is "found"', async () => {
    const mockDatabase = new Database<Record<string, string>>();
    
    await expect(mockDatabase.getData('found'))
      .resolves
      .toStrictEqual({
        '_id': 'found',
        '_rev': 'found_rev',
        value: { id: 1, name: 'test-some-random-name' }
      });
  });

  it('should throw with custom Error when get and _id is "not_found"', async () => {
    const mockDatabase = new Database<Record<string, string>>();

    await expect(mockDatabase.getData('not_found'))
      .rejects
      .toThrowError(new DatabaseDocumentNotFoundError());
  });

  it('should throw with custom error when get and _id is "not_found_some_random_id"', async () => {
    const mockDatabase = new Database<Record<string, string>>();

    await expect(mockDatabase.getData('not_found_some_random_id'))
      .rejects
      .toThrowError(new DatabaseDocumentNotFoundError());
  });

  it('should return with truthy when put and _id is "found"', async () => {
    const mockDatabase = new Database<Record<string, string>>();

    await expect(mockDatabase.putData({
      _id: 'found',
      value: { id: '1', name: 'test-some-random-name-for-upsert' }
    }))
      .resolves
      .toBeTruthy();
  });

  it('should return with truthy when put and _id is "exist"', async () => {
    const mockDatabase = new Database<Record<string, string>>();

    await expect(mockDatabase.putData({
      _id: 'exist',
      value: { id: '1', name: 'test-some-random-name' }
    }))
      .resolves
      .toBeTruthy();
  });

  it('should return with truthy when put and _id is "not_exist"', async () => {
    const mockDatabase = new Database<Record<string, string>>();

    await expect(mockDatabase.putData({
      _id: 'not_exist',
      value: { id: '1', name: 'test-some-random-name' }
    }))
      .resolves
      .toBeTruthy();
  });

  it('should throw with custom error when put and _id is "not_found_some_random_id"', async () => {
    const mockDatabase = new Database<Record<string, string>>();

    await expect(mockDatabase.putData({
      _id: 'not_found_some_random_id',
      value: { id: '1', name: 'test-some-random-name'}
    }))
      .rejects
      .toThrowError(new DatabaseDocumentNotFoundError());
  });
  
  it('should return with truthy when remove and _id is "found"', async () => {
    const mockDatabase = new Database<Record<string, string>>();
    
    await expect(mockDatabase.deleteData('found'))
      .resolves
      .toBeUndefined();
  });

  it('should return with truthy when remove and _id is "not_found"', async () => {
    const mockDatabase = new Database<Record<string, string>>();

    await expect(mockDatabase.deleteData('not_found'))
      .rejects
      .toThrowError(new DatabaseDocumentNotFoundError());
  });

  it('should return with truthy when destroy', async () => {
    const mockDatabase = new Database<Record<string, string>>();

    await expect(mockDatabase.deleteDatabase())
      .resolves
      .toBeTruthy();
  });
});