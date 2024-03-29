import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Trash2 } from "lucide-react";
import { useTaskStore } from "../store/useTaskStore";

const Task = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const onTaskChecked = useTaskStore((state) => state.onTaskChecked);
  const onTaskDeleted = useTaskStore((state) => state.onTaskDeleted);

  return (
    <div className="overflow-scroll py-2 pb-10 no-scrollbar">
      {tasks.map((task) => (
        <div key={task.id} className="w-full mt-3">
          <ul>
            <li className="w-full flex items-center justify-between text-xl py-2 px-4 rounded-md bg-slate-800 text-slate-200">
              <span className="flex">
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center mr-4 rounded-full cursor-pointer"
                    htmlFor="customStyle"
                  >
                    <input
                      readOnly
                      type="checkbox"
                      className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-full border border-green-500 bg-transparent transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-green-500 checked:before:bg-green-500 hover:scale-105 hover:before:opacity-0"
                      id="customStyle"
                      onClick={() => onTaskChecked(task.id)}
                      checked={task.isComplete}
                    />
                    <span className="absolute text-slate-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4  peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-width="1"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                </div>
                <span>
                  <span className="flex flex-col text-slate-400 text-sm">
                    {formatDistanceToNow(task.date, {
                      locale: ptBR,
                      addSuffix: true,
                    })}

                    {/* {format(task.date, "hh:mm")} */}
                  </span>
                  <span
                    className={`${
                      task.isComplete ? "line-through text-slate-500" : ""
                    }`}
                  >
                    {task.content}
                  </span>
                </span>
              </span>

              <div className="flex items-center gap-6">
                <button
                  className="text-red-400"
                  onClick={() => onTaskDeleted(task.id)}
                >
                  <Trash2 />
                </button>
              </div>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Task;
