import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';

jest.mock('next-auth/react');

describe('Navbar', () => {
  it('should have "Project Todo" text', () => {
    (useSession as jest.Mock).mockReturnValueOnce({
      session: { user: { name: 'James' } },
      status: 'authenticated',
    });
    render(<Navbar />);

    const myElem = screen.getByText('Project Todo');

    expect(myElem).toBeInTheDocument();
  });
});
