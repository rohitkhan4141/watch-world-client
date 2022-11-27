import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/mybookings?email=${user.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className='overflow-x-auto w-full'>
      <table className='table w-full'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Watch Name</th>
            <th>Price</th>
            <th>Status</th>
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
                {orders[0]?.transactionId != "" ? (
                  <span>Paid</span>
                ) : (
                  <Link
                    to={`/dashboard/buyer/payment/${order._id}`}
                    className='btn btn-primary btn-xs'
                  >
                    pay
                  </Link>
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
