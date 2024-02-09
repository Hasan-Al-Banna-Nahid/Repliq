import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);
  useEffect(() => {
    orders.map((order) => setUser(order?.user?.email));
  }, []);
  console.log(orders);
  const handleRemoveProduct = (order) => {
    fetch(`http://localhost:5000/orders/${order._id}`, {
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
  const handleConfirmOrder = (order) => {
    fetch(`http://localhost:5000/sendConfirmEmail/${order._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product: order.name,
        email: order.user.email,
        user: order?.user?.displayName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.insertedId) {
          toast.success("Confirmation Email Sent");
        } else {
          toast.error("Failed to send Confirmation Email");
        }
      })
      .catch((error) => {
        console.error("Error confirming order:", error);
        toast.error("Failed to send Confirmation Email");
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
                <th className="text-2xl font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {orders.map((order) => {
                return (
                  <tr>
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
                          <div className="font-bold">{order.user.email}</div>
                          <div className="text-sm font-bold opacity-50">
                            {order.price}$
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="font-bold">{order.description}</td>
                    <th className="flex justify-center gap-8">
                      <button
                        onClick={() => handleConfirmOrder(order)}
                        className="btn btn-primary btn-xs"
                      >
                        Appove
                      </button>
                      <button
                        onClick={() => handleRemoveProduct(order)}
                        className="btn btn-error btn-xs"
                      >
                        Cancel
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
            {/* foot */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
