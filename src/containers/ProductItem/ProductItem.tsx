import React from 'react';

import ProductItemComponent from 'components/product-item';
import { SnackbarSeverity, useSnackbarContext } from 'hooks/useSnackbar';
import useFavorite from 'hooks/useFavorite';
import { Product } from 'store/products/types';
import { useAddToCart } from 'store/products/selectors';

interface ProductItemProps {
  product: Product;
}

function ProductItem({ product }: ProductItemProps): JSX.Element {
  const addToCart = useAddToCart();
  const { openSnackbar } = useSnackbarContext();
  const { isFavorite, toggleFavorite } = useFavorite(product);

  const handleAddToCart = (product: Product) => {
    addToCart(product);

    openSnackbar(`${product.title} added to cart!`, SnackbarSeverity.SUCCESS);
  };

  return (
    <ProductItemComponent
      product={product}
      isFavorite={isFavorite}
      onAddToCart={handleAddToCart}
      onToggleFavorite={toggleFavorite}
    />
  );
}

export default ProductItem;
