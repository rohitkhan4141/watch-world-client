import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import useToken from "../../Hooks/useToken";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);

  if (token) {
    navigate(from, { replace: true });
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onFormSubmit = (data) => {
    login(data.email, data.password).then((userCredential) => {
      if (userCredential.user) {
        toast.success("login Successfully");
        setLoginUserEmail(data.email);
      }
    });
  };
  return (
    <>
      <h1 className='text-4xl text-center font-bold mt-16 mb-8'>Login</h1>
      <div className='flex justify-center items-center'>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className='w-full lg:w-1/3 mx-auto'
        >
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
              className='input input-bordered w-full'
            />
            {errors.password && (
              <span className='text-red-400 my-2'>
                {errors.password?.message}
              </span>
            )}
          </div>
          <span className='text-rose-400 '>
            Haven't an account?
            <Link
              className='mx-3 label-text-alt link link-hover text-rose-400 text-lg'
              to='/register'
            >
              Register
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

export default Login;
