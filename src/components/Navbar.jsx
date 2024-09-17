import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-100 py-4 px-10 flex items-center justify-between">
      <h1 className="text-teal-600 font-bold text-4xl">SHARENOTE.io</h1>
      <div>
        <Link className="text-teal-600 font-medium text-lg" to={"/create"}>
          Create
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
