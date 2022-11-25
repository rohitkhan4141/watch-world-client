import { useQuery } from "@tanstack/react-query";
import React from "react";

const AllSellers = () => {
  const { data: sellers = [] } = useQuery({
    queryKey: ["allsellers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/allsellers");
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller, i) => (
            <tr key={seller._id}>
              <th>{i + 1}</th>
              <td>{seller?.name}</td>
              <td>{seller?.email}</td>
              <td>
                <button className='btn btn-primary btn-sm mx-2'>Varify</button>
                <button className='btn btn-accent btn-sm'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllSellers;
