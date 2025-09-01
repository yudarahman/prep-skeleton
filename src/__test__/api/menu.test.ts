import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {
  renderHook,
  waitFor
} from '@testing-library/react';

import Database from '@/store/database/base';
import { useGetMenusQuery } from '@/api/menu';
import { wrapper } from '@/mocks/ReduxProviderMock';

describe('@/api/menu.ts', () => {
  it('should return expected value when "useGetManusQuery" called without params', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => useGetMenusQuery(undefined), { wrapper });

    await waitFor(() => {
      const { data } = result.current;
      expect(data?.data[0].name).toBe('Some Menu 1');
    });
  });

  it('should return expected value when "useGetMenusQuery" called with params', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => useGetMenusQuery({ filters: 'name@=some-menu' }), { wrapper });

    await waitFor(() => {
      const { data } = result.current;
      expect(data?.data[0].name).toBe('Some Menu 1');
    });
  });
});