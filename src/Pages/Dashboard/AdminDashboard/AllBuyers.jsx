import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../../components/Loading/Loading";
import DeleteModal from "../DeleteModal/DeleteModal";

const AllBuyers = () => {
  const [deleteBuyer, setDeleteBuyer] = useState(null);
  const {
    data: buyers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allbuyers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/allbuyers", {
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const cancleDelete = () => {
    setDeleteBuyer(null);
  };

  const deleteHandler = (buyer) => {
    fetch(`http://localhost:5000/users/${buyer._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("successfully deleted");
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };

  if (isLoading) {
    return <Loading />;
  }
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
          {buyers.map((user, i) => (
            <tr key={user._id}>
              <th>{i + 1}</th>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>
                <label
                  onClick={() => setDeleteBuyer(user)}
                  htmlFor='delete-modal'
                  className='btn btn-accent btn-sm'
                >
                  Delete
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deleteBuyer && (
        <DeleteModal
          deleteUser={deleteBuyer}
          cancleDelete={cancleDelete}
          deleteHandler={deleteHandler}
        />
      )}
    </div>
  );
};

export default AllBuyers;
