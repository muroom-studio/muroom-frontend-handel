import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthRedirectState {
  redirectUrl: string | null;
  setRedirectUrl: (url: string) => void;
  clearRedirectUrl: () => void;
  performRedirect: () => void;
}

export const useAuthRedirectStore = create<AuthRedirectState>()(
  persist(
    (set, get) => ({
      redirectUrl: null,
      setRedirectUrl: (url) => set({ redirectUrl: url }),
      clearRedirectUrl: () => set({ redirectUrl: null }),
      performRedirect: () => {
        const { redirectUrl } = get();
        if (redirectUrl) {
          window.location.href = redirectUrl;
          set({ redirectUrl: null });
        } else {
          window.location.href = '/home';
        }
      },
    }),
    {
      name: 'auth-redirect-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
