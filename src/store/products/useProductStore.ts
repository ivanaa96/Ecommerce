import { create } from 'zustand';

import { Product, ProductStore } from './types';
import axiosInstance from 'api/axiosInstance';
import API_ENDPOINTS from 'api/apiRoutes';

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  skip: 0,
  totalNumberOfProducts: 0,
  cartItems: [],

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

  addToCart: (product: Product) => {
    set((state) => {
      const existingProduct = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
    });
  },

  removeFromCart: (id: number) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    }));
  },

  updateCartQuantity: (id: number, quantity: number) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  },

  checkoutCart: async (userId: number) => {
    const cartItems = get().cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.CHECKOUT.PURCHASE,
        {
          userId,
          products: cartItems,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error();
    }
  },
}));

export default useProductStore;
