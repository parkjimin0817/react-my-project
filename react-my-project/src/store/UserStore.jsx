import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
  currentUser: null,
  error: null,
  isLoading: false,

  login: async (userId, password) => {
    try {
      const response = await axios.get(`http://localhost:3001/users`, {
        params: { userId, password },
      });

      if (response.data.length > 0) {
        set({ currentUser: response.data[0], error: null });
        return true;
      } else {
        set({ error: '로그인 실패', currentUser: null });
        return false;
      }
    } catch (err) {
      set({ error: err.message, currentUser: null });
      return false;
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
