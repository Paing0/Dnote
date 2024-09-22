import { Link } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
  const { token, updateToken } = useContext(UserContext);

  const logoutHandler = () => {
    updateToken(null);
  };

  return (
    <nav className="bg-slate-100 py-4 px-10 flex items-center justify-between">
      <Link to={"/"} className="text-teal-600 font-bold text-4xl">
        SHARENOTE.io
      </Link>
      <div className="flex gap-3">
        {token ? (
          <>
            <Link className="text-teal-600 font-medium text-lg" to={"/create"}>
              Create
            </Link>

            <Link
              type="button"
              className="text-teal-600 font-medium text-lg"
              onClick={logoutHandler}
              to={"/"}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link className="text-teal-600 font-medium text-lg" to={"/login"}>
              Login
            </Link>

            <Link
              className="text-teal-600 font-medium text-lg"
              to={"/register"}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
