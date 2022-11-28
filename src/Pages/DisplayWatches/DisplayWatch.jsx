import React from "react";
import { GoReport } from "react-icons/go";
import { TiTick } from "react-icons/ti";
import "./DisplayWatch.css";

const DisplayWatch = ({ watch, setBookingWatches }) => {
  const reportProductHandler = (product) => {};
  return (
    <div className='card card-side bg-base-300 shadow-xl flex flex-col md:flex-row'>
      <figure className='c-img'>
        <img src={watch?.picture} alt='Movie' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{watch?.name}</h2>
        <div className='paragraph-tag'>
          <p>{`Location : ${watch?.location}`}</p>
          <p>{`Original Price :  $${watch?.originalPrice}`}</p>
          <p>{`Resale Price  :  $${watch?.resalePrice}`}</p>
          <p>{`Years Of Use : ${watch?.used} Years`} </p>
          <p>{`Posted In : ${watch?.timeOfPost}`}</p>
          <div className='flex items-center gap-x-2'>
            <span>{`Seller's Name : ${watch?.sellersName}`}</span>
            <span className='bg-blue-400 rounded-lg'>
              {watch?.isSellerVerified ? <TiTick /> : " "}
            </span>
          </div>
        </div>
        <div className='card-actions justify-end items-center'>
          <div className='tooltip' data-tip='Report Product'>
            <button onClick={() => reportProductHandler(watch)}>
              <GoReport className='text-2xl' />
            </button>
          </div>
          <label
            onClick={() => setBookingWatches(watch)}
            htmlFor='booking-modal'
            className='btn btn-accent text-white'
          >
            Book
          </label>
        </div>
      </div>
    </div>
  );
};

export default DisplayWatch;
