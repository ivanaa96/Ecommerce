import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import LoginComponent from 'components/login';

const mockProps = {
  username: 'username',
  password: 'password',
  error: null,
  setUsername: jest.fn(),
  setPassword: jest.fn(),
  handleSubmit: jest.fn(),
};

describe('LoginComponent', () => {
  it('renders the login form', () => {
    render(<LoginComponent {...mockProps} />);

    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Login' })
    ).toBeInTheDocument();
  });

  it('renders the error message when error prop is set to true', () => {
    render(
      <LoginComponent {...{ ...mockProps, error: 'Invalid credentials' }} />
    );

    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('it calls actions setUsername and setPassword when input changes', () => {
    render(<LoginComponent {...mockProps} />);

    const username = screen.getByLabelText(/username/i);
    const password = screen.getByLabelText(/password/i);

    fireEvent.change(username, { target: { value: 'newusername' } });
    fireEvent.change(password, { target: { value: 'newpassword' } });

    expect(mockProps.setUsername).toHaveBeenCalledWith('newusername');
    expect(mockProps.setUsername).toHaveBeenCalledTimes(1);

    expect(mockProps.setPassword).toHaveBeenCalledWith('newpassword');
    expect(mockProps.setPassword).toHaveBeenCalledTimes(1);
  });

  it('calls handleSubmit when user click on Login button', () => {
    const { container } = render(<LoginComponent {...mockProps} />);

    const form = container.querySelector('form');
    if (form) {
      fireEvent.submit(form);
    }

    expect(mockProps.handleSubmit).toHaveBeenCalled();
  });
});
