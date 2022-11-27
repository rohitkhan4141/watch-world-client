import React from "react";

const Banner = () => {
  return (
    <div
      className='hero banner-height'
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
      }}
    >
      <div className='hero-overlay bg-opacity-40'></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className='max-w-md'>
          <h1 className='mb-5 text-8xl font-bold text-white leading-tight'>
            We know WATCHES
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
