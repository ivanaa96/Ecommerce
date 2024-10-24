import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductDetailsComponent from 'components/product-details';
import InfoMessage from 'components/ui/info-message';
import Loader from 'components/ui/loader';
import { useGetProductById } from 'store/products/selectors';
import { Product } from 'store/products/types';

function ProductDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const getProductById = useGetProductById();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await getProductById(id!);
        setProduct(fetchedProduct);
      } catch (err) {
        setError('Error fetching product details.');
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
    return <InfoMessage message="Product not found." />;
  }

  return (
    <ProductDetailsComponent
      product={product}
      showMoreDetails={showMoreDetails}
      onToggleMoreDetails={handleShowMoreDetails}
    />
  );
}

export default ProductDetails;
