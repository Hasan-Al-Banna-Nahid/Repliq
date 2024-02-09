import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Banner = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(
      "https://repliq-cbgfolqwz-iamnahid591998-gmailcom.vercel.app/products"
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    // Make a POST request to your server with the product details
    fetch("https://repliq-cbgfolqwz-iamnahid591998-gmailcom.vercel.app/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: product.name,
        photo: product.photo,
        description: product.description,
        price: product.price,
        id: product.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response from the server (if needed)
        console.log(data);
        toast.success("Added To Cart");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error adding product to cart:", error);
      });
  };
  return (
    <div>
      <Toaster />
      <div className="grid grid-cols-3 mx-auto max-w-[1600px]">
        {products.map((product) => {
          return (
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <img src={product.photo} width={200} height={200} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-bold">{product.name}</h2>

                <p className="font-bold">{product.description}</p>
                <p className="font-bold">{product.price} $</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Banner;
