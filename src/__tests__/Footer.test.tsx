import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer';

jest.mock('@/components/Logo', () => ({
  Logo: ({ white }: { white?: boolean }) => (
    <img src={white ? '/kiddly-white.svg' : '/kiddly.svg'} alt="Kiddly" />
  ),
}));

jest.mock('@/components/SocialLinks', () => ({
  SocialLinks: ({ linkedin, instagram, facebook }: { linkedin: string; instagram: string; facebook: string }) => (
    <div data-testid="social-links">
      <a href={linkedin}>LinkedIn</a>
      <a href={instagram}>Instagram</a>
      <a href={facebook}>Facebook</a>
    </div>
  ),
}));

jest.mock('@/components/icon/heart', () => ({
  Heart: () => <span>♥</span>,
}));

describe('Footer', () => {
  it('renders the logo in white', () => {
    render(<Footer />);
    expect(screen.getByAltText('Kiddly')).toHaveAttribute('src', '/kiddly-white.svg');
  });

  it('renders navigation links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /features/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /request access/i })).toBeInTheDocument();
  });

  it('renders legal links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /privacy policy/i })).toHaveAttribute('href', '/privacy-policy');
    expect(screen.getByRole('link', { name: /terms/i })).toHaveAttribute('href', '/terms-and-conditions');
  });

  it('renders social links', () => {
    render(<Footer />);
    expect(screen.getByTestId('social-links')).toBeInTheDocument();
  });

  it('renders copyright with current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
