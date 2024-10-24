import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  ERROR_PRODUCT_NOT_FOUND,
  ERROR_PRODUCT_ID_MISSING,
  ERROR_FETCHING_PRODUCT_DETAILS,
} from 'constants/constants';
import ProductDetailsComponent from 'components/product-details';
import InfoMessage from 'components/ui/info-message';
import Loader from 'components/ui/loader';
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

  const handleAddToCart = (product: Product) => {
    addToCart(product);

    openSnackbar(`${product.title} added to cart!`, SnackbarSeverity.SUCCESS);
  };

  useEffect(() => {
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

    fetchProduct();
  }, [id, getProductById]);

  const handleShowMoreDetails = () => {
    setShowMoreDetails((prevState) => !prevState);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <InfoMessage message={error} />;
  }

  if (!product) {
    return <InfoMessage message={ERROR_PRODUCT_NOT_FOUND} />;
  }

  return (
    <ProductDetailsComponent
      product={product}
      showMoreDetails={showMoreDetails}
      onAddToCart={handleAddToCart}
      onToggleMoreDetails={handleShowMoreDetails}
    />
  );
}

export default ProductDetails;
