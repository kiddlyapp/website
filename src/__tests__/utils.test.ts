import { cn } from '@/lib/utils';

describe('cn', () => {
  it('returns a single class name unchanged', () => {
    expect(cn('text-red-500')).toBe('text-red-500');
  });

  it('merges multiple class names', () => {
    expect(cn('flex', 'items-center')).toBe('flex items-center');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'excluded', 'included')).toBe('base included');
  });

  it('deduplicates conflicting tailwind classes (last wins)', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('handles undefined and null values gracefully', () => {
    expect(cn('base', undefined, null as unknown as string)).toBe('base');
  });

  it('returns empty string for no arguments', () => {
    expect(cn()).toBe('');
  });

  it('handles array of class names via clsx', () => {
    expect(cn(['flex', 'gap-4'])).toBe('flex gap-4');
  });

  it('merges tailwind padding without duplicating', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
  });
});
