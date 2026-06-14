import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimatedButton from '@/components/AnimatedButton';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className}>{children}</div>
    ),
  },
}));

describe('AnimatedButton', () => {
  it('renders its children', () => {
    render(<AnimatedButton>Click me</AnimatedButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders complex children', () => {
    render(
      <AnimatedButton>
        <button type="button">Submit</button>
      </AnimatedButton>
    );
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('applies className to the wrapper', () => {
    const { container } = render(
      <AnimatedButton className="my-class">Content</AnimatedButton>
    );
    expect(container.firstChild).toHaveClass('my-class');
  });
});
