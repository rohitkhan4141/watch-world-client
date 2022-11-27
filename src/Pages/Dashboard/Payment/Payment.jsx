import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(
  "pk_test_51M8A9vB7GM64ljvNTV3lYkZDvpP5rHZgHwlmD16VS8C6KunSYEfyf1KQp5SruAGVq8xOWy7JRsThRYpv5YRG2BGu00ZPfko96o"
);

const Payment = () => {
  const [watch, setWatch] = useState([]);
  const [loding, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/watches/${id}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setWatch(data);
        setLoading(false);
      });
  }, []);

  if (loding) {
    return <Loading></Loading>;
  }

  return (
    <div className='w-2/3 mx-auto'>
      <div className='w-full my-20 border rounded-lg shadow-md p-20 '>
        <Elements stripe={stripePromise}>
          <CheckOutForm watch={watch} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
