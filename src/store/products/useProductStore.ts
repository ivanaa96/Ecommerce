import { create } from 'zustand';

import { Product, ProductStore } from './types';
import axiosInstance from 'api/axiosInstance';
import API_ENDPOINTS from 'api/apiRoutes';

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  skip: 0,
  totalNumberOfProducts: 0,
  setProducts: (products: Product[]) => set({ products }),
  incrementSkip: (amount: number) =>
    set((state) => ({ skip: state.skip + amount })),

  getProducts: async (isInitialLoad = false) => {
    const { skip } = get();
    const newSkip = isInitialLoad ? 0 : skip;

    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.PRODUCTS.GET}?limit=10&skip=${newSkip}`
      );

      const newProducts = response.data.products;
      const totalNumber = response.data.total;

      set((state) => ({
        products: isInitialLoad
          ? newProducts
          : [...state.products, ...newProducts],
        skip: newSkip + 10,
        totalNumberOfProducts: totalNumber,
      }));
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },
  getProductById: async (id: string) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.PRODUCTS.GET}/${id}`
      );

      const product = response.data;

      return product;
    } catch (error) {
      console.error('An error occurred while fetching product by ID:', error);
    }
  },
}));

export default useProductStore;
