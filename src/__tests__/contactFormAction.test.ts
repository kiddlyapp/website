import { submitContactForm } from '@/actions/contactForm';

const mockSendMail = jest.fn();
const mockCreateTransport = jest.fn(() => ({ sendMail: mockSendMail }));

jest.mock('nodemailer', () => ({
  createTransport: (config: unknown) => mockCreateTransport(config),
}));

describe('submitContactForm', () => {
  const formData = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    message: 'Hello from the test suite',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockSendMail.mockResolvedValue({ messageId: 'test-id' });
  });

  it('returns { success: true } on successful send', async () => {
    const result = await submitContactForm(formData);
    expect(result).toEqual({ success: true });
  });

  it('calls sendMail with the correct recipient and subject', async () => {
    await submitContactForm(formData);

    expect(mockSendMail).toHaveBeenCalledTimes(1);
    const callArgs = mockSendMail.mock.calls[0][0];
    expect(callArgs.to).toBe('office@hefesgroup.com');
    expect(callArgs.subject).toContain('Jane Doe');
  });

  it('includes the sender name and email in the email body', async () => {
    await submitContactForm(formData);

    const callArgs = mockSendMail.mock.calls[0][0];
    expect(callArgs.html).toContain('Jane Doe');
    expect(callArgs.html).toContain('jane@example.com');
    expect(callArgs.text).toContain('Hello from the test suite');
  });

  it('creates a transporter with the SES host', async () => {
    await submitContactForm(formData);

    const transportConfig = mockCreateTransport.mock.calls[0][0] as { host: string };
    expect(transportConfig.host).toMatch(/email-smtp/);
  });

  it('throws an error when sendMail fails', async () => {
    mockSendMail.mockRejectedValue(new Error('SMTP connection failed'));

    await expect(submitContactForm(formData)).rejects.toThrow('Failed to send email');
  });
});
