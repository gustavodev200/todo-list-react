import create from "zustand";

type State = {
  name: string;
};

type Action = {
  updateName: (name: State["name"]) => void;
};

export const useAuthenticatedStore = create<State & Action>((set) => ({
  name: "",
  updateName: (name) => set(() => ({ name: name })),
}));

// persist(
//     (set, get) => ({
//       id: "",
//       name: "",
//       date: "",
//       isComplete: false,
//       content: "",

//       updateName: () => set({ name: get() }),
//     }),
//     {
//       name: "@userTask", // name of the item in the storage (must be unique)
//       storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
//     }
