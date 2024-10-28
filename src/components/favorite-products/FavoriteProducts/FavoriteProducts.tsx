import React from 'react';

import FavoriteProductItem from '../FavoriteProductItem';
import { NO_FAVORITE_PRODUCTS } from 'constants/constants';
import InfoMessage from 'components/ui/info-message';
import { Product } from 'store/products/types';

interface FavoriteProductsComponentProps {
  favoriteProducts: Product[];
  onNavigate: (productId: number) => void;
  onRemoveFromFavorites: (productId: number) => void;
}

function FavoriteProductsComponent({
  favoriteProducts,
  onNavigate,
  onRemoveFromFavorites,
}: FavoriteProductsComponentProps): JSX.Element {
  return (
    <div>
      {favoriteProducts.length === 0 ? (
        <InfoMessage message={NO_FAVORITE_PRODUCTS} />
      ) : (
        favoriteProducts.map((favoriteProduct) => (
          <FavoriteProductItem
            key={favoriteProduct.id}
            product={favoriteProduct}
            onNavigate={onNavigate}
            onRemoveFromFavorites={onRemoveFromFavorites}
          />
        ))
      )}
    </div>
  );
}

export default FavoriteProductsComponent;
