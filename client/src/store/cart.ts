import { priceAfterDiscount } from '@/lib/utils';
import { IProduct } from '@/types';
import { create } from 'zustand';
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware';

interface CartItem extends IProduct {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

interface CartActions {
  addItem: (product: IProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

type CartStore = CartState & CartActions;

type CartStorePersist = PersistOptions<CartStore>;

const persistConfig: CartStorePersist = {
  name: 'cart-storage',
  storage: createJSONStorage(() => localStorage), // Using localStorage instead of sessionStorage for cart persistence
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalAmount: 0,

      addItem: (product: IProduct, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item._id === product._id);

        if (existingItem) {
          const updatedItems = items.map(item =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set(state => ({
            items: updatedItems,
            totalItems: state.totalItems + quantity,
            totalAmount: state.totalAmount + (priceAfterDiscount(product.price, product.discountPercentage) * quantity)
          }));
        } else {
          const newItem = { ...product, quantity };
          set(state => ({
            items: [...state.items, newItem],
            totalItems: state.totalItems + quantity,
            totalAmount: state.totalAmount + (priceAfterDiscount(product.price, product.discountPercentage) * quantity)
          }));
        }
      },

      removeItem: (productId: string) => {
        const { items } = get();
        const itemToRemove = items.find(item => item._id === productId);

        if (itemToRemove) {
          set(state => ({
            items: state.items.filter(item => item._id !== productId),
            totalItems: state.totalItems - itemToRemove.quantity,
            totalAmount: state.totalAmount - (itemToRemove.price * itemToRemove.quantity)
          }));
        }
      },

      updateQuantity: (productId: string, quantity: number) => {
        const { items } = get();
        const existingItem = items.find(item => item._id === productId);

        if (existingItem) {
          const quantityDiff = quantity - existingItem.quantity;
          const updatedItems = items.map(item =>
            item._id === productId
              ? { ...item, quantity }
              : item
          );

          set(state => ({
            items: updatedItems,
            totalItems: state.totalItems + quantityDiff,
            totalAmount: state.totalAmount + (existingItem.price * quantityDiff)
          }));
        }
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalAmount: 0
        });
      },
    }),
    persistConfig
  )
);