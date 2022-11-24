import React from "react";
import "./SingleCategorie.css";

const SIngleCategory = ({ singleCategory }) => {
  return (
    <div className='card card-compact w-96 bg-base-100 shadow-xl'>
      <figure className='card-image'>
        <img src={singleCategory?.picture} alt='Shoes' />
      </figure>
      <div className='card-body'>
        <h2 className='text-center text-xl font-bold'>
          {singleCategory?.categorieName}
        </h2>
        <div className='card-actions justify-center my-2'>
          <button className='btn btn-accent'>Explore</button>
        </div>
      </div>
    </div>
  );
};

export default SIngleCategory;
