import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  ERROR_FETCHING_PRODUCT_DETAILS,
  ERROR_PRODUCT_ID_MISSING,
} from 'constants/constants';
import ProductDetailsComponent from 'components/product-details';
import useFavorite from 'hooks/useFavorite';
import { SnackbarSeverity, useSnackbarContext } from 'hooks/useSnackbar';
import { Product } from 'store/products/types';
import { useGetProductById, useAddToCart } from 'store/products/selectors';

function ProductDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const getProductById = useGetProductById();
  const addToCart = useAddToCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const { openSnackbar } = useSnackbarContext();
  const { isFavorite, toggleFavorite } = useFavorite(product);

  const handleAddToCart = (product: Product) => {
    addToCart(product);

    openSnackbar(`${product.title} added to cart!`, SnackbarSeverity.SUCCESS);
  };

  const fetchProduct = async () => {
    if (!id) {
      setError(ERROR_PRODUCT_ID_MISSING);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const fetchedProduct = await getProductById(id);
      setProduct(fetchedProduct);
    } catch (err) {
      setError(ERROR_FETCHING_PRODUCT_DETAILS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleShowMoreDetails = () => {
    setShowMoreDetails((prevState) => !prevState);
  };

  return (
    <ProductDetailsComponent
      product={product}
      showMoreDetails={showMoreDetails}
      isFavorite={isFavorite}
      isLoading={loading}
      hasErrors={error}
      onAddToCart={handleAddToCart}
      onToggleMoreDetails={handleShowMoreDetails}
      onToggleFavorite={toggleFavorite}
    />
  );
}

export default ProductDetails;
