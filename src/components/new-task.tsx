import React, { ChangeEvent, useState } from "react";

interface NewTaskProps {
  onTaskCreated: (content: string) => void;
}

const NewTask = ({ onTaskCreated }: NewTaskProps) => {
  const [taskValue, setTaskValue] = useState("");

  function handleTextInput(event: ChangeEvent<HTMLInputElement>) {
    const textInput = event.target.value;

    setTaskValue(textInput);
  }

  return (
    <div className="flex w-full h-[60px] mb-10 items-center justify-between bg-slate-500 p-2 rounded-md">
      <input
        type="text"
        placeholder="Digite uma tarefa..."
        onChange={handleTextInput}
        className="w-full h-full bg-transparent outline-none text-white text-xl"
      />
      <button
        className="h-full rounded-md bg-slate-900 px-5 text-white font-bold"
        onClick={() => onTaskCreated(taskValue)}
      >
        Add
      </button>
    </div>
  );
};

export default NewTask;
