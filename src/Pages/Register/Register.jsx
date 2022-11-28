import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

const Register = () => {
  const { createUser, setLoading, updateUser, googleAuth } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // form submit handler
  const onFormSubmit = (data) => {
    setError("");
    createUser(data.email, data.password)
      .then(() => {
        updateUser({ displayName: data.name })
          .then(() => {
            setLoading(false);
            saveUser(data?.name, data?.email, data?.role);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  // save user to our database
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
          toast.success("successfully created a user");
          getUserToken(email);
          // setCreatedUserEmail(email);
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
        saveUser(user?.user?.displayName, user?.user?.email, "buyer");
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
          navigate("/");
        }
      });
  };

  return (
    <div className='px-3'>
      <h1 className='text-4xl text-center font-bold mt-16 mb-8'>Register</h1>
      <div className='flex justify-center items-center'>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className='w-full lg:w-1/3 mx-auto'
        >
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Name</span>
            </label>
            <input
              {...register("name", { required: true })}
              type='text'
              placeholder='name'
              className='input input-bordered w-full input-accent'
            />
            {errors.name && (
              <span className='text-red-400 my-2'>
                This field cant be empty
              </span>
            )}
          </div>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              {...register("email", { required: true })}
              type='email'
              placeholder='email'
              className='input input-bordered input-accent w-full text-gray'
            />
            {errors.email && (
              <span className='text-red-400 my-2'>
                This field cant be empty
              </span>
            )}
          </div>
          <div className='form-control w-full'>
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
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Select Role</span>
            </label>
            <select
              className='select select-accent mb-2'
              {...register("role", { required: true })}
            >
              <option defaultValue='buyer' value='buyer'>
                Buyer
              </option>
              <option value='seller'>Seller</option>
            </select>
            {errors.role && (
              <span className='text-red-400 my-2'>{errors.role?.message}</span>
            )}
          </div>
          <Link
            className='label-text-alt link link-hover text-rose-400 text-base'
            to='/Login'
          >
            Have an account? Login
          </Link>
          <input
            type='submit'
            value='Register'
            className='btn btn-accent w-full mt-5'
          />
        </form>
      </div>
      <p className='text-center text-red-800'>{error}</p>
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

export default Register;
