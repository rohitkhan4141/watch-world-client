import React from "react";

const AdvertiseWatches = ({ advertises }) => {
  console.log(advertises);
  return (
    <div className='mb-24 w-2/3 mx-auto'>
      <h2 className='text-4xl text-center font-semibold mb-14'>Advertise</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-self-center self-center justify-items-center'>
        {advertises.map((advertise) => (
          <div key={advertise._id} className='card w-96 bg-base-100 shadow-xl'>
            <figure className='px-10 pt-10'>
              <img
                src={advertise?.picture}
                alt='Shoes'
                className='rounded-xl'
              />
            </figure>
            <div className='card-body items-center text-center'>
              <h2 className='card-title'>{advertise?.name}</h2>
              <p>Price : ${advertise?.resalePrice}</p>
              <div className='card-actions'>
                <button className='btn btn-accent btn-sm mt-3'>
                  Login To Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvertiseWatches;
