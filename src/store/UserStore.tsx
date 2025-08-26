import { create } from "zustand";

interface User {
  email: string;
}

interface UserStoreState {
  user: User | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;

  setUser: (user: User | null) => void;
  setIsSigningUp: (isSigningUp: boolean) => void;
  setIsLoggingIn: (isLoggingIn: boolean) => void;

  checkAuth: () => Promise<void>;
}

const CHECK_AUTH_URL = "http://localhost:3000/api/v1/checkauth";

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

  // Setter Functions
  setUser: (user: User | null) => {
    set({ user: user });
  },
  setIsSigningUp: (isSigningUp: boolean) => {
    set({ isSigningUp: isSigningUp });
  },
  setIsLoggingIn: (isLoggingIn: boolean) => {
    set({ isLoggingIn: isLoggingIn });
  },

  // Functions
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await fetch(CHECK_AUTH_URL, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        set({ user: data });
      }
    } catch (err) {
      set({ user: null });
      console.log(err);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
