import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface NewTaskProps {
  onTaskCreated: (content: string) => void;
}

const NewTask = ({ onTaskCreated }: NewTaskProps) => {
  const [content, setContent] = useState("");

  function handleTextInput(event: ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  function handleSaveTask(event: FormEvent) {
    event.preventDefault();

    if (content === "") {
      toast.error("Por favor, digite uma tarefa.");
      return;
    }

    onTaskCreated(content);

    setContent("");

    toast.success("Tarefa criada com sucesso!");
  }

  return (
    <form className="flex w-full h-[60px] mb-10 items-center justify-between bg-slate-500 p-2 rounded-md">
      <input
        type="text"
        placeholder="Digite uma tarefa..."
        onChange={handleTextInput}
        className="w-full h-full bg-transparent outline-none text-white text-xl"
        value={content}
        autoFocus
      />
      <button
        className="h-full rounded-md bg-slate-900 px-5 text-white font-bold"
        onClick={handleSaveTask}
      >
        Add
      </button>
    </form>
  );
};

export default NewTask;
