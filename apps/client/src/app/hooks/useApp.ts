import { useAppStore } from '../store/store';

export function useApp() {
  const { setSelectedItem, currentSelectItem } = useAppStore();

  return {
    setSelectedItem,
    currentSelectItem,
  };
}
