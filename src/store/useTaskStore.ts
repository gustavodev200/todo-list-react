import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Task = {
  id: string;
  date: Date;
  isComplete: boolean;
  content: string;
};

type StateTasks = {
  tasks: Task[];
};

type ActionsTasks = {
  onTaskCreated: (content: string) => void;
  onTaskChecked: (id: string) => void;
  onTaskDeleted: (id: string) => void;
};

export const useTaskStore = create<StateTasks & ActionsTasks>()(
  persist(
    (set, get) => ({
      tasks: [],

      onTaskCreated: (content) => {
        const newTask = {
          id: crypto.randomUUID(),
          date: new Date(),
          isComplete: false,
          content,
        };

        // Obtém o estado atual das tarefas
        const currentTasks = get().tasks;

        // Cria um novo array de tarefas com a nova tarefa adicionada
        const updatedTasks = [...currentTasks, newTask];

        // Ordena as tarefas com base no status de conclusão
        updatedTasks.sort((a, b) => {
          if (a.isComplete && !b.isComplete) {
            return 1;
          } else if (!a.isComplete && b.isComplete) {
            return -1;
          } else {
            return 0;
          }
        });

        // Define o novo estado das tarefas
        set({ tasks: updatedTasks });
      },

      onTaskChecked: (id) => {
        const tasks = get().tasks;

        const taskIndex = tasks.findIndex((task) => {
          return task.id == id;
        });

        const tempTasks = [...tasks];

        tempTasks[taskIndex].isComplete = !tempTasks[taskIndex].isComplete;

        tempTasks.sort((a, b) => {
          if (a.isComplete && !b.isComplete) {
            return 1;
          } else if (!a.isComplete && b.isComplete) {
            return -1;
          } else {
            return 0;
          }
        });

        set({ tasks: tempTasks });
      },

      onTaskDeleted: (id) => {
        const tasks = get().tasks;

        const taskIndex = tasks.findIndex((task) => {
          return task.id == id;
        });

        const tempTasks = [...tasks];

        tempTasks.splice(taskIndex, 1);

        set({ tasks: tempTasks });
      },
    }),
    {
      name: "@tasks",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
