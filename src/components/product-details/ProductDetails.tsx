import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Button,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import './product-details.css';
import {
  ADD_TO_FAVORITES,
  ERROR_PRODUCT_NOT_FOUND,
  REMOVE_FROM_FAVORITES,
} from 'constants/constants';
import Loader from 'components/ui/loader';
import InfoMessage from 'components/ui/info-message';
import { Product } from 'store/products/types';

interface ProductDetailProps {
  product: Product | null;
  showMoreDetails: boolean;
  isFavorite: boolean;
  isLoading: boolean;
  hasErrors: string | null;
  onAddToCart: (product: Product) => void;
  onToggleMoreDetails: () => void;
  onToggleFavorite: () => void;
}

function ProductDetail({
  product,
  showMoreDetails,
  isFavorite,
  hasErrors,
  isLoading,
  onToggleMoreDetails,
  onAddToCart,
  onToggleFavorite,
}: ProductDetailProps): JSX.Element {
  if (isLoading) {
    return <Loader />;
  }

  if (hasErrors) {
    return <InfoMessage message={hasErrors} />;
  }

  if (!product) {
    return <InfoMessage message={ERROR_PRODUCT_NOT_FOUND} />;
  }

  return (
    <Card className="product-details-container">
      <CardMedia
        component="img"
        image={product.thumbnail || 'no-image.png'}
        alt={product.title}
        className="product-details-image"
      />

      <CardContent>
        <Typography variant="h4">{product.title}</Typography>
        <Typography variant="h6">${product.price.toFixed(2)}</Typography>

        <Box display="flex" alignItems="center" mb={2}>
          <Rating value={product.rating} readOnly precision={0.5} />
          <Typography variant="body2" color="textSecondary">
            ({product.rating} / 5)
          </Typography>
        </Box>

        <Typography variant="body1">{product.description}</Typography>

        {showMoreDetails && (
          <Box mt={2}>
            <Typography variant="body2">
              Category: {product.category}
            </Typography>
            <Typography variant="body2">Brand: {product.brand}</Typography>
            <Typography variant="body2">SKU: {product.sku}</Typography>
            <Typography variant="body2">Stock: {product.stock}</Typography>
            <Typography variant="body2">
              Dimensions: {product.dimensions.width}x{product.dimensions.height}
              x{product.dimensions.depth} cm
            </Typography>
            <Typography variant="body2">Weight: {product.weight} kg</Typography>
          </Box>
        )}
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="body2" color="textSecondary">
            {showMoreDetails
              ? 'Show less information'
              : 'Show more information'}
          </Typography>
          <IconButton
            onClick={onToggleMoreDetails}
            className="toggle-info-button"
            size="small"
          >
            {showMoreDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>

        <Box className="buttons">
          <Button
            variant="contained"
            color="primary"
            aria-label="add to cart"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </Button>

          <Button
            variant="contained"
            aria-label="favorites"
            color={isFavorite ? 'error' : 'secondary'}
            onClick={onToggleFavorite}
          >
            {isFavorite ? REMOVE_FROM_FAVORITES : ADD_TO_FAVORITES}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductDetail;
