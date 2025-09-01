import { isUndefined } from 'lodash';

class NetworkStatus {
  constructor(
    onlineCallback?: () => void,
    offlineCallback?: () => void
  ) {
    this.initialize(onlineCallback, offlineCallback);
  }
  
  initialize(
    onlineCallback?: () => void,
    offlineCallback?: () => void
  ) {
    window.addEventListener('online', (ev) => this.handleOnline(ev, onlineCallback));
    window.addEventListener('offline', (ev) => this.handleOffline(ev, offlineCallback));
  }

  isNetworkOnline(): boolean {
    return navigator.onLine;
  }

  handleOnline(ev: Event, callback?: () => void) {
    if (isUndefined(callback)) {
      return;
    }

    return callback();
  }

  handleOffline(ev: Event, callback?: () => void) {
    if (isUndefined(callback)) {
      return;
    }
      
    return callback();
  }

  clean() {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }
}

export default NetworkStatus;