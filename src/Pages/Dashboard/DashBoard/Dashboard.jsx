import React, { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h2 className='text-5xl text-center my-20'>
        Welcome {user?.displayName}
      </h2>
    </div>
  );
};

export default Dashboard;
