import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
  currentUser: null,
  error: null,
  isLoading: false,

  login: async (userId, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`http://localhost:3001/users?userId=${userId}&password=${password}`);
      if (response.data.length > 0) {
        set({ currentUser: response.data[0], error: null, isLoading: false });
      } else {
        set({ error: '아이디 또는 비밀번호가 올바르지 않습니다.', isLoading: false });
      }
    } catch (err) {
      set({ error: err.msg, isLoading: false });
    }
  },
  signin: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post('http://localhost:3001/users', {
        userId: formData.id,
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      set({ isLoading: false, error: null });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },

  logout: () => set({ currentUser: null, error: null, isLoading: false }),
}));

export default useUserStore;
