import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '@/hooks/use-mobile';

function setWindowWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
}

function mockMatchMedia(matches: boolean) {
  const listeners: Array<() => void> = [];
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: (_: string, cb: () => void) => listeners.push(cb),
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
  return listeners;
}

describe('useIsMobile', () => {
  it('returns false when window width is above the breakpoint', () => {
    setWindowWidth(1024);
    mockMatchMedia(false);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('returns true when window width is below the breakpoint', () => {
    setWindowWidth(375);
    mockMatchMedia(true);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('updates when the media query fires a change event', () => {
    setWindowWidth(1024);
    const listeners = mockMatchMedia(false);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => {
      setWindowWidth(375);
      listeners.forEach((cb) => cb());
    });

    expect(result.current).toBe(true);
  });
});
