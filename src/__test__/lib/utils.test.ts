import { type FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import {
  describe,
  expect,
  it
} from 'vitest';

import {
  cn,
  transformError,
  getErrorDetail,
  getInitials,
  generateSuccessToast,
  generateErrorToast
} from '@/lib/utils';

describe('lib/utils.ts', () => {
  it('"cn" should return (empty string) with expected value', () => {
    const actual = cn([]);
    expect(actual).toBe('');
  });

  it('should return (flex flex-row) with expected value', () => {
    const actual = cn(['flex', 'flex-row']);
    expect(actual).toBe('flex flex-row');
  });

  it('"transformError" should return expected value when "error" is undefined', () => {
    const expectedError = undefined;
    const actualError = transformError(expectedError);

    expect(actualError).toBe('[0] Unknown Error');
  });

  it('"transformError" should return expected value when "error" is defined', () => {
    const expectedError = {
      status: 'CUSTOM_ERROR',
      data: {
        code: 40101,
        message: 'Unauthorized'
      },
      error: 'ERROR'
    } satisfies FetchBaseQueryError;
    const actualError = transformError(expectedError);

    expect(actualError).toBe('[40101] Unauthorized');
  });

  it('"getErrorDetail" should return expected value when "error" is undefined', () => {
    const expectedError = undefined;
    const actualError = getErrorDetail(expectedError);
    
    expect(actualError).toStrictEqual({
      code: 0,
      status: 0,
      statusType: 'Unknown',
      title: 'Unknown',
      message: 'Unknown'
    });
  });

  it('"getErrorDetail" should return expected value when "error" is defined', () => {
    const expectedError = {
      status: 'CUSTOM_ERROR',
      data: {
        code: 40101,
        status: 401,
        statusType: 'Unknown',
        title: 'Unknown',
        message: 'Unknown'
      },
      error: 'ERROR'
    } satisfies FetchBaseQueryError;
    const actualError = getErrorDetail(expectedError);

    expect(actualError).toStrictEqual({
      code: 40101,
      status: 401,
      statusType: 'Unknown',
      title: 'Unknown',
      message: 'Unknown'
    });
  });

  it('"getInitials" should return empty string when params is undefined', () => {
    const actual = getInitials(undefined);

    expect(actual).toBe('');
  });

  it('"getInitials" should return expected string when params is not undefined', () => {
    const actual = getInitials('John Doe');

    expect(actual).toBe('JD');
  });

  it('"generateErrorToast" should return expected value when errors params is undefined"', () => {
    const actual = generateErrorToast();

    expect(actual).toStrictEqual({
      title: '[0] Error',
      description: 'Unknown error, please ask your administrator'
    });
  });

  it('"generateErrorToast" should return expected value when errors params has "data"', () => {
    const actual = generateErrorToast({ data: 'Something went wrong' });

    expect(actual).toStrictEqual({
      title: '[0] Error',
      description: 'Unknown error, please ask your administrator'
    });
  });

  it('"generateErrorToast" should return expected value when errors params is there"', () => {
    const actual = generateErrorToast({
      code: 40101,
      status: 401,
      statusType: 'Unknown',
      title: 'Unknown',
      message: 'Unknown'
    });

    expect(actual).toStrictEqual({
      title: '[40101] Unknown',
      description: 'Unknown'
    });
  });

  it('"generateSuccessToast" should return expected value when "data" params is there"', () => {
    const actual = generateSuccessToast({
      code: 20001,
      status: 200,
      title: 'Unknown',
      message: 'Unknown'
    });

    expect(actual).toStrictEqual({
      title: '[20001] Unknown',
      description: 'Unknown'
    });
  });

  it('"generateSuccessToast" should return expected value when "data" params is not there and "dataType" and "type" is there', () => {
    const actual = generateSuccessToast(undefined, 'Unknown', 'unknown');

    expect(actual).toStrictEqual({
      title: '[200] Success!',
      description: 'Unknown has been unknown'
    });
  });

  it('"generateSuccessToast" should return expected value when params is empty', () => {
    const actual = generateSuccessToast();

    expect(actual).toStrictEqual({
      title: '[200] Success!',
      description: 'Unknown has been unknown'
    });
  });
});