import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../data/products';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';

interface ProductState {
  products: Product[];
  toggleAvailability: (productId: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  resetProductsToSeed: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,

      toggleAvailability: (productId: string) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId ? { ...p, isAvailable: !p.isAvailable } : p
          ),
        }));
      },

      getProductBySlug: (slug: string) => {
        return get().products.find((p) => p.slug === slug);
      },

      resetProductsToSeed: () => {
        set({ products: INITIAL_PRODUCTS });
      },
    }),
    {
      name: 'honeymarve-products-storage',
    }
  )
);
