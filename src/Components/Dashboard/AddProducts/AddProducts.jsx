import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AddProducts = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [photo, setPhoto] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleAddProducts = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const price = form.price.value;
    const id = form.id.value;
    const products = { name, description, photo, price, id };
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      fetch(
        "https://api.imgbb.com/1/upload?key=86cd744cfdd1e1e0945188b63adb8883",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setPhoto(data.data.display_url);
          console.log(data.data.display_url);
          fetch("https://repliqq.vercel.app/products", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(products),
          });
          toast.success("Products Added");
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };
  return (
    <div>
      <Toaster />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h2 className="text-center text-xl font-bold">Add New Product</h2>
            <form className="card-body" onSubmit={handleAddProducts}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">ID</span>
                </label>
                <input
                  type="number"
                  placeholder="ID"
                  name="id"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Price</span>
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  name="price"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Photo</span>
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Description</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Description"
                  className="textarea textarea-bordered"
                  name="description"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
