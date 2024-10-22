import { create } from 'zustand';

import axiosInstance from 'api/axiosInstance';
import API_ENDPOINTS from 'api/apiRoutes';
import { Product, ProductStore } from './types';

const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products: Product[]) => set({ products }),
  getProducts: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTS.GET);

      set({ products: response.data.products });
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
}));

export default useProductStore;
