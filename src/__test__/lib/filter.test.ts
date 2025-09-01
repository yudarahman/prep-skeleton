import {
  describe,
  expect,
  it
} from 'vitest';

import { generateFilter } from '@/lib/filter';

describe('@/lib/filter.ts', () => {
  it('should return expected value when "data" params has array of objects', () => {
    const mockData = {
      test: [
        {
          id: 'some-id-1',
          value: 'some-value-1'
        },
        {
          id: 'some-value-2',
          value: 'some-value-2'
        }
      ]
    };

    const actual = generateFilter(mockData);
    const expected = 'test==some-value-1|some-value-2,';

    expect(actual).toEqual(expected);
  });

  it('should return expected value when "data" params has array of objects and "op" params not undefined', () => {
    const mockData = {
      test: [
        {
          id: 'some-id-1',
          value: 'some-value-1'
        },
        {
          id: 'some-value-2',
          value: 'some-value-2'
        }
      ]
    };

    const actual = generateFilter(mockData, '@=');
    const expected = 'test@=some-value-1|some-value-2,';

    expect(actual).toEqual(expected);
  });

  it('should return expected value when "data" params has array of string', () => {
    const mockData = {
      test: ['some-value-1', 'some-value-2']
    };

    const actual = generateFilter(mockData);
    const expected = 'test==some-value-1|some-value-2,';

    expect(actual).toEqual(expected);
  });

  it('should return expected value when "data" params has array of string and "op" params not undefined', () => {
    const mockData = {
      test: ['some-value-1', 'some-value-2']
    };

    const actual = generateFilter(mockData, '@=');
    const expected = 'test@=some-value-1|some-value-2,';

    expect(actual).toEqual(expected);
  });

  it('should return expected value when "data" params has array of number', () => {
    const mockData = {
      test: [1, 2]
    };

    const actual = generateFilter(mockData);
    const expected = 'test==1|2,';

    expect(actual).toEqual(expected);
  });

  it('should return expected value when "data" params has array of number and "op" params not undefined', () => {
    const mockData = {
      test: [1, 2]
    };

    const actual = generateFilter(mockData, '@=');
    const expected = 'test@=1|2,';

    expect(actual).toEqual(expected);
  });

  it('should return expected value when "data" params has array of boolean', () => {
    const mockData = {
      test: [true, false]
    };

    const actual = generateFilter(mockData);
    const expected = 'test==true|false,';

    expect(actual).toEqual(expected);
  });

  it('should return expected value when "data" params has array of boolean and "op" params not undefined', () => {
    const mockData = {
      test: [true, false]
    };

    const actual = generateFilter(mockData, '@=');
    const expected = 'test@=true|false,';

    expect(actual).toEqual(expected);
  });

  it('should return expected value when "data" params has object', () => {
    const mockData = {
      test: { value: 'some-value-1' }
    };

    const actual = generateFilter(mockData);
    const expected = 'test==some-value-1,';

    expect(actual).toEqual(expected);
  });

  it('should return expected value when "data" params has object and "op" params not undefined', () => {
    const mockData = {
      test: { value: 'some-value-1' }
    };

    const actual = generateFilter(mockData, '@=');
    const expected = 'test@=some-value-1,';

    expect(actual).toEqual(expected);
  });

  it('should return expected value when "data" params has string', () => {
    const mockData = {
      test: 'some-value-1'
    };

    const actual = generateFilter(mockData);
    const expected = 'test==some-value-1,';

    expect(actual).toEqual(expected);
  });

  it('should return expected value when "data" params has string and "op" params not undefined', () => {
    const mockData = {
      test: 'some-value-1'
    };

    const actual = generateFilter(mockData, '@=');
    const expected = 'test@=some-value-1,';

    expect(actual).toEqual(expected);
  });

  it('should return expected value when "data" params has number', () => {
    const mockData = {
      test: 1
    };

    const actual = generateFilter(mockData);
    const expected = 'test==1,';

    expect(actual).toEqual(expected);
  });

  it('should return expected value when "data" params has number and "op" params not undefined', () => {
    const mockData = {
      test: 1
    };

    const actual = generateFilter(mockData, '@=');
    const expected = 'test@=1,';

    expect(actual).toEqual(expected);
  });

  it('should return expected value when "data" params has boolean', () => {
    const mockData = {
      test: false
    };

    const actual = generateFilter(mockData);
    const expected = 'test==false,';

    expect(actual).toEqual(expected);
  });

  it('should return expected value when "data" params has boolean and "op" params not undefined', () => {
    const mockData = {
      test: false
    };

    const actual = generateFilter(mockData, '@=');
    const expected = 'test@=false,';

    expect(actual).toEqual(expected);
  });
});