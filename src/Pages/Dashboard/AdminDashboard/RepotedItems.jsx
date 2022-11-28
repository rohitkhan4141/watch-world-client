import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../../components/Loading/Loading";
import DeleteModal from "../DeleteModal/DeleteModal";

const RepotedItems = () => {
  const [deleteItem, setDeleteItem] = useState(null);
  const {
    data: reports = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["report"],
    queryFn: async () => {
      const res = await fetch("https://watch-world-server.vercel.app/report", {
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const cancleDelete = () => {
    setDeleteItem(null);
  };

  const deleteHandler = (report) => {
    console.log(report);
    fetch(`https://watch-world-server.vercel.app/report/${report._id}`, {
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
    <div>
      <div className='overflow-x-auto'>
        <h2 className='text-4xl font-bold my-10'>Reported Items</h2>
        <table className='table w-full'>
          <thead>
            <tr>
              <th></th>
              <th>WatchName</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, i) => (
              <tr key={report._id}>
                <th>{i + 1}</th>
                <td>{report?.name}</td>
                <td>
                  <label
                    onClick={() => setDeleteItem(report)}
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
    </div>
  );
};

export default RepotedItems;
