import React from 'react';
import { Avatar, Button, ListItem, ListItemText } from '@mui/material';

import './cart-item.css';
import { CartItem } from 'store/products/types';

interface CartItemComponentProps {
  cartItem: CartItem;
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

function CartItemComponent({
  cartItem,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemComponentProps): JSX.Element {
  return (
    <ListItem className="cart-item__container">
      <Avatar
        src={cartItem.thumbnail}
        alt={cartItem.title}
        variant="square"
        sx={{ width: 50, height: 50, marginRight: 2 }}
      />
      <ListItemText
        primary={cartItem.title}
        secondary={`Price: $${cartItem.price.toFixed(2)} x ${cartItem.quantity}`}
      />
      <div className="checkout__actions">
        <Button
          variant="contained"
          className="checkout__button--decrement"
          onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity - 1)}
          disabled={cartItem.quantity <= 1}
        >
          -
        </Button>
        <Button
          className="checkout__button--increment"
          variant="contained"
          onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity + 1)}
        >
          +
        </Button>
        <Button
          className="checkout__button--remove"
          variant="contained"
          onClick={() => onRemoveItem(cartItem.id)}
        >
          Remove
        </Button>
      </div>
    </ListItem>
  );
}

export default CartItemComponent;
