import React, { useContext, useState } from "react";
// import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";

import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { AuthContext } from "../AuthProvider";
import Navbar from "../../Navbar/Navbar";
import axios from "axios";

const Login = () => {
  const [isShow, setIsShow] = useState(false);
  const handlePasswordShow = () => {
    setIsShow(!isShow);
  };
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const { accessLogin, googleLogin } = useContext(AuthContext);
  const handleGoogleLogin = () => {
    googleLogin().then((result) => {
      fetch("https://repliqq.vercel.app/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
        }),
      });
    });
    navigate(from, { replace: true });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    accessLogin(email, password)
      .then((result) => {
        console.log(result.user);
        Swal.fire("Good job!", "Login Success!", "success");
        navigate(from, { replace: true });
      })
      .then(async (data) => {
        // const userInfo = localStorage.getItem("userInfo");
        // await axios.post("https://repliqq.vercel.app/makeUser", {
        //   userInfo: userInfo,
        // });
      })

      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email & Password Did not Match",
        });
        return;
      });
  };
  // const sendUserInfoToDb = () => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   axios.post("https://repliqq.vercel.app/userPost", {
  //     userInfo: userInfo,
  //   });
  // };
  return (
    <div>
      <Navbar />
      <div className="auth mx-auto">
        <h1 className="text-5xl font-bold text-center">Login now!</h1>
        <div className="hero min-h-screen ">
          <div className="text-center bg-transparent lg:text-left">
            <img
              className="w-1/2"
              src="assests/forms-concept-illustration/4967621.jpg"
              alt=""
            />
          </div>
          <div className="hero-content flex-col lg:flex-row-reverse">
            <form
              onSubmit={handleLogin}
              // onClick={sendUserInfoToDb}
              className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
            >
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your Email"
                    className="input input-bordered"
                    name="email"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Password</span>
                  </label>
                  <input
                    type={isShow ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered"
                    name="password"
                    required
                  />
                  <button type="button" onClick={handlePasswordShow}>
                    {isShow ? (
                      <FaToggleOn className="text-2xl" />
                    ) : (
                      <FaToggleOff className="text-2xl" />
                    )}
                  </button>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
                <div className="divider">OR</div>
                <button onClick={handleGoogleLogin}>
                  <FaGoogle className="text-6xl text-slate-900 text-center mx-auto hover:text-[#F4B400]" />
                </button>
                <div className="form-control mt-6">
                  <Link to="/signUp">
                    {" "}
                    New To Repliq Please
                    <a className="underline font-bold text-xl"> Sign Up</a>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
