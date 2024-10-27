import React from 'react';
import {
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  Rating,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';

import './product-item.css';
import API_ENDPOINTS from 'api/apiRoutes';
import InfoMessage from 'components/ui/info-message';
import { Product } from 'store/products/types';

interface ProductItemProps {
  product: Product;
  isFavorite: boolean;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
}

function ProductItemComponent({
  product,
  isFavorite,
  onAddToCart,
  onToggleFavorite,
}: ProductItemProps): JSX.Element {
  if (!product) {
    return <InfoMessage message="No product available." />;
  }

  return (
    <Card className="product-card">
      <IconButton
        className="favorite-button"
        onClick={() => onToggleFavorite(product)}
      >
        {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </IconButton>

      <Link
        to={`${API_ENDPOINTS.PRODUCTS.GET}/${product.id}`}
        className="product-link"
      >
        <CardMedia
          component="img"
          className="product-image"
          image={product.thumbnail || 'no-image.png'}
          alt={product.title}
        />
        <div className="product-content">
          <Typography variant="body1" className="product-title">
            {product.title}
          </Typography>
        </div>
      </Link>

      <Box className="product-details">
        <Typography variant="subtitle1" className="product-price">
          ${product.price.toFixed(2)}
        </Typography>
        <Rating
          value={product.rating}
          readOnly
          precision={0.5}
          size="small"
          className="product-rating"
        />
      </Box>

      <div className="button-container">
        <Button
          className="add-to-cart-button"
          onClick={() => onAddToCart(product)}
        >
          <AddShoppingCartIcon className="cart-icon" />
          Add to cart
        </Button>
      </div>
    </Card>
  );
}

export default ProductItemComponent;
