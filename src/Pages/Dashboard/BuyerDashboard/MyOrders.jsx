import { useQuery } from "@tanstack/react-query";
import React from "react";

const MyOrders = () => {
  const { data: orders = [] } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/myOrders");
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className='overflow-x-auto w-full'>
      <table className='table w-full'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order?._id}>
              <td>
                <div className='flex items-center space-x-3'>
                  <div className='avatar'>
                    <div className='mask mask-squircle w-12 h-12'>
                      <img
                        src={order?.watchPicture}
                        alt='Avatar Tailwind CSS Component'
                      />
                    </div>
                  </div>
                  {/* <div>
                      <div className='font-bold'>Hart Hagerty</div>
                      <div className='text-sm opacity-50'>United States</div>
                    </div> */}
                </div>
              </td>
              <td>{order?.watchName}</td>
              <td>{`$ ${order?.price}`}</td>
              <th>
                <button className='btn btn-ghost btn-xs'>details</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
