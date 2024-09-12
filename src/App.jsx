import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Index from "./pages/Index";
import Main from "./layouts/Main";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Details from "./pages/Details";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "/create",
          element: <Create />,
        },
        {
          path: "/edit/:id",
          element: <Edit />,
        },
        {
          path: "/notes/:id",
          element: <Details />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
