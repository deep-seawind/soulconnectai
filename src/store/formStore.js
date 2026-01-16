import { create } from "zustand";

export const useFormStore = create(set => ({
  answers: {},

  setAnswer: (section, data) =>
    set(state => ({
      answers: {
        ...state.answers,
        [section]: {
          ...state.answers[section],
          ...data,
        },
      },
    })),

  resetForm: () => set({ answers: {} }),
}));
