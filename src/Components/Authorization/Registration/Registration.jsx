import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../AuthProvider";
import Navbar from "../../Navbar/Navbar";
import axios from "axios";
import toast from "react-hot-toast";

const Registration = () => {
  const [isShow, setIsShow] = useState(false);
  const handlePasswordShow = () => {
    setIsShow(!isShow);
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const { registerWIthEmailAndPassword, updateProfilePic, googleLogin } =
    useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const MySwal = withReactContent(Swal);

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
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const onSubmit = (data, e) => {
    const form = e.target;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setErrorMessage("Password Did Not Match");
      return;
    }

    registerWIthEmailAndPassword(data.email, data.password)
      .then(async (result) => {
        console.log("result", result);

        const datas = {
          email: result?.user?.email,
          name: data.name,
          passwordHash: result?.reloadUserInfo?.passwordHash,
          id: result?.uid,
          loginInfo: result?.metadata,
          photo: selectedFile,
        };

        if (selectedFile) {
          const formData = new FormData();
          formData.append("image", selectedFile);

          fetch(
            "https://api.imgbb.com/1/upload?key=dd64d51858c9a470da2a08da1802fbe2",
            {
              method: "POST",
              body: formData,
            }
          )
            .then((res) => res.json())
            .then(async (data) => {
              setPhoto(data.data.display_url);
              console.log(data.data.display_url);

              await fetch("https://repliqq.vercel.app/makeUser", {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify(datas),
              })
                .then((res) => {
                  if (res.statusText === "ok") {
                    MySwal.fire(
                      "Good job!",
                      "You Account Is Created!",
                      "success"
                    );
                  }
                })
                .then((data) => {
                  console.log(data);
                })
                .catch((err) => {
                  console.log(err);
                });

              reset();
              navigate("/");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        // Handle registration error here
      });
  };

  return (
    <div>
      <Navbar />
      <div className="auth">
        <h1 className="text-5xl font-bold text-center">Sign Up now!</h1>
        {/*  */}
        <form onSubmit={handleSubmit(onSubmit)} className="hero min-h-screen">
          <div className="text-center lg:text-left">
            <img
              src="assests/sign-up-concept-illustration/6368592.jpg"
              alt=""
            />
          </div>
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Photo</span>
                  </label>
                  {errors.photo && (
                    <span className="text-red-600">Photo is required</span>
                  )}
                  <input
                    type="file"
                    placeholder="Your Photo"
                    className="input input-bordered"
                    required
                    onChange={handleFileChange}
                    name="photo"
                    {...register("photo", { required: true })}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Name</span>
                  </label>
                  {errors.name && (
                    <span className="text-red-600">Name is required</span>
                  )}
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="input input-bordered"
                    required
                    name="name"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Email</span>
                  </label>
                  {errors.email && (
                    <span className="text-red-600">Email is required</span>
                  )}
                  <input
                    type="text"
                    placeholder="Your Email"
                    className="input input-bordered"
                    required
                    name="email"
                    {...register("email", { required: true })}
                  />
                </div>
                {/* <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Photo</span>
                  </label>
                  {errors.photo && (
                    <span className="text-red-600">Photo is required</span>
                  )}
                  <input
                    type="text"
                    placeholder="Your Photo"
                    className="input input-bordered"
                    required
                    {...register("photo", { required: true })}
                  />
                </div> */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Password</span>
                  </label>
                  {errors.password && (
                    <span className="text-red-600">
                      1.Password Must Have 8 Characters long & Not exceed 20
                      Character
                      <br /> 2.One Uppercase & One Lowercase letter Required{" "}
                      <br /> 3.Must Have One Special Character <br /> 4.Must be
                      Includes Number{" "}
                    </span>
                  )}
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered"
                    name="password"
                    required
                    {...register("password", {
                      required: true,
                      maxLength: 20,
                      minLength: 8,
                      pattern:
                        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].)/i,
                    })}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">
                      Confirm Password
                    </span>
                  </label>

                  <span className="text-red-600">{errorMessage}</span>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="input input-bordered"
                    name="confirmPassword"
                    required
                    {...register("confirmPassword", {
                      required: true,
                    })}
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Sign Up</button>
                </div>
                <div className="divider">OR</div>
                <button onClick={handleGoogleLogin}>
                  <FaGoogle className="text-6xl text-center mx-auto hover:text-[#F4B400]" />
                </button>
                <div className="form-control mt-6">
                  <Link to="/login">
                    {" "}
                    Already Have an Account Please
                    <a className="underline font-bold text-xl"> Login</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
