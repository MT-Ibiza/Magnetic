import { useAppStore } from "../store/store";

export function useAuth() {
  const {
    setToken,
    loggedIn,
    token,
    logout,
    setLoggedIn,
    currentUser,
    setCurrentUser,
    getCurrentUser,
  } = useAppStore();

  return {
    setToken,
    loggedIn,
    token,
    logout,
    setLoggedIn,
    setCurrentUser,
    getCurrentUser,
    currentUser,
  };
}
