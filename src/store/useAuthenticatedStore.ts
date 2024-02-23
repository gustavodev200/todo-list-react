import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  name: string;
  isAuthenticated: boolean;
};

type Actions = {
  updateName: (name: string) => void;
};

export const useAuthenticatedStore = create<State & Actions>()(
  persist(
    (set) => ({
      name: "",
      isAuthenticated: false,

      updateName: (name) =>
        set(() => ({
          name,
          isAuthenticated: !!name.trim(),
        })),
    }),
    {
      name: "@user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
