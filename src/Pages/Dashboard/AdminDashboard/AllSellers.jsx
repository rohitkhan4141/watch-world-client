import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../../components/Loading/Loading";
import DeleteModal from "../DeleteModal/DeleteModal";

const AllSellers = () => {
  const [deleteItem, setDeleteItem] = useState(null);
  const {
    data: sellers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allsellers"],
    queryFn: async () => {
      const res = await fetch(
        "https://watch-world-server.vercel.app/allsellers",
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

  const cancleDelete = () => {
    setDeleteItem(null);
  };

  const deleteHandler = (seller) => {
    fetch(`https://watch-world-server.vercel.app/users/${seller._id}`, {
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

  const verifyHandler = (user) => {
    fetch(
      `https://watch-world-server-rohitkhan4141.vercel.app/users/${user._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(user),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("verified Successfully");
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className='overflow-x-auto'>
      <h2 className='text-4xl font-bold my-10'>All Sellers</h2>
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
          {sellers.map((user, i) => (
            <tr key={user._id}>
              <th>{i + 1}</th>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>
                <button
                  disabled={user?.isSellerVerified ? true : false}
                  onClick={() => verifyHandler(user)}
                  className='btn btn-primary btn-sm mx-2'
                >
                  Varify
                </button>
                <label
                  onClick={() => setDeleteItem(user)}
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
      {deleteItem && (
        <DeleteModal
          deleteItem={deleteItem}
          cancleDelete={cancleDelete}
          deleteHandler={deleteHandler}
        />
      )}
    </div>
  );
};

export default AllSellers;
