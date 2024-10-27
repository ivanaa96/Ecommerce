import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import './favorite-product-item.css';
import { Product } from 'store/products/types';

interface FavoriteProductItemProps {
  product: Product;
  onNavigate: (productId: number) => void;
  onRemoveFromFavorites: (productId: number) => void;
}

function FavoriteProductItem({
  product,
  onNavigate,
  onRemoveFromFavorites,
}: FavoriteProductItemProps): JSX.Element {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={product.title} src={product.thumbnail} />
      </ListItemAvatar>

      <ListItemText
        primary={
          <span
            className="product-item__text"
            onClick={() => onNavigate(product.id)}
          >
            {product.title}
          </span>
        }
        secondary={product.description}
      />

      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => onRemoveFromFavorites(product.id)}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}

export default FavoriteProductItem;
