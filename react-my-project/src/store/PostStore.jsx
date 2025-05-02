import { create } from 'zustand';
import axios from 'axios';

const usePostStore = create((set) => ({
  posts: [],
  isLoading: false,
  error: null,

  getPosts: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get('http://localhost:3001/posts');
      set({ posts: response.data, isLoading: false });
    } catch (err) {
      set({ error: err.msg, isLoading: false });
    }
  },
}));

export default usePostStore;
