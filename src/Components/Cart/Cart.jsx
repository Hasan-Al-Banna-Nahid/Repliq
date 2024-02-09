import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../Authorization/AuthProvider";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetch("https://repliq-cbgfolqwz-iamnahid591998-gmailcom.vercel.app/carts")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  const handleRemoveItem = (product) => {
    console.log(product._id);
    fetch(
      `https://repliq-cbgfolqwz-iamnahid591998-gmailcom.vercel.app/carts/${product._id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Deleted From Cart");
        }
        window.location.reload();
      });
  };
  const handleConfirmOrder = (product) => {
    fetch(
      `https://repliq-cbgfolqwz-iamnahid591998-gmailcom.vercel.app/orders/${product._id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: product.name,
          photo: product.photo,
          description: product.description,
          price: product.price,
          id: product.id,
          user: user,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        toast.success("Confirmed Order");
      });
  };
  return (
    <div>
      <Toaster />
      <Navbar />

      <div className="grid grid-cols-3 p-8 rounded-lg bg-base-300">
        {products.map((product) => (
          <div key={product._id}>
            <div className="card p-12 my-8">
              <img
                src={product.photo}
                className="card-img-top"
                width={200}
                height={200}
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title font-bold">Name: {product.name}</h5>
                <p className="card-text font-bold">
                  Description: {product.description}
                </p>
                <p className="card-text font-bold">Price: {product.price}$</p>
                <p className="card-text font-bold">ID: {product.id}</p>
                <div className="flex justify-center items-center gap-8">
                  <button
                    onClick={() => handleRemoveItem(product)}
                    className="btn mr-8 btn-error hover:bg-white btn-outline"
                  >
                    Remove From Cart
                  </button>
                  <button
                    onClick={() => handleConfirmOrder(product)}
                    className="btn  btn-success hover:bg-white btn-outline"
                  >
                    Confirm order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {products.length >= 1 && (
          <button className="btn  btn-primary text-white my-8 w-[200px]">
            Pay
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
