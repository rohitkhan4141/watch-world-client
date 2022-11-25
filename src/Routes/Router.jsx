import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../Layout/DashBoardLayout";
import Main from "../Layout/Main";
import Blog from "../Pages/Blog/Blog";
import Dashboard from "../Pages/Dashboard/DashBoard/Dashboard";
import DisplayWatches from "../Pages/DisplayWatches/DisplayWatches";
import Home from "../Pages/Home/Home/Home.jsx";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blog",
        element: (
          <PrivateRoute>
            <Blog />
          </PrivateRoute>
        ),
      },
      {
        path: `/categories/:name`,
        element: (
          <PrivateRoute>
            <DisplayWatches />
          </PrivateRoute>
        ),
        loader: async ({ params }) =>
          await fetch(`http://localhost:5000/categories/${params.name}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
