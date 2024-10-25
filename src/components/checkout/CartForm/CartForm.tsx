import React from 'react';
import { Button, TextField, Box } from '@mui/material';

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
  onAddressChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAdditionalMessageChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onCheckout: () => void;
  onPhoneNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
    <form>
      <Box>
        <TextField
          className="checkout__input"
          fullWidth
          label="Address"
          required
          value={address}
          onChange={onAddressChange}
          error={isAddressError}
          helperText={isAddressError ? CHECKOUT_ADDRESS_ERROR : ''}
        />

        <TextField
          className="checkout__input"
          fullWidth
          label="Phone Number"
          required
          value={phoneNumber}
          onChange={onPhoneNumberChange}
          error={isPhoneError}
          helperText={isPhoneError ? CHECKOUT_PHONE_NUMBER_ERROR : ''}
        />

        <TextField
          className="checkout__input"
          fullWidth
          label="Additional Message (optional)"
          value={additionalMessage}
          onChange={onAdditionalMessageChange}
        />

        <Button variant="contained" onClick={onCheckout}>
          Checkout
        </Button>
      </Box>
    </form>
  );
}

export default CartFormComponent;
