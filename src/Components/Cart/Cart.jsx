import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../Authorization/AuthProvider";
import useCart from "../Hooks/useCart";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [itemCounts, setItemCounts] = useState({});

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("https://repliqq.vercel.app/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);
  let orderId = orders.map((id) => id.id);
  let itemId = "";
  for (let i of orderId) {
    itemId += i;
  }
  console.log(itemId);
  let [Cart] = useCart();

  // Function to handle increment
  const handleIncrement = (itemId) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemId]: (prevCounts[itemId] || 0) + 1,
    }));
  };

  const handleDecrement = (itemId) => {
    if (itemCounts[itemId] > 0) {
      setItemCounts((prevCounts) => ({
        ...prevCounts,
        [itemId]: prevCounts[itemId] - 1,
      }));
    }
  };

  const handleRemoveItem = (product) => {
    console.log(product._id);
    fetch(`https://repliqq.vercel.app/carts/${product._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Deleted From Cart");
        }
        window.location.reload();
      });
  };

  const handleConfirmOrder = (product) => {
    const itemCountText = JSON.stringify(itemCounts); // Convert itemCounts object to JSON string

    fetch(`https://repliqq.vercel.app/orders/${product._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: product.name,
        photo: product.photo,
        description: product.description,
        price: product.price,
        id: product.id,
        user: user,
        email: user?.email,
        quantity: itemCountText,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Confirmed Order");
      });
  };

  return (
    <div>
      <Toaster />
      <Navbar />

      <div className="grid grid-cols-3 p-8 rounded-lg bg-base-300 max-w-[1200px] mx-auto">
        <div className="">
          <table className=" w-[1200px]">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Cart.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={order.photo} alt={order.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{order.name}</div>
                        <div className="text-sm opacity-50">
                          {order.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>${order.price}</td>
                  <td className="flex flex-col justify-center items-start gap-4 text-xl">
                    <button
                      onClick={() => handleIncrement(order.id)}
                      className="btn btn-ghost text-xl"
                    >
                      +
                    </button>
                    <input
                      type="text"
                      value={itemCounts[order.id] || 0}
                      readOnly
                    />
                    <button
                      onClick={() => handleDecrement(order.id)}
                      className="btn btn-ghost text-xl"
                    >
                      -
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleConfirmOrder(order)}
                      className="btn btn-success hover:bg-white btn-outline"
                    >
                      Confirm order
                    </button>
                    <button
                      onClick={() => handleRemoveItem(order)}
                      className="btn ml-8 btn-error hover:bg-white btn-outline"
                    >
                      Remove From Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
