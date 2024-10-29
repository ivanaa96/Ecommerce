import { create } from 'zustand';

import { Category, Product, ProductStore } from './types';
import axiosInstance from 'api/axiosInstance';
import API_ENDPOINTS from 'api/apiRoutes';

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  totalNumberOfProducts: 0,
  cartItems: [],
  favoriteProducts: [],
  categories: [],

  getProducts: async (limit: number, skip: number, searchTerm = '') => {
    const { data } = await axiosInstance.get(
      `${API_ENDPOINTS.PRODUCTS.GET}/search?q=${searchTerm}&limit=${limit}&skip=${skip}`
    );

    const newProducts = data.products;
    const totalNumber = data.total;

    set((state) => ({
      products: [...state.products, ...newProducts],
      totalNumberOfProducts: totalNumber,
    }));
  },

  resetProducts: () => {
    set(() => ({
      products: [],
      totalNumberOfProducts: 0,
    }));
  },

  getProductById: async (id: string) => {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.PRODUCTS.GET}/${id}`
    );

    const product = response.data;

    return product;
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

    const response = await axiosInstance.post(API_ENDPOINTS.CHECKOUT.PURCHASE, {
      userId,
      products: cartItems,
    });

    return response.data;
  },

  addToFavoriteProducts: (product: Product) => {
    set((state) => {
      const isAlreadyFavorite = state.favoriteProducts.some(
        (favProduct) => favProduct.id === product.id
      );

      if (isAlreadyFavorite) {
        return state;
      }

      return {
        favoriteProducts: [...state.favoriteProducts, product],
      };
    });
  },

  removeFromFavoriteProducts: (productId: number) => {
    set((state) => ({
      favoriteProducts: state.favoriteProducts.filter(
        (product) => product.id !== productId
      ),
    }));
  },

  getCategories: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.PRODUCTS.CATEGORIES);

    set(() => ({ categories: data }));
  },

  searchByCategory: async (category: Category, skip: number, limit = 10) => {
    const { data } = await axiosInstance.get(
      `${API_ENDPOINTS.PRODUCTS.SEARCH_BY_CATEGORY}${category.slug}?limit=${limit}&skip=${skip}`
    );

    set((state) => ({
      products: [...state.products, ...data.products],
      totalNumberOfProducts: data.total,
    }));
  },
}));

export default useProductStore;
