import React from 'react';
import { Button, ListItem, ListItemText } from '@mui/material';

import { CartItem } from 'store/products/types';

interface CartItemComponentProps {
  item: CartItem;
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

function CartItemComponent({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemComponentProps): JSX.Element {
  return (
    <ListItem>
      <ListItemText
        primary={item.title}
        secondary={`Price: $${item.price.toFixed(2)} x ${item.quantity}`}
      />
      <div className="checkout__actions">
        <Button
          variant="contained"
          className="checkout__button--decrement"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </Button>
        <Button
          className="checkout__button--increment"
          variant="contained"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          +
        </Button>
        <Button
          className="checkout__button--remove"
          variant="contained"
          onClick={() => onRemoveItem(item.id)}
        >
          Remove
        </Button>
      </div>
    </ListItem>
  );
}

export default CartItemComponent;
