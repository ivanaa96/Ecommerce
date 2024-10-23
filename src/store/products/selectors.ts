import { ProductStore } from './types';
import useProductStore from './useProductStore';

export const useProducts = () =>
  useProductStore((state: ProductStore) => state.products);
export const useSetProducts = () =>
  useProductStore((state: ProductStore) => state.setProducts);
export const useGetProducts = () =>
  useProductStore((state: ProductStore) => state.getProducts);
export const useTotalNumberOfProducts = () =>
  useProductStore((state: ProductStore) => state.totalNumberOfProducts);
