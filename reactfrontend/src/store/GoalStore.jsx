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

  getMyGoals: async (userId) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`http://localhost:3001/goals?userId=${userId}`);
      set({ goals: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
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
      });
      set({ isLoading: false, error: null });
      return response.data;
    } catch (error) {
      set({ isLoading: false, error: error.message });
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
