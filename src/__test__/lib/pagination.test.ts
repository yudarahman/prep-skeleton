import {
  describe,
  expect,
  it
} from 'vitest';

import { calculatePagination } from '@/lib/pagination';

describe('@/lib/pagination', () => {
  it('should return expected value when "max" params is undefined', () => {
    const actual = calculatePagination();

    expect(actual).toStrictEqual([]);
  });
  
  it('should return expected value when "max" params is less than "minPaginationLimit"', () => {
    const actual = calculatePagination(4, 1);

    expect(actual).toStrictEqual(['1', '2', '3', '4']);
  });

  it('should return expected value when "max" params is less than "maxPaginationLimit"', () => {
    const actual = calculatePagination(4, 1);

    expect(actual).toStrictEqual(['1', '2', '3', '4']);
  });

  it('should return expected value when "max" params is more than "maxPaginationLimit"', () => {
    const actual = calculatePagination(8, 1);

    expect(actual).toStrictEqual(['1', '2', '3', '4', '5', '6', '...']);
  });

  it('should return expected value when "max" params is more than "maxPaginationLimit" and "page" same as "max"', () => {
    const actual = calculatePagination(8, 8);

    expect(actual).toStrictEqual(['...', '3', '4', '5', '6', '7', '8']);
  });

  it('should return expected value when "max" params is more than "maxPaginationLimit" and "page" exceed "minLimitPagination"', () => {
    const actual = calculatePagination(8, 5);

    expect(actual).toStrictEqual(['...', '2', '3', '4', '5', '6', '...']);
  });

  it('should return expected value when "max" params is more than "maxPaginationLimit" and "page" before "max"', () => {
    const actual = calculatePagination(8, 7);

    expect(actual).toStrictEqual(['...', '3', '4', '5', '6', '7', '8']);
  });

  it('should return expected value when "max" params is not number', () => {
    // @ts-ignore
    const actual = calculatePagination([1, 2], [1, 2]);

    expect(actual).toStrictEqual([]);
  });
});