import {
  describe,
  expect,
  it
} from 'vitest';

import {
  decrypt,
  encrypt
} from '@/lib/encryptor';

describe('lib/encryptor.ts', () => {
  it('Should return expected value (string) when value encrypted', () => {
    const actualString = 'test-actual-string';
    const expectedString = encrypt(actualString);

    expect(expectedString).to.not.equal(actualString);
  });

  it('Should return expected value (number) when value encrypted', () => {
    const actualNumber = 0.5876;
    const expectedString = encrypt(actualNumber);

    expect(expectedString).to.not.equal(actualNumber);
  });

  it('Should return expected value (boolean) when value encrypted', () => {
    const actualBoolean = false;
    const expectedString = encrypt(actualBoolean);

    expect(expectedString).to.not.equal(actualBoolean);
  });

  it('Should return expected value (object) when value encrypted', () => {
    const actualObject = { id: 1, name: 'test-some-random-name' };
    const expectedString = encrypt(actualObject);

    expect(expectedString).to.not.equal(actualObject);
  });

  it('Should return expected value (string) when value decrypted', () => {
    const actualString = 'test-actual-string';
    const encryptedString = encrypt(actualString);
    const expectedString = decrypt(encryptedString);

    expect(expectedString).to.equal(actualString);
  });

  it('Should return expected value (number) when value decrypted', () => {
    const actualNumber = 308.154;
    const encryptedString = encrypt(actualNumber);
    const expectedNumber = decrypt(encryptedString);

    expect(expectedNumber).to.equal(actualNumber);
  });

  it('Should return expected value (boolean) when value decrypted', () => {
    const actualBoolean = true;
    const encryptedString = encrypt(actualBoolean);
    const expectedBoolean = decrypt(encryptedString);

    expect(expectedBoolean).to.equal(actualBoolean);
  });

  it('Should return expected value (object) when value decrypted', () => {
    const actualObject = { id: 1, name: 'test-some-random-name' };
    const encryptedString = encrypt(actualObject);
    const expectedObject = decrypt(encryptedString);

    expect(expectedObject).toStrictEqual(actualObject);
  });
});