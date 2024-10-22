import { create } from 'zustand';

import { User, UserStore } from './types';
import axiosInstance from 'api/axiosInstance';
import API_ENDPOINTS from 'api/apiRoutes';

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  login: async (username, password) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, {
        username,
        password,
      });

      set({ user: response.data });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
}));

export default useUserStore;
