import { ProductStore } from './types';
import useProductStore from './useProductStore';

export const useProducts = () =>
  useProductStore((state: ProductStore) => state.products);
export const useGetProducts = () =>
  useProductStore((state: ProductStore) => state.getProducts);
export const useResetProducts = () =>
  useProductStore((state: ProductStore) => state.resetProducts);
export const useTotalNumberOfProducts = () =>
  useProductStore((state: ProductStore) => state.totalNumberOfProducts);
export const useGetProductById = () =>
  useProductStore((state: ProductStore) => state.getProductById);

export const useCartItems = () =>
  useProductStore((state: ProductStore) => state.cartItems);
export const useAddToCart = () =>
  useProductStore((state: ProductStore) => state.addToCart);
export const useRemoveFromCart = () =>
  useProductStore((state: ProductStore) => state.removeFromCart);
export const useUpdateCartQuantity = () =>
  useProductStore((state: ProductStore) => state.updateCartQuantity);
export const useCheckoutCart = () =>
  useProductStore((state: ProductStore) => state.checkoutCart);

export const useFavoriteProducts = () =>
  useProductStore((state: ProductStore) => state.favoriteProducts);
export const useAddToFavoriteProducts = () =>
  useProductStore((state: ProductStore) => state.addToFavoriteProducts);
export const useRemoveFromFavoriteProducts = () =>
  useProductStore((state: ProductStore) => state.removeFromFavoriteProducts);

export const useGetCategories = () =>
  useProductStore((state: ProductStore) => state.getCategories);
export const useCategories = () =>
  useProductStore((state: ProductStore) => state.categories);
export const useSearchByCategory = () =>
  useProductStore((state: ProductStore) => state.searchByCategory);
