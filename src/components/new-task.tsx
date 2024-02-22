import { Mic } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface NewTaskProps {
  onTaskCreated: (content: string) => void;
}

const NewTask = ({ onTaskCreated }: NewTaskProps) => {
  const [content, setContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  let speechRecognition: SpeechRecognition | null = null;

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

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvailable) {
      alert("Seu navegador não possui suporte para o reconhecimento de fala.");
    }

    setIsRecording(true);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");

      setContent(transcription);
    };

    speechRecognition.onerror = (event) => {
      console.error(event.error);
    };

    speechRecognition.start();
  }

  function handleStopRecording() {
    setIsRecording(false);

    if (speechRecognition !== null) {
      speechRecognition.stop();
    }
  }

  return (
    <form className="flex w-full h-[60px] mb-10 items-center justify-between bg-slate-500 p-2 rounded-md">
      <input
        autoFocus
        type="text"
        placeholder="Digite uma tarefa..."
        onChange={handleTextInput}
        className="w-full h-full bg-transparent outline-none text-white text-lg"
        value={content}
        max={100}
      />

      {!isRecording ? (
        <button
          type="button"
          className="h-full rounded-md bg-slate-600 px-5 text-white mr-2"
          onClick={handleStartRecording}
        >
          <Mic />
        </button>
      ) : (
        <button
          type="button"
          className="h-full rounded-md bg-slate-600 px-5 text-white mr-2"
          onClick={handleStopRecording}
        >
          <div className="size-3 rounded-full bg-red-500 animate-pulse" />
          {/* <PauseCircle /> */}
        </button>
      )}
      <button
        type="submit"
        className="h-full rounded-md bg-slate-900 px-5 text-white font-bold"
        onClick={handleSaveTask}
      >
        Add
      </button>
    </form>
  );
};

export default NewTask;
