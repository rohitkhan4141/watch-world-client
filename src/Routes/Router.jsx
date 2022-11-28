import { createBrowserRouter } from "react-router-dom";
import Four04 from "../components/404/Four04";
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
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

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
        element: <Blog />,
      },
      {
        path: `/categories/:name`,
        element: (
          <PrivateRoute>
            <DisplayWatches />
          </PrivateRoute>
        ),
        loader: async ({ params }) =>
          await fetch(
            `https://watch-world-server.vercel.app/categories/${params.name}`,
            {
              headers: {
                authorization: `bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
      },
      {
        path: "*",
        element: <Four04 />,
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
        path: `/dashboard/buyer/payment/:id`,
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/buyer/myorders",
        element: <MyOrders />,
      },
      {
        path: "/dashboard/seller/addproduct",
        element: (
          <SellerRoute>
            <AddProduct />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/seller/myproduct",
        element: (
          <SellerRoute>
            <MyProducts />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/admin/allbuyers",
        element: (
          <AdminRoute>
            <AllBuyers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin/allsellers",
        element: (
          <AdminRoute>
            <AllSellers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin/repoteditems",
        element: (
          <AdminRoute>
            <RepotedItems />
          </AdminRoute>
        ),
      },
      {
        path: "*",
        element: <Four04 />,
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
  {
    path: "*",
    element: <Four04 />,
  },
]);

export default router;
