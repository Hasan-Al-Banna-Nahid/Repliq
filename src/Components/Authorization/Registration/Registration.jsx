import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../AuthProvider";
import Navbar from "../../Navbar/Navbar";

const Registration = () => {
  const [isShow, setIsShow] = useState(false);
  const handlePasswordShow = () => {
    setIsShow(!isShow);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const { registerWIthEmailAndPassword, updateUser, googleLogin } =
    useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const MySwal = withReactContent(Swal);

  const handleGoogleLogin = () => {
    googleLogin().then((result) => {
      fetch(
        "https://repliq-h4nhqhae5-iamnahid591998-gmailcom.vercel.app/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
          }),
        }
      );
    });
    navigate(from, { replace: true });
  };

  const onSubmit = (data, e) => {
    const form = e.target;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if (password !== confirmPassword) {
      setErrorMessage("Password Did Not Match");
      return;
    }

    registerWIthEmailAndPassword(data.email, data.password).then((result) => {
      console.log(result.user);
      updateUser(data.name, data.photo);
      MySwal.fire("Good job!", "You Account Is Created!", "success");
      reset();
      navigate("/login");
      fetch(
        "https://repliq-h4nhqhae5-iamnahid591998-gmailcom.vercel.app/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: data.name, email: data.email }),
        }
      );
    });
  };
  return (
    <div>
      <Navbar />
      <div className="auth">
        <h1 className="text-5xl font-bold text-center">Sign Up now!</h1>
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
