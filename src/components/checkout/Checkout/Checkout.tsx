import React from 'react';
import { Card, CardContent, Typography, List } from '@mui/material';

import './checkout.css';
import CartItemComponent from '../CartItem';
import CartFormComponent from '../CartForm';
import { CartItem } from 'store/products/types';

interface CheckoutComponentProps {
  cartItems: CartItem[];
  address: string;
  phoneNumber: string;
  additionalMessage: string;
  totalPrice: number;
  isAddressError: boolean;
  isPhoneError: boolean;
  onAddressChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAdditionalMessageChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onCheckout: () => void;
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

function CheckoutComponent({
  cartItems,
  address,
  phoneNumber,
  additionalMessage,
  totalPrice,
  isAddressError,
  isPhoneError,
  onAddressChange,
  onPhoneNumberChange,
  onAdditionalMessageChange,
  onCheckout,
  onRemoveItem,
  onUpdateQuantity,
}: CheckoutComponentProps): JSX.Element {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Shopping Cart</Typography>
        <List>
          {cartItems.map((cartItem) => (
            <CartItemComponent
              key={cartItem.id}
              item={cartItem}
              onRemoveItem={onRemoveItem}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
        </List>

        <Typography variant="h6" component="h3" gutterBottom>
          Total: ${totalPrice.toFixed(2)}
        </Typography>

        <CartFormComponent
          address={address}
          phoneNumber={phoneNumber}
          additionalMessage={additionalMessage}
          isAddressError={isAddressError}
          isPhoneError={isPhoneError}
          onAddressChange={onAddressChange}
          onPhoneNumberChange={onPhoneNumberChange}
          onAdditionalMessageChange={onAdditionalMessageChange}
          onCheckout={onCheckout}
        />
      </CardContent>
    </Card>
  );
}

export default CheckoutComponent;
