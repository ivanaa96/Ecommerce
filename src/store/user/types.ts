export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  login: (username: string, password: string) => Promise<void>;
}
