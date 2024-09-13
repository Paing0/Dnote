import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <>
      <section className="max-w-5xl mx-auto relative h-screen">
        <Navbar></Navbar>
        <Outlet />
      </section>
    </>
  );
};

export default Main;
