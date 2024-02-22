import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  id?: string;
  name: string;
  date?: Date;
  isComplete?: boolean;
  content?: string;
};

type Action = {
  updateName: (name: State["name"]) => void;
  updateDate: (date: Date) => void;
  updateIsComplete: (isComplete: boolean) => void;
  updateContent: (content: State["content"]) => void;
};

export const useAuthenticatedStore = create(
  persist(
    (set, get) => ({
      id: "",
      name: "",
      date: "",
      isComplete: false,
      content: "",

      updateName: () => set({ name: get() }),
    }),
    {
      name: "@userTask", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
