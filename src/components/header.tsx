import { useAuthenticatedStore } from "../store/useAuthenticatedStore";

const Header = () => {
  const getName = useAuthenticatedStore((state) => state.getName());
  const { logout } = useAuthenticatedStore();

  return (
    <div className="flex w-full items-center justify-between mb-7">
      <h1 className="flex w-full  text-green-400 text-lg md:text-xl font-bold justify-between">
        Welcome
        <span className="flex w-full text-white font-bold ml-2">{getName}</span>
      </h1>
      <button
        onClick={logout}
        className="text-green-400 bg-slate-800 px-4 py-2 rounded-md hover:bg-slate-700 font-medium"
      >
        Sair
      </button>
    </div>
  );
};

export default Header;
