import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import useToken from "../../Hooks/useToken";

const Register = () => {
  const { createUser, setLoading, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);
  if (token) {
    navigate("/");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // form submit handler
  const onFormSubmit = (data) => {
    setError("");
    createUser(data.email, data.password).then(() => {
      // error er kajta pore kortesi
      // setError(err)
      updateUser({ displayName: data.name })
        .then(() => {
          saveUser(data.name, data.email);
        })
        .catch((err) => console.log(err));
    });
  };
  // save user to our database
  const saveUser = (name, email) => {
    const user = {
      name,
      email,
    };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("successfully created a user");
          setCreatedUserEmail(email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
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
              className='input input-bordered w-full'
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
              className='input input-bordered w-full text-gray'
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
              className='input input-bordered w-full'
            />
            {errors.password && (
              <span className='text-red-400 my-2'>
                {errors.password?.message}
              </span>
            )}
          </div>
          <span className='text-rose-400 '>
            Have an account?
            <Link
              className='mx-3 label-text-alt link link-hover text-rose-400 text-lg'
              to='/Login'
            >
              Login
            </Link>
          </span>
          <input type='submit' className='btn btn-accent w-full mt-5' />
        </form>
      </div>
      <div className='w-full lg:w-1/3 mx-auto'>
        <div className='divider'>OR</div>
        <div className=''>
          <button className='btn btn-outline btn-accent w-full my-4'>
            Continue With Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
