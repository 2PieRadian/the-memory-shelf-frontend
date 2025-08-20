import { create } from "zustand";

export interface ContentItem {
  _id: string;
  title: string;
  link: string;
  type: string;
  tags: string[];
  userId: string;
}

interface ContentStoreState {
  contents: ContentItem[];
  isLoading: boolean;
  error: string | null;
  setContents: (contents: ContentItem[]) => void;
  addContent: (content: ContentItem) => void;
  clearContents: () => void;
  fetchContents: () => Promise<void>;
}

export const useContent = create<ContentStoreState>((set) => ({
  contents: [],
  isLoading: false,
  error: null,

  setContents: (contents) => set({ contents }),

  addContent: (content) =>
    set((state) => ({ contents: [...state.contents, content] })),

  clearContents: () => set({ contents: [] }),

  fetchContents: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch(
        import.meta.env.VITE_BACKEND_CONTENT_URL as string,
        { credentials: "include" }
      );
      const data = await response.json();
      set({ contents: data.contents ?? [] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
