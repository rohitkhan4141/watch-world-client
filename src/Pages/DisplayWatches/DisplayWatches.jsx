import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import BookingModal from "../../components/BookingModal/BookingModal";
import DisplayWatch from "./DisplayWatch";

const DisplayWatches = () => {
  const watches = useLoaderData();
  const [bookingWatches, setBookingWatches] = useState(null);
  return (
    <div className='px-4 lg:px-10'>
      <h2 className='text-4xl text-center font-bold my-10'>
        {watches[0].categorieName}
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 pt-5 pb-20'>
        {watches.map((watch) => (
          <DisplayWatch
            key={watch._id}
            watch={watch}
            setBookingWatches={setBookingWatches}
          />
        ))}
      </div>
      {bookingWatches && (
        <BookingModal
          bookingWatches={bookingWatches}
          setBookingWatches={setBookingWatches}
        />
      )}
    </div>
  );
};

export default DisplayWatches;
