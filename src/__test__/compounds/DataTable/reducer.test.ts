import {
  describe,
  expect,
  it
} from 'vitest';

import { initialState } from '@/compounds/DataTable/config';
import { reducer } from '@/compounds/DataTable/reducer';

describe('@/compounds/DataTable/config.ts', () => {
  it('should return expected value when "type" actions is not recognized', () => {
    const mockTable = {};
    const unrecognizedActions = {
      type: 'UNRECOGNIZED',
      payload: 'unrecognized'
    };
    
    const actual = reducer({ ...initialState, table: mockTable }, unrecognizedActions);
    expect(actual).toEqual({ ...initialState, table: mockTable });
  });

  it('should return expected value when "type" actions is "CHANGE_PAGE"', () => {
    const mockTable = {};
    const recognizedActions = {
      type: 'CHANGE_PAGE',
      payload: 12
    };

    const actual = reducer({ ...initialState, table: mockTable }, recognizedActions);
    expect(actual).toEqual({ ...initialState, table: mockTable, currentPage: 12 });
  });

  it('should return expected value when "type" actions is "SORT"', () => {
    const mockTable = {};
    const recognizedActions = {
      type: 'SORT',
      payload: ['name']
    };

    const actual = reducer({ ...initialState, table: mockTable }, recognizedActions);
    expect(actual).toEqual({ ...initialState, table: mockTable, sorts: ['name'] });
  });
});