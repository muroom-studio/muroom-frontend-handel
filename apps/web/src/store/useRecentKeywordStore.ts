import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentSearchStoreProps {
  recentSearches: string[];
  addRecentSearch: (keyword: string) => void;
  removeRecentSearch: (keyword: string) => void;
  clearRecentSearches: () => void;
  pendingKeyword: string | null;
  setPendingKeyword: (keyword: string | null) => void;
}

export const useRecentSearchStore = create<RecentSearchStoreProps>()(
  persist(
    (set) => ({
      recentSearches: [],

      pendingKeyword: null,
      setPendingKeyword: (keyword) => set({ pendingKeyword: keyword }),

      addRecentSearch: (keyword: string) =>
        set((state) => {
          const trimmedKeyword = keyword.trim();
          if (!trimmedKeyword) return state;
          const filtered = state.recentSearches.filter(
            (item) => item !== trimmedKeyword,
          );
          const newRecentSearches = [trimmedKeyword, ...filtered].slice(0, 7);
          return { recentSearches: newRecentSearches };
        }),

      removeRecentSearch: (keyword: string) =>
        set((state) => ({
          recentSearches: state.recentSearches.filter(
            (item) => item !== keyword,
          ),
        })),

      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'recent-keyword-store',
    },
  ),
);
