/* eslint-disable @typescript-eslint/no-explicit-any */
class IntersectionObserverMock {
  callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe() {}

  unobserve() {}

  disconnect() {}

  simulateIntersection(isIntersecting: boolean) {
    this.callback([{ isIntersecting, target: {} } as IntersectionObserverEntry], this as any);
  }
}

export default IntersectionObserverMock;