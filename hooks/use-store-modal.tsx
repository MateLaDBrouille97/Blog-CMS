import { create } from 'zustand';

interface useBlogModalBlog {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useBlogModal = create<useBlogModalBlog>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));