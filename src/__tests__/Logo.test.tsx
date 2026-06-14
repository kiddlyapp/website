import React from 'react';
import { render, screen } from '@testing-library/react';
import { Logo } from '@/components/Logo';

describe('Logo', () => {
  it('renders the default (color) logo', () => {
    render(<Logo />);
    const img = screen.getByAltText('Kiddly');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining('kiddly.svg'));
  });

  it('renders the white logo when white prop is true', () => {
    render(<Logo white />);
    const img = screen.getByAltText('Kiddly');
    expect(img).toHaveAttribute('src', expect.stringContaining('kiddly-white.svg'));
  });

  it('renders a link to the homepage', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('applies className to the image', () => {
    render(<Logo className="w-24" />);
    const img = screen.getByAltText('Kiddly');
    expect(img).toHaveClass('w-24');
  });
});
