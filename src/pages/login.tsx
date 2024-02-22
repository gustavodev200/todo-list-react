import React, { ChangeEvent, FormEvent } from "react";
import { useAuthenticatedStore } from "../store/useAuthenticatedStore";
import { toast } from "sonner";
import { redirect } from "react-router-dom";

const Login = () => {
  const nameInput = useAuthenticatedStore((state) => state.name);
  const updateName = useAuthenticatedStore((state) => state.updateName);

  function getNameInput(event: ChangeEvent<HTMLInputElement>) {
    updateName(event.target.value);
  }

  function onSaveNameForLogin(event: FormEvent) {
    event.preventDefault();

    if (nameInput === "") {
      toast.error("Por favor, digite um nome.");
    }

    redirect("/tasks");

    toast.success("Bem-vindo" + nameInput);
  }
  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center">
      <h1 className="text-green-400 text-3xl font-bold mb-10">
        Welcome to <span className="text-white">MyTasks.ts</span>
      </h1>

      <form className="flex w-1/2 h-[60px] mb-10 items-center justify-between bg-slate-500 px-4 py-2 rounded-md">
        <input
          autoFocus
          type="text"
          placeholder="Your Name"
          className="w-full h-full bg-transparent outline-none text-white text-lg"
          max={100}
          onChange={getNameInput}
          value={nameInput}
        />

        <button
          type="submit"
          className="h-full rounded-md bg-green-400 px-5 text-white font-bold"
          onClick={onSaveNameForLogin}
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
