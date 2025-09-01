import {
  describe,
  expect,
  it,
  vi
} from 'vitest';

import NetworkStatus from '@/lib/network';

describe('@/lib/network.ts', () => {
  const mockOnlineCallback = vi.fn();
  const mockOfflineCallback = vi.fn();
  
  it('should call "onlineCallback" when online and "callback" params is undefined', () => {
    const networkStatus = new NetworkStatus(
      mockOnlineCallback,
      mockOfflineCallback
    );
      
    window.dispatchEvent(new Event('online'));

    expect(mockOnlineCallback).toHaveBeenCalled();
    expect(networkStatus.handleOnline({} as Event, undefined)).toBe(undefined);
  });

  it('should call "onlineCallback" when online and "callback" params is truthy', () => {
    const networkStatus = new NetworkStatus(
      mockOnlineCallback,
      mockOfflineCallback
    );

    window.dispatchEvent(new Event('online'));

    expect(mockOnlineCallback).toHaveBeenCalled();
    expect(networkStatus.handleOnline({} as Event, () => true)).toBeTruthy();
  });

  it('should call "offlineCallback" when offline and "callback" params is undefined', () => {
    const networkStatus = new NetworkStatus(
      mockOnlineCallback,
      mockOfflineCallback
    );

    window.dispatchEvent(new Event('offline'));

    expect(mockOfflineCallback).toHaveBeenCalled();
    expect(networkStatus.handleOffline({} as Event, undefined)).toBe(undefined);
  });

  it('should call "offlineCallback" when offline and "callback" params is truthy', () => {
    const networkStatus = new NetworkStatus(
      mockOnlineCallback,
      mockOfflineCallback
    );

    window.dispatchEvent(new Event('offline'));

    expect(mockOfflineCallback).toHaveBeenCalled();
    expect(networkStatus.handleOffline({} as Event, () => true)).toBeTruthy();
  });

  it('should get expected status in "isNetworkOnline"', () => {
    const networkStatus = new NetworkStatus();

    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      get: () => true
    });

    expect(networkStatus.isNetworkOnline()).toBe(true);

    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      get: () => false
    });

    expect(networkStatus.isNetworkOnline()).toBe(false);
  });

  it('should call expected Function when "clean" triggered', () => {
    const networkStatus = new NetworkStatus(mockOnlineCallback, mockOfflineCallback);
    const cleanSpy = vi.spyOn(window, 'removeEventListener');
    
    networkStatus.clean();

    expect(cleanSpy).toHaveBeenCalled();
  });
});