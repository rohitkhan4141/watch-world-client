import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(
  "pk_test_51M8A9vB7GM64ljvNTV3lYkZDvpP5rHZgHwlmD16VS8C6KunSYEfyf1KQp5SruAGVq8xOWy7JRsThRYpv5YRG2BGu00ZPfko96o"
);

const Payment = () => {
  return (
    <div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
