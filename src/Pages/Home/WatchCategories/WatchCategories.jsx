import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import SIngleCategory from "./SIngleCategory";

const WatchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoding, setCategoriesLoding] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then(function (response) {
        setCategories(response.data);
        setCategoriesLoding(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <h2 className='text-4xl text-center font-semibold my-16'>
        Watch's Categories
      </h2>
      <div>
        {categoriesLoding ? (
          <span className='pl-96'>
            <Loading />
          </span>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-self-center self-center justify-items-center'>
            {categories.map((singleCategory) => (
              <SIngleCategory
                key={singleCategory._id}
                singleCategory={singleCategory}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchCategories;
