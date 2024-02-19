import { useState } from "react";
import { NewTask, Task } from "./components";

interface Task {
  id: string;
  date: Date;
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

  return (
    <main className="w-full h-dvh  bg-slate-900 flex items-center  flex-col">
      <div className="w-1/2 mt-10">
        <h1 className="mb-5 text-green-400 text-3xl font-bold">My Tasks</h1>
        <NewTask onTaskCreated={onTaskCreated} />
        {tasks.map((task) => {
          return (
            <Task key={task.id} tasks={task} onTaskDeleted={onTaskDeleted} />
          );
        })}
      </div>
    </main>
  );
}

export default App;
