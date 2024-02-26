import React, { useEffect, useState } from "react";

import { Link, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
const Dashboard = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch("https://repliqq.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  const [isAdmin] = useAdmin();
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-[#3B3B98] text-white font-bold text-xl">
            {/* Sidebar content here */}
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            {isAdmin?.admin === true ? (
              <div>
                <li>
                  <Link to={"products"}>Add Products</Link>
                </li>
                <li>
                  <Link to={"allProducts"}>Products</Link>
                </li>
                <li>
                  <a>Add Customers</a>
                </li>
                <li>
                  <Link to={"orderList"}>Order List</Link>
                </li>
                <li>
                  <Link to={"users"}>Users</Link>
                </li>
              </div>
            ) : (
              <>
                <li>
                  <Link to={"userOrderList"}>Order List</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      ;
    </div>
  );
};

export default Dashboard;
