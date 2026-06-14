import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/components/ContactForm';
import { submitContactForm } from '@/actions/contactForm';

jest.mock('@/actions/contactForm', () => ({
  submitContactForm: jest.fn(),
}));

jest.mock('framer-motion', () => ({
  motion: {
    form: ({ children, onSubmit, className }: React.FormHTMLAttributes<HTMLFormElement> & { children: React.ReactNode }) => (
      <form onSubmit={onSubmit} className={className}>{children}</form>
    ),
    div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const mockSubmitContactForm = submitContactForm as jest.MockedFunction<typeof submitContactForm>;

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('shows success message after successful submission', async () => {
    mockSubmitContactForm.mockResolvedValue({ success: true });
    const user = userEvent.setup();

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Hello there!');

    fireEvent.submit(screen.getByRole('button', { name: /send/i }).closest('form')!);

    await waitFor(() => {
      expect(screen.getByText(/thank you for contacting us/i)).toBeInTheDocument();
    });
  });

  it('shows error message when submission fails', async () => {
    mockSubmitContactForm.mockRejectedValue(new Error('Failed to send email'));
    const user = userEvent.setup();

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Hello!');

    fireEvent.submit(screen.getByRole('button', { name: /send/i }).closest('form')!);

    await waitFor(() => {
      expect(screen.getByText(/failed to send email/i)).toBeInTheDocument();
    });
  });

  it('disables the submit button while submitting', async () => {
    let resolveSubmit!: (value: { success: boolean }) => void;
    mockSubmitContactForm.mockReturnValue(
      new Promise((resolve) => { resolveSubmit = resolve; })
    );
    const user = userEvent.setup();

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');

    fireEvent.submit(screen.getByRole('button', { name: /send/i }).closest('form')!);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
    });

    resolveSubmit({ success: true });
  });

  it('calls submitContactForm with correct data', async () => {
    mockSubmitContactForm.mockResolvedValue({ success: true });
    const user = userEvent.setup();

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');

    fireEvent.submit(screen.getByRole('button', { name: /send/i }).closest('form')!);

    await waitFor(() => {
      expect(mockSubmitContactForm).toHaveBeenCalledWith({
        name: 'Jane Doe',
        email: 'jane@example.com',
        message: 'Test message',
      });
    });
  });
});
