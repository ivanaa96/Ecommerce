import { UserStore } from './types';
import useUserStore from './useUserStore';

export const useUser = () => useUserStore((state: UserStore) => state.user);
export const useSetUser = () =>
  useUserStore((state: UserStore) => state.setUser);
export const useLogin = () => useUserStore((state: UserStore) => state.login);
