import { IUser } from '@/types';
import { create } from 'zustand';
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware';

interface StoreState {
  user: IUser | null;
  isAdmin: boolean;
}

interface StoreActions {
  setUser: (user: IUser) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

type Store = StoreState & StoreActions;

type StorePersist = PersistOptions<Store>;

const persistConfig: StorePersist = {
  name: 'user-storage',
  storage: createJSONStorage(() => sessionStorage),
};

const useCustomStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      isAdmin: false,
      setUser: (user: IUser) => set({ user }),
      setIsAdmin: (isAdmin: boolean) => set({ isAdmin }),
    }),
    persistConfig
  )
);

export default useCustomStore;