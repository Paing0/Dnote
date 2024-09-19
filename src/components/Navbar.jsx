import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-100 py-4 px-10 flex items-center justify-between">
      <Link to={"/"} className="text-teal-600 font-bold text-4xl">
        SHARENOTE.io
      </Link>
      <div className="flex gap-3">
        <Link className="text-teal-600 font-medium text-lg" to={"/create"}>
          Create
        </Link>

        <Link className="text-teal-600 font-medium text-lg" to={"/register"}>
          Register
        </Link>

        <Link className="text-teal-600 font-medium text-lg" to={"/login"}>
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
