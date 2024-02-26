import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("https://repliqq.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  const handleMakeAdmin = (user) => {
    fetch(`https://repliqq.vercel.app/users/admin/${user._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success(`${user.name} Is Admin Now`);
        }
      });
  };
  return (
    <div>
      <Toaster />
      <div>
        {
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {users.map((user, index) => {
                  return (
                    <tr key={user._id}>
                      <th>{index + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          disabled={user.role === "admin"}
                          className="btn btn-primary"
                        >
                          Make Admin
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
};

export default Users;
