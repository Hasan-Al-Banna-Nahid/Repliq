import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./Components/Home/Home.jsx";
import AuthProvider from "./Components/Authorization/AuthProvider.jsx";
import Login from "./Components/Authorization/Login/Login.jsx";
import Registration from "./Components/Authorization/Registration/Registration.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import AddProducts from "./Components/Dashboard/AddProducts/AddProducts.jsx";
import AllProducts from "./Components/Dashboard/AllProducts/AllProducts.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import OrderList from "./Components/Dashboard/OrderList/OrderList.jsx";
import UserOrder from "./Components/Dashboard/UserOrder/UserOrder.jsx";
import Users from "./Components/Dashboard/Users/Users.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <Registration />,
      },
      {
        path: "/carts",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "products",
        element: <AddProducts />,
      },
      {
        path: "allProducts",
        element: <AllProducts />,
      },
      {
        path: "orderList",
        element: <OrderList />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "userOrderList",
        element: <UserOrder />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
