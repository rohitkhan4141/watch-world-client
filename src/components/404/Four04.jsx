import React from "react";
import { Link } from "react-router-dom";

const Four04 = () => {
  return (
    <div className='flex justify-center items-center my-32 text-center'>
      <div>
        <h2 className='text-5xl text-red-800'>404 Not Found</h2>
        <Link className='btn btn-accent mt-7' to='/'>
          Back To home
        </Link>
      </div>
    </div>
  );
};

export default Four04;
