import '@testing-library/jest-dom/vitest';

class ResizeObserverStub {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

declare global {
  interface Window {
    ResizeObserver: typeof ResizeObserverStub;
  }
}

if (!('ResizeObserver' in globalThis)) {
  (globalThis as unknown as Window).ResizeObserver = ResizeObserverStub;
}
