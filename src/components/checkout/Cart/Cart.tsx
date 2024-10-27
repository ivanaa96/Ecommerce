import React from 'react';
import { Typography, List } from '@mui/material';

import './cart.css';
import CartItemComponent from '../CartItem';
import { CartItem } from 'store/products/types';

interface CartComponentProps {
  cartItems: CartItem[];
  totalPrice: number;
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

function CartComponent({
  cartItems,
  totalPrice,
  onRemoveItem,
  onUpdateQuantity,
}: CartComponentProps): JSX.Element {
  return (
    <div className="cart">
      <Typography variant="h5">Shopping Cart</Typography>
      <List>
        {cartItems.map((cartItem) => (
          <CartItemComponent
            key={cartItem.id}
            cartItem={cartItem}
            onRemoveItem={onRemoveItem}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </List>
      <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
    </div>
  );
}

export default CartComponent;
