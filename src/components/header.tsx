import { useAuthenticatedStore } from "../store/useAuthenticatedStore";

const Header = () => {
  const getName = useAuthenticatedStore((state) => state.getName());

  return (
    <div className="flex w-full ">
      <h1 className="flex w-full mb-5 text-green-400 text-4xl font-bold justify-between">
        Welcome
        <span className="flex w-full text-white text-4xl font-bold ml-2">
          {getName}
        </span>
      </h1>
    </div>
  );
};

export default Header;
