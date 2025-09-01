/* eslint-disable @typescript-eslint/no-explicit-any */
import { AES, enc } from 'crypto-js';

const secret = `${import.meta.env.VITE_SECRET_AES}`;

const encrypt = (value: any): string => {
  switch (typeof value) {
    case 'string':
      return AES.encrypt(value, secret).toString();
    case 'number':
      return AES.encrypt(value.toString(), secret).toString();
    case 'boolean':
      return AES.encrypt(value.toString(), secret).toString();
    default: {
      const stringifyValue = JSON.stringify(value);

      return AES.encrypt(stringifyValue, secret).toString();
    }
  }
};

const decrypt = (value: string): any => {
  const decrypted = AES.decrypt(value, secret).toString(enc.Utf8);

  try {
    return JSON.parse(decrypted);
  } catch (err) {
    return decrypted;
  }
};

export {
  encrypt,
  decrypt
};