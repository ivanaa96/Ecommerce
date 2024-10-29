import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { mockCartItems } from 'constants/test-constants';
import CheckoutComponent from 'components/checkout/Checkout';

const mockProps = {
  cartItems: mockCartItems,
  address: '123 Road',
  phoneNumber: '+12341234',
  additionalMessage: 'Leave at the door',
  totalPrice: 100,
  isAddressError: false,
  isPhoneError: false,
  isAuthenticated: true,
  onAddressChange: jest.fn(),
  onPhoneNumberChange: jest.fn(),
  onAdditionalMessageChange: jest.fn(),
  onCheckout: jest.fn(),
  onRemoveItem: jest.fn(),
  onUpdateQuantity: jest.fn(),
  onRedirectToLogin: jest.fn(),
};

describe('CheckoutComponent', () => {
  it('renders the cart and form components when authenticated', () => {
    render(<CheckoutComponent {...mockProps} />);

    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    expect(screen.getByText('Enter your information')).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
  });

  it('renders LoginRedirectMessage component when the user is not authenticated', () => {
    render(<CheckoutComponent {...mockProps} isAuthenticated={false} />);

    expect(
      screen.getByText('Click to go to the login page.')
    ).toBeInTheDocument();
  });

  it('calls onCheckout action when the checkout button is clicked', () => {
    render(<CheckoutComponent {...mockProps} />);

    const checkoutButton = screen.getByRole('button', { name: 'Checkout' });
    fireEvent.click(checkoutButton);

    expect(mockProps.onCheckout).toHaveBeenCalledTimes(1);
  });

  it('displays errors when isAddressError and isPhoneError are set to true', () => {
    render(
      <CheckoutComponent
        {...mockProps}
        isAddressError={true}
        isPhoneError={true}
      />
    );

    expect(screen.getByText('Address is required.')).toBeInTheDocument();
    expect(screen.getByText('Phone number is required.')).toBeInTheDocument();
  });
});
