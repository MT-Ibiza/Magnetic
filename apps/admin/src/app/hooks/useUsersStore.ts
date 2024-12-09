import { useAppStore } from '../store/store';

export function useUsersStore() {
  const { currentProfileUser, setCurrentProfileUser } = useAppStore();

  return {
    currentProfileUser,
    setCurrentProfileUser,
    hasCurrentProfileUser: Object.keys(currentProfileUser).length > 0,
  };
}
