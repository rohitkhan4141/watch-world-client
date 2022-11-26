import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { AuthContext } from "../Contexts/AuthContext/AuthContext";
import useAdmin from "../Hooks/useAdmin";

const DashBoardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  return (
    <div>
      <Navbar />
      <div className='drawer drawer-mobile'>
        <input
          id='dashboard-drawer'
          type='checkbox'
          className='drawer-toggle'
        />
        <div className='drawer-content'>
          <Outlet />
        </div>
        <div className='drawer-side'>
          <label htmlFor='dashboard-drawer' className='drawer-overlay'></label>
          <ul className='menu p-4 w-80 bg-base-100 text-base-content'>
            <li>
              <Link to='/dashboard/buyer/myorders'>My Orders</Link>
            </li>
            <li>
              <Link to='/dashboard/seller/addproduct'>Add Products</Link>
            </li>
            <li>
              <Link to='/dashboard/seller/myproduct'>My Products</Link>
            </li>
            {isAdmin && (
              <>
                <li>
                  <Link to='/dashboard/admin/allbuyers'>All Buyers</Link>
                </li>
                <li>
                  <Link to='/dashboard/admin/allsellers'>All sellers</Link>
                </li>
                <li>
                  <Link to='/dashboard/admin/repoteditems'>Repoted Items</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
