import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

const BookingModal = ({ bookingWatches, setBookingWatches }) => {
  const { user } = useContext(AuthContext);
  const submitBooking = (event) => {
    event.preventDefault();
    const from = event.target;
    const myName = from.name.value;
    const watchName = bookingWatches?.name;
    const watchPicture = bookingWatches?.picture;
    const email = from.email.value;
    const price = from.price.value;
    const phone = from.phone.value;
    const location = from.location.value;
    const booking = {
      myName,
      watchName,
      email,
      phone,
      price,
      location,
      watchPicture,
    };

    fetch("http://localhost:5000/mybookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setBookingWatches(null);
          toast.success("Watches added successfully");
        } else {
          setBookingWatches(null);
          toast.error(data.message);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <input type='checkbox' id='booking-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box relative'>
          <label
            htmlFor='booking-modal'
            className='btn btn-sm btn-circle absolute right-2 top-2'
          >
            ✕
          </label>
          <form onSubmit={submitBooking} className='grid gap-y-4 p-5'>
            <h2 className='text-2xl'>{bookingWatches?.name}</h2>
            <input
              type='text'
              name='name'
              defaultValue={user?.displayName}
              disabled
              className='input input-bordered input-accent w-full'
            />
            <input
              type='email'
              name='email'
              defaultValue={user?.email}
              disabled
              className='input input-bordered input-accent w-full'
            />
            <label className='ml-3 -m-1'>Price</label>
            <input
              type='number'
              name='price'
              defaultValue={bookingWatches?.resalePrice}
              disabled
              className='input input-bordered input-accent w-full'
            />
            <input
              type='number'
              name='phone'
              placeholder='Phone Number'
              className='input input-bordered input-accent w-full'
              required
            />
            <input
              type='text'
              name='location'
              placeholder='Location'
              className='input input-bordered input-accent w-full'
              required
            />
            <input
              type='submit'
              value='submit'
              className='cursor-pointer input input-bordered input-accent w-full bg-accent text-white'
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
