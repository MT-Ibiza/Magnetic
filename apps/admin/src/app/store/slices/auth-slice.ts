import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import { CurrentUser } from '@magnetic/interfaces';

const LOCAL_LOGIN_KEY = 'auth';
const CURRENT_USER_KEY = 'current_user';

const getInitialLoggedIn = () => {
  const loggedIn = !!localStorage.getItem(LOCAL_LOGIN_KEY) || false;
  return loggedIn;
};

export type AuthSlice = {
  token: string;
  setToken: (token: string) => void;
  setLoggedIn: (isLogin: boolean) => void;
  loggedIn: boolean;
  logout: () => void;
  currentUser?: CurrentUser;
  setCurrentUser: (user: CurrentUser) => void;
  getCurrentUser: () => CurrentUser | undefined;
};

export const createAuthSlice: StateCreator<StoreState, [], [], AuthSlice> = (
  set,
  get
) => ({
  token: '',
  currentUser: undefined,
  setCurrentUser: (user) => {
    const userString = JSON.stringify(user);
    localStorage.setItem(CURRENT_USER_KEY, userString);
    set({ currentUser: user });
  },
  getCurrentUser: () => {
    const stringUser = localStorage.getItem(CURRENT_USER_KEY);
    const user = stringUser
      ? (JSON.parse(stringUser) as CurrentUser)
      : undefined;
    return user;
  },
  setToken: (token) => {
    localStorage.setItem(LOCAL_LOGIN_KEY, token);
    set({ token });
  },
  loggedIn: getInitialLoggedIn(),
  logout: () => {
    localStorage.removeItem(LOCAL_LOGIN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    set({ token: '', loggedIn: false, currentUser: undefined });
  },
  setLoggedIn: (isLogin) => {
    set({ loggedIn: isLogin });
  },
});
