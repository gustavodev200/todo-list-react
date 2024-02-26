import { useEffect } from "react";
import { Header, NewTask, Task } from "./components";

import { useNavigate } from "react-router-dom";
import { useAuthenticatedStore } from "./store/useAuthenticatedStore";

function App() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthenticatedStore(
    (state) => state.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className="w-full h-dvh overflow-hidden bg-slate-900 flex items-center  flex-col">
      <div className="w-full p-2 md:p-0 md:w-1/2 mt-10">
        <Header />
        <NewTask />
        <Task />
      </div>
    </main>
  );
}

export default App;
