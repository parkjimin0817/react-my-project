import { create } from 'zustand';
import axios from 'axios';

const useGoalStore = create((set) => ({
  goals: [],
  isLoading: false,
  error: null,

  getGoals: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get('http://localhost:3001/goals');
      set({ goals: response.data, isLoading: false });
    } catch (err) {
      set({ error: err.msg, isLoading: false });
    }
  },

  getMyGoals: async (userId) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`http://localhost:3001/goals?userId=${userId}`);
      set({ goals: response.data, isLoading: false });
    } catch (err) {
      set({ error: err.msg, isLoading: false });
    }
  },

  postMyGoals: async (formData) => {
    set({ isLoading: true, error: null });
  
    try {
      const response = await axios.post('http://localhost:3001/goals', {
        userId: formData.userId,
        goalTitle: formData.title,
        goalDescription: formData.content,
        startDate: formData.date,
        frequency: formData.frequency,
        status: 'progress' // 이 필드가 DB에 필요해 보이니까 추가
      });
      set({ isLoading: false, error: null });
      return response.data; // 🔥 생성된 목표 객체 반환
    } catch (error) {
      set({ isLoading: false, error: error.message });
      return null;
    }
  },

  // getGoalById 함수를 set 객체 내에 포함
  getGoalById: async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/goals/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching goal:', error);
      return null; // 에러가 나면 null 반환
    }
  },

  updateGoal: async (id, updatedData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.put(`http://localhost:3001/goals/${id}`, updatedData);
      if (response.data) {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? response.data : goal
          ),
        }));
      }
      set({ isLoading: false });
      return response.data; // 업데이트된 목표 반환
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.error('Goal update failed', error);
      return null;
    }
  },
  deleteGoal: async (id) => {
    try {
      await axios.delete(`http://localhost:3001/goals/${id}`);
      set((state) => ({
        goals: state.goals.filter((goal) => goal.id !== id),
      }));
    } catch (error) {
      console.error('Goal delete failed', error);
      set({ error: error.message });
    }
  },

}));

export default useGoalStore;
