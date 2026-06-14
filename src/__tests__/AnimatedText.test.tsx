import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimatedText from '@/components/AnimatedText';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className}>{children}</div>
    ),
    span: ({ children, style }: React.HTMLAttributes<HTMLSpanElement>) => (
      <span style={style}>{children}</span>
    ),
  },
}));

describe('AnimatedText', () => {
  it('renders each word as a separate span', () => {
    render(<AnimatedText text="Hello World" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
  });

  it('renders all words from a longer text', () => {
    render(<AnimatedText text="The quick brown fox" />);
    expect(screen.getByText('The')).toBeInTheDocument();
    expect(screen.getByText('quick')).toBeInTheDocument();
    expect(screen.getByText('brown')).toBeInTheDocument();
    expect(screen.getByText('fox')).toBeInTheDocument();
  });

  it('applies the className to the container', () => {
    const { container } = render(
      <AnimatedText text="Test" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders a single word correctly', () => {
    render(<AnimatedText text="Single" />);
    expect(screen.getByText('Single')).toBeInTheDocument();
  });
});
