import { create } from "zustand";

interface User {
  email: string;
}

interface UserStoreState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));