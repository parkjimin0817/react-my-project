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
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  },

  getMyGoals: async (user_id) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`http://localhost:8889/api/goals/${user_id}`);
      console.log('골 : ', response);
      set({ goals: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  },

  postMyGoals: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post('http://localhost:8889/api/goals', {
        user_id: formData.user_id,
        goal_title: formData.title,
        goal_content: formData.content,
        start_date: formData.date,
        frequency: formData.frequency,
      });
      set({ isLoading: false });
      return { success: true, data: res.data };
    } catch (error) {
      const message = error.response?.data?.message || error.message;

      console.error('목표 등록 실패!', {
        message,
        status: error.response?.status,
        data: error.response?.data,
        formData,
      });

      set({ isLoading: false, error: message });
      return null;
    }
  },

  getGoalById: async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/goals/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching goal:', error);
      return null;
    }
  },

  updateGoal: async (id, updatedData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.put(`http://localhost:3001/goals/${id}`, updatedData);
      if (response.data) {
        set((state) => ({
          goals: state.goals.map((goal) => (goal.id.toString() === id.toString() ? response.data : goal)),
        }));
      }
      set({ isLoading: false });
      return response.data;
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
