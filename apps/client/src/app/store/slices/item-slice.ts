import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import { Item } from '@magnetic/interfaces';

export type ItemSlice = {
  currentSelectItem?: Item;
  setSelectedItem: (item: Item) => void;
};

export const createItemSlice: StateCreator<StoreState, [], [], ItemSlice> = (
  set,
  get
) => ({
  currentSelectItem: undefined,
  setSelectedItem: (item) => {
    set({ currentSelectItem: item });
  },
});
