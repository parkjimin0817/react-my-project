import { create } from 'zustand';
import axios from 'axios';

const usePostStore = create((set) => ({
  posts: [],
  postDetail: null,
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
  getPostDetail: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`http://localhost:3001/posts?id=${id}`);
      set({ postDetail: response.data[0], isLoading: false });
      console.log(response.data[0]);
    } catch (err) {
      set({ error: err.message || '데이터 요청 실패', isLoading: false });
    }
  },
}));

export default usePostStore;
