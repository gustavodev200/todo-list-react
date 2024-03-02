import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useTaskStore } from "./useTaskStore";

type State = {
  name: string;
  isAuthenticated: boolean;
};

type Actions = {
  updateName: (name: string) => void;
  getName: () => string;
  logout: () => void;
};

export const useAuthenticatedStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      name: "",
      isAuthenticated: false,

      updateName: (name) =>
        set(() => ({
          name,
          isAuthenticated: !!name.trim(),
        })),
      getName: () => get().name,

      logout: () => {
        set({ name: "", isAuthenticated: false });
        useTaskStore.getState().onRemove();
        localStorage.removeItem("@tasks");
        localStorage.removeItem("@user");
      },
    }),

    {
      name: "@user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
