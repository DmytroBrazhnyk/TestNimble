import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';

test('renders HomePage component', () => {
    render(<HomePage />);
    expect(screen.getByText(/Contacts List/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Contact/i })).toBeInTheDocument();
    expect(screen.getByText(/Create Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/Contacts List/i)).toBeInTheDocument();
});