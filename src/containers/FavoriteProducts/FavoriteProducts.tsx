import React from 'react';
import { useNavigate } from 'react-router-dom';

import FavoriteProductsComponent from 'components/favorite-products/FavoriteProducts';
import {
  useFavoriteProducts,
  useRemoveFromFavoriteProducts,
} from 'store/products/selectors';

function FavoriteProducts() {
  const favoriteProducts = useFavoriteProducts();
  const navigate = useNavigate();
  const removeFromFavorite = useRemoveFromFavoriteProducts();

  const handleNavigate = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const handleRemoveFromFavoriteProducts = (productId: number) => {
    if (productId) {
      removeFromFavorite(productId);
    }
  };

  return (
    <FavoriteProductsComponent
      favoriteProducts={favoriteProducts}
      onNavigate={handleNavigate}
      onRemoveFromFavorites={handleRemoveFromFavoriteProducts}
    />
  );
}

export default FavoriteProducts;
