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
      await axios.post('http://localhost:3001/goals', {
        no: formData.no,
        userId: formData.id,
        goalTitle: formData.title,
        goalDescription: formData.content,
        startDate: formData.date,
        frequency: formData.frequency,
      });
      set({ isLoading: false, error: null });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },
}));

export default useGoalStore;
