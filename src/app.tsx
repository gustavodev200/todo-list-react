import { useState } from "react";
import { NewTask, Task } from "./components";

interface Task {
  id: string;
  date: Date;
  isComplete: boolean;
  content: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const taskOnStorage = localStorage.getItem("tasks");

    if (taskOnStorage) {
      return JSON.parse(taskOnStorage);
    }

    return [];
  });

  function onTaskCreated(content: string) {
    const newTask = {
      id: crypto.randomUUID(),
      date: new Date(),
      isComplete: false,
      content,
    };

    const tasksArray = [...tasks, newTask];

    setTasks(tasksArray);

    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }

  function onTaskDeleted(id: string) {
    const tasksArray = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(tasksArray);

    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }

  function onTaskChecked(id: string) {
    const taskIndex = tasks.findIndex((task) => {
      return task.id == id;
    });

    const tempTasks = [...tasks];

    tempTasks[taskIndex].isComplete = !tempTasks[taskIndex].isComplete;

    // tempTasks.sort((a) => (a ? -1 : 1));

    setTasks(tempTasks);

    localStorage.setItem("tasks", JSON.stringify(tempTasks));
  }

  return (
    <main className="w-full h-dvh  bg-slate-900 flex items-center  flex-col">
      <div className="w-1/2 mt-10">
        <h1 className="mb-5 text-green-400 text-3xl font-bold">My Tasks</h1>
        <NewTask onTaskCreated={onTaskCreated} />

        <div className="max-h-[400px] overflow-y-scroll py-2 no-scrollbar px-2">
          {tasks.map((task) => {
            return (
              <Task
                key={task.id}
                tasks={task}
                onTaskDeleted={onTaskDeleted}
                onTaskChecked={onTaskChecked}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default App;
