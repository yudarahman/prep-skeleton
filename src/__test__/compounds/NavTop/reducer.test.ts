import {
  describe,
  expect,
  it
} from 'vitest';

import { initialState } from '@/compounds/NavTop/config';
import { reducer } from '@/compounds/NavTop/reducer';

describe('@/compounds/NavTop/config.ts', () => {
  it('should return expected value when "type" actions is not recognized', () => {
    const unrecognizedActions = {
      type: 'UNRECOGNIZED',
      payload: 'unrecognized'
    };

    const actual = reducer(initialState, unrecognizedActions);
    expect(actual).toEqual(initialState);
  });
});