import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../../components/Loading/Loading";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import DeleteModal from "../DeleteModal/DeleteModal";

const MyProducts = () => {
  const [deleteItem, setDeleteItem] = useState(null);
  const { user } = useContext(AuthContext);
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/products?email=${user?.email}`,
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

  const deleteHandler = (product) => {
    fetch(`http://localhost:5000/products/${product._id}`, {
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

  const advertiseHandler = (product) => {
    fetch(`http://localhost:5000/products/${product._id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          advertiseProducts(product);
        }
      })
      .catch((err) => console.log(err));
  };

  const advertiseProducts = (product) => {
    console.log(product);
    fetch(`http://localhost:5000/products/advertise`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.acknowledged);
        if (data.acknowledged) {
          toast.success("successfully avertised");
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };

  console.log(products);
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product?._id}>
              <td>
                <div className='flex items-center space-x-3'>
                  <div className='avatar'>
                    <div className='mask mask-square w-28 h-28'>
                      <img
                        src={product?.picture}
                        alt='Avatar Tailwind CSS Component'
                        className='rounded-lg'
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>{product?.name}</td>
              <td>{`$ ${product?.resalePrice}`}</td>
              <th>
                {product?.transactionId ? (
                  <span>Sold</span>
                ) : (
                  <span>Available</span>
                )}
              </th>
              <td>
                <button
                  disabled={product?.advertise || product?.transactionId}
                  onClick={() => advertiseHandler(product)}
                  className='btn btn-primary btn-sm mx-2'
                >
                  Advertise
                </button>
                <label
                  onClick={() => setDeleteItem(product)}
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

export default MyProducts;
