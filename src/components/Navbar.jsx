import { Link } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
  const { token, updateToken } = useContext(UserContext);

  const logoutHandler = () => {
    updateToken(null);
  };

  return (
    <nav className="bg-slate-100 py-4 px-10 font-mono">
      <div className=" flex items-center justify-between">
        <Link to={"/"} className="text-teal-600 font-bold text-4xl">
          SHARENOTE.io
        </Link>
        <div className="flex gap-3">
          {token ? (
            <>
              <Link
                className="text-teal-600 font-medium text-lg"
                to={"/create"}
              >
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
      </div>
      {token && token.user_mail && (
        <p className="text-right text-sm text-teal-600">
          <span className="font-semibold">Logged in as </span>
          {token.user_mail}
        </p>
      )}
    </nav>
  );
};

export default Navbar;
