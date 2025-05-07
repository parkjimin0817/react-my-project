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
  createPost: async (newPost) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('http://localhost:3001/posts', newPost);
      set((state) => ({
        posts: [...state.posts, response.data],
        isLoading: false,
      }));
    } catch (err) {
      set({ error: err.message || '게시글 등록 실패', isLoading: false });
    }
  },
  deletePost: async (id) => {
    try {
      await axios.delete(`http://localhost:3001/posts/${id}`);
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
      }));
    } catch (error) {
      console.error('post delete failed', error);
      set({ error: error.message });
    }
  },
}));

export default usePostStore;
