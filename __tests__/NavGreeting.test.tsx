import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSession } from 'next-auth/react';
import NavGreeting from '@/components/NavGreeting';

jest.mock('next-auth/react');

describe('NavGreeting', () => {
  test('if authenticated, should have "Hi James!" text', async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'James' } },
      status: 'authenticated',
    });
    render(<NavGreeting />);

    const myElement = screen.getByText('Hi James!');

    expect(myElement).toBeInTheDocument();
  });
});
