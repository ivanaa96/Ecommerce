import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { mockCartItems } from 'constants/test-constants';
import CheckoutComponent from 'components/checkout/Checkout';
import { CheckoutComponentProps } from 'components/checkout/Checkout/Checkout';

const meta: Meta<typeof CheckoutComponent> = {
  title: 'Pages/CheckoutComponent',
  component: CheckoutComponent,
  args: {
    cartItems: mockCartItems,
    address: '123 Main St',
    phoneNumber: '123-456-7890',
    additionalMessage: 'Leave at front door',
    totalPrice: 100.0,
    isAddressError: false,
    isPhoneError: false,
  },
  argTypes: {
    cartItems: {
      control: 'object',
      description: 'Array of items in the shopping cart',
    },
    address: { control: 'text', description: 'Shipping address' },
    phoneNumber: { control: 'text', description: 'Contact phone number' },
    additionalMessage: {
      control: 'text',
      description: 'Additional message for delivery',
    },
    totalPrice: {
      control: 'number',
      description: 'Total price of items in the cart',
    },
    isAddressError: {
      control: 'boolean',
      description: 'Indicates if the address field has an error',
    },
    isPhoneError: {
      control: 'boolean',
      description: 'Indicates if the phone number field has an error',
    },
    isAuthenticated: {
      control: 'boolean',
      description: 'User authentication status',
    },
    onAddressChange: { action: 'Address changed', table: { disable: true } },
    onPhoneNumberChange: {
      action: 'Phone number changed',
      table: { disable: true },
    },
    onAdditionalMessageChange: {
      action: 'Additional message changed',
      table: { disable: true },
    },
    onCheckout: { action: 'Checkout initiated', table: { disable: true } },
    onRemoveItem: { action: 'Removed item', table: { disable: true } },
    onUpdateQuantity: {
      action: 'Updated item quantity',
      table: { disable: true },
    },
    onRedirectToLogin: {
      action: 'Redirect to login',
      table: { disable: true },
    },
  },
};
export default meta;

const Template: StoryFn<CheckoutComponentProps> = (args) => (
  <CheckoutComponent {...args} />
);

export const Authenticated = Template.bind({});
Authenticated.args = {
  isAuthenticated: true,
};

export const Unauthenticated = Template.bind({});
Unauthenticated.args = {
  isAuthenticated: false,
};
