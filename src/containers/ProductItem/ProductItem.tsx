import React from 'react';

import ProductItemComponent from 'components/product-item';
import { SnackbarSeverity, useSnackbarContext } from 'hooks/useSnackbar';
import { Product } from 'store/products/types';
import { useAddToCart } from 'store/products/selectors';

interface ProductItemProps {
  product: Product;
}

function ProductItem({ product }: ProductItemProps): JSX.Element {
  const addToCart = useAddToCart();
  const { openSnackbar } = useSnackbarContext();

  const handleAddToCart = (product: Product) => {
    addToCart(product);

    openSnackbar(`${product.title} added to cart!`, SnackbarSeverity.SUCCESS);
  };

  return (
    <ProductItemComponent product={product} onAddToCart={handleAddToCart} />
  );
}

export default ProductItem;
