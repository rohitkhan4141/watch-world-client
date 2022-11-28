import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

const Login = () => {
  const { login, googleAuth, setLoading } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (data) => {
    setError("");
    login(data.email, data.password)
      .then((userCredential) => {
        if (userCredential.user) {
          toast.success("login Successfully");
          getUserToken(data.email);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const saveUser = (name, email, role) => {
    const user = {
      name,
      email,
      role,
    };
    fetch("https://watch-world-server.vercel.app/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("successfully Login ");
          getUserToken(email);
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const googleLogIn = () => {
    setError("");
    googleAuth()
      .then((user) => {
        if (user?.user?.uid) {
          saveUser(user?.user?.displayName, user?.user?.email, "buyer");
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const getUserToken = (email) => {
    fetch(`https://watch-world-server.vercel.app/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem("token", data.accessToken);
          navigate(from, { replace: true });
        }
      });
  };

  return (
    <div className='w-full px-3'>
      <h1 className='text-4xl text-center font-bold mt-16 mb-8'>Login</h1>
      <div className='w-full lg:w-1/3 mx-auto p-x-5'>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              {...register("email", { required: true })}
              type='email'
              placeholder='email'
              className='input input-bordered w-full text-gray input-accent'
            />
            {errors.email && (
              <span className='text-red-400 my-2'>
                This field cant be empty
              </span>
            )}
          </div>
          <div className='form-control w-full mb-3'>
            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input
              {...register("password", {
                required: "Password is Required",
                minLength: {
                  value: 6,
                  message: "password should be min 6 charecters long",
                },
              })}
              type='password'
              placeholder='password'
              className='input input-bordered w-full input-accent'
            />
            {errors.password && (
              <span className='text-red-400 my-2'>
                {errors.password?.message}
              </span>
            )}
          </div>
          <Link
            className='label-text-alt link link-hover text-rose-400 text-base'
            to='/register'
          >
            Haven't an account? Register
          </Link>
          <input type='submit' className='btn btn-accent w-full mt-5' />
        </form>
      </div>
      <p className='text-center text-rose-700 my-1'>{error}</p>
      <div className='w-full lg:w-1/3 mx-auto'>
        <div className='divider'>OR</div>
        <div className=''>
          <button
            onClick={googleLogIn}
            className='btn btn-outline btn-accent w-full my-4'
          >
            Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
