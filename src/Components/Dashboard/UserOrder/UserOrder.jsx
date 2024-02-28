import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useOrder from "../../Hooks/useOrder";

const userOrder = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState("");
  // useEffect(() => {
  //   fetch("https://repliqq.vercel.app/orders")
  //     .then((res) => res.json())
  //     .then((data) => setOrders(data));
  // }, []);
  let [order] = useOrder();
  console.log(order);
  useEffect(() => {
    order.map((order) => setUser(order?.user?.email));
  }, []);
  const handleRemoveProduct = (order) => {
    fetch(`https://repliqq.vercel.app/orders/${order._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount >= 1) {
          toast.success("Product Deleted");
          window.location.reload();
        }
      });
  };
  return (
    <div>
      <Toaster />
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th className="text-2xl font-bold">Name</th>

                <th className="text-2xl font-bold">Description </th>
                <th className="text-2xl font-bold">Quantity </th>
                <th className="text-2xl font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {order.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center font-bold">
                    No orders
                  </td>
                </tr>
              ) : (
                order.map((order) => (
                  <tr key={order.id}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={order.photo} alt="products" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{order.name}</div>
                          <div className="font-bold">{user}</div>
                          <div className="text-sm font-bold opacity-50">
                            {order.price}$
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="font-bold">{order.description}</td>
                    <td>{order.quantity}</td>
                    <th className="flex justify-center gap-8">
                      <button
                        onClick={() => handleRemoveProduct(order)}
                        className="btn btn-primary btn-xs"
                      >
                        Pay
                      </button>
                      <button
                        onClick={() => handleRemoveProduct(order)}
                        className="btn btn-error btn-xs"
                      >
                        Cancel
                      </button>
                    </th>
                  </tr>
                ))
              )}
            </tbody>
            {/* foot */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default userOrder;
