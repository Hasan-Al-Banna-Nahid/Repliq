import React, { useEffect, useState } from "react";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(new Set());
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch("https://repliqq.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        // Extract unique categories
        const uniqueCategories = new Set(
          data.map((product) => product.category)
        );
        setCategories(uniqueCategories);
      });
  }, []);

  const handleCategoryClick = (category) => {
    // Filter products based on category
    const filtered = products.filter(
      (product) => product.category === category
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <div className="grid grid-cols-2 mx-auto max-w-[1200px] ">
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
                <div className="flex justify-center items-center gap-6">
                  <div>
                    <h2 className="text-xl font-bold text-purple-800">
                      Category
                    </h2>
                    {[...categories].map((category) => (
                      <button
                        key={category}
                        className="btn btn-success my-4 mr-4 ml-4"
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="card w-96 bg-base-100 shadow-xl"
                  >
                    <tr>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={product.photo}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </td>
                      <td>{product.name}</td>
                      <td>
                        <button className="btn btn-ghost btn-xs">
                          {product.description}
                        </button>
                      </td>
                      <td className="flex flex-col justify-center items-center">
                        <button className="btn btn-error btn-xs">delete</button>
                        <button className="btn btn-secondary btn-xs my-4">
                          Update
                        </button>
                      </td>
                    </tr>
                  </div>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center font-bold">
                    Click On Category
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
