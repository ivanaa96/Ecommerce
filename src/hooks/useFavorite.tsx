import { SnackbarSeverity, useSnackbarContext } from 'hooks/useSnackbar';
import { Product } from 'store/products/types';
import {
  useFavoriteProducts,
  useAddToFavoriteProducts,
  useRemoveFromFavoriteProducts,
} from 'store/products/selectors';

const useFavorite = (product: Product | null) => {
  const favoriteProducts = useFavoriteProducts();
  const addToFavoriteProducts = useAddToFavoriteProducts();
  const removeFromFavoriteProducts = useRemoveFromFavoriteProducts();
  const { openSnackbar } = useSnackbarContext();

  const isFavorite = product
    ? favoriteProducts.some((fav) => fav.id === product.id)
    : false;

  const toggleFavorite = () => {
    if (product) {
      if (isFavorite) {
        removeFromFavoriteProducts(product.id);
        openSnackbar(
          `${product.title} removed from favorite products!`,
          SnackbarSeverity.SUCCESS
        );
      } else {
        addToFavoriteProducts(product);
        openSnackbar(
          `${product.title} added to favorite products!`,
          SnackbarSeverity.SUCCESS
        );
      }
    }
  };

  return { isFavorite, toggleFavorite };
};

export default useFavorite;
