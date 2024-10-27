import React from 'react';
import { Button, TextField, Typography } from '@mui/material';

import './cart-form.css';
import {
  CHECKOUT_ADDRESS_ERROR,
  CHECKOUT_PHONE_NUMBER_ERROR,
} from 'constants/constants';

interface CartFormComponentProps {
  address: string;
  phoneNumber: string;
  additionalMessage: string;
  isAddressError: boolean;
  isPhoneError: boolean;
  onAddressChange: (address: string) => void;
  onPhoneNumberChange: (phoneNumber: string) => void;
  onAdditionalMessageChange: (additionalMessage: string) => void;
  onCheckout: () => void;
}

function CartFormComponent({
  address,
  phoneNumber,
  additionalMessage,
  isAddressError,
  isPhoneError,
  onAddressChange,
  onAdditionalMessageChange,
  onCheckout,
  onPhoneNumberChange,
}: CartFormComponentProps): JSX.Element {
  return (
    <form className="checkout__form">
      <Typography variant="h5" gutterBottom>
        Enter your information
      </Typography>

      <TextField
        className="checkout__input"
        fullWidth
        label="Address"
        required
        value={address}
        onChange={({ target }) => onAddressChange(target.value)}
        error={isAddressError}
        helperText={isAddressError ? CHECKOUT_ADDRESS_ERROR : ''}
      />

      <TextField
        className="checkout__input"
        fullWidth
        label="Phone Number"
        required
        value={phoneNumber}
        onChange={({ target }) => onPhoneNumberChange(target.value)}
        error={isPhoneError}
        helperText={isPhoneError ? CHECKOUT_PHONE_NUMBER_ERROR : ''}
      />

      <TextField
        className="checkout__input"
        fullWidth
        label="Additional Message (optional)"
        value={additionalMessage}
        onChange={({ target }) => onAdditionalMessageChange(target.value)}
      />

      <Button
        variant="contained"
        className="checkout-form__button"
        onClick={onCheckout}
      >
        Checkout
      </Button>
    </form>
  );
}

export default CartFormComponent;
