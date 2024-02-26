import React, { useEffect, useState } from "react";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://repliqq.vercel.app/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div>
      <div className="grid grid-cols-2 mx-auto">
        {products.map((product) => {
          return (
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <img src={product.photo} width={200} height={200} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Update</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
