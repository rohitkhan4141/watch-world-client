import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../Layout/DashBoardLayout";
import Main from "../Layout/Main";
import Blog from "../Pages/Blog/Blog";
import AllBuyers from "../Pages/Dashboard/AdminDashboard/AllBuyers";
import AllSellers from "../Pages/Dashboard/AdminDashboard/AllSellers";
import RepotedItems from "../Pages/Dashboard/AdminDashboard/RepotedItems";
import MyOrders from "../Pages/Dashboard/BuyerDashboard/MyOrders";
import Dashboard from "../Pages/Dashboard/DashBoard/Dashboard";
import Payment from "../Pages/Dashboard/Payment/Payment";
import AddProduct from "../Pages/Dashboard/SellerDashBoard/AddProduct";
import MyProducts from "../Pages/Dashboard/SellerDashBoard/MyProducts";
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
      {
        path: "/dashboard/buyer/payment",
        element: <Payment />,
      },
      {
        path: "/dashboard/buyer/myorders",
        element: <MyOrders />,
      },
      {
        path: "/dashboard/seller/addproduct",
        element: <AddProduct />,
      },
      {
        path: "/dashboard/seller/myproduct",
        element: <MyProducts />,
      },
      {
        path: "/dashboard/admin/allbuyers",
        element: <AllBuyers />,
      },
      {
        path: "/dashboard/admin/allsellers",
        element: <AllSellers />,
      },
      {
        path: "/dashboard/admin/repoteditems",
        element: <RepotedItems />,
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
