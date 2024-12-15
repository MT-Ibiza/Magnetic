import { useAppStore } from '../store/store';

export function useAuth() {
  const {
    setToken,
    loggedIn,
    token,
    logoutClient,
    setLoggedIn,
    currentUser,
    setCurrentUser,
    getCurrentUser,
  } = useAppStore();

  return {
    setToken,
    loggedIn,
    token,
    logoutClient,
    setLoggedIn,
    setCurrentUser,
    getCurrentUser,
    currentUser,
  };
}
