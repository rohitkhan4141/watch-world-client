import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const { data: orders = [] } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/mybookings?email=${user.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className='overflow-x-auto w-full'>
      <table className='table w-full'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Watch Name</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order?._id}>
              <td>
                <div className='flex items-center space-x-3'>
                  <div className='avatar'>
                    <div className='mask mask-square w-28 h-28'>
                      <img
                        src={order?.watchPicture}
                        alt='Avatar Tailwind CSS Component'
                        className='rounded-lg'
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>{order?.watchName}</td>
              <td>{`$ ${order?.price}`}</td>
              <th>
                <button className='btn btn-primary btn-xs'>pay</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
