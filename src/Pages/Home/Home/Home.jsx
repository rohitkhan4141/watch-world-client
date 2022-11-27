import { useQuery } from "@tanstack/react-query";
import React from "react";
import AdvertiseWatches from "../AdvertiseWatches/AdvertiseWatches";
import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";
import WatchCategories from "../WatchCategories/WatchCategories";

const Home = () => {
  const { data: advertises = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/advertisedproduct");
      const data = await res.json();
      return data;
    },
  });
  return (
    <div>
      <Banner />
      <WatchCategories />
      {advertises.length > 0 && <AdvertiseWatches advertises={advertises} />}
      <ContactUs />
    </div>
  );
};

export default Home;
