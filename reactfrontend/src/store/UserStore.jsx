import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
  currentUser: null,
  error: null,
  isLoading: false,

  login: async (user_id, user_pwd) => {
    try {
      const res = await axios.post('http://localhost:8889/api/members/login', {
        user_id,
        user_pwd,
      });
      if (res.data && res.data.user_id) {
        console.log('여긴가 : ', res);
        set({ currentUser: res.data, error: null });
        return { success: true };
      } else {
        set({ error: '로그인 실패 : 사용자 정보가 없습니다.', currentUser: null });
        return { success: false };
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: '에러 : ', message, currentUser: null });
      return false;
    }
  },
  signin: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post('http://localhost:8889/api/members', {
        user_id: formData.id,
        user_name: formData.name,
        email: formData.email,
        user_pwd: formData.password,
      });
      set({ isLoading: false });
      return { success: true, userId: res.data };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  logout: () => set({ currentUser: null, error: null, isLoading: false }),
}));

export default useUserStore;
