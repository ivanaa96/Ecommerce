import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Rating,
  IconButton,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';

import './product-item.css';
import InfoMessage from 'components/ui/info-message';
import { Product } from 'store/products/types';

interface ProductItemProps {
  product: Product;
}

function ProductItem({ product }: ProductItemProps): JSX.Element {
  if (!product) {
    return <InfoMessage message="No product available." />;
  }

  return (
    <Card className="product-card">
      <IconButton className="favorite-button">
        <FavoriteBorderIcon />
      </IconButton>

      <Link to={`/product/${product.id}`} className="product-link">
        <CardMedia
          component="img"
          className="product-image"
          image={product.thumbnail || 'no-image.png'}
          alt={product.title}
        />
        <CardContent className="product-content">
          <Typography variant="body1" className="product-title">
            {product.title}
          </Typography>

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

          <Button className="add-to-cart-button">
            <AddShoppingCartIcon className="cart-icon" />
            Add to cart
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
}

export default ProductItem;
