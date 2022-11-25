import { useQuery } from "@tanstack/react-query";
import React from "react";

const AllBuyers = () => {
  const { data: buyers = [] } = useQuery({
    queryKey: ["allbuyers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/allbuyers");
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
          {buyers.map((buyer, i) => (
            <tr key={buyer._id}>
              <th>{i + 1}</th>
              <td>{buyer?.name}</td>
              <td>{buyer?.email}</td>
              <td>
                <button className='btn btn-accent btn-sm'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBuyers;
