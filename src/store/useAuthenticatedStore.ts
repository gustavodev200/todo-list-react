import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  name: string;
  isAuthenticated: boolean;
};

type Actions = {
  updateName: (name: string) => void;
  getName: () => string;
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
    }),
    {
      name: "@user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
