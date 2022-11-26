// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import React, { useEffect, useState } from "react";
// import Loading from "../../../components/Loading/Loading";

// const CheckOutForm = () => {
//   const [cardError, setCardError] = useState("");
//   const [clientSecret, setClientSecret] = useState("");
//   const [loading, setLoading] = useState(true);
//   const price = 50;
//   useEffect(() => {
//     fetch("http://localhost:5000/create-payment-intent", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify({ price: price }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setClientSecret(data.clientSecret);
//         setLoading(false);
//       });
//   }, [price]);

//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log("ekane ashtese");
//     if (!stripe || !elements) {
//       return;
//     }
//     const card = elements.getElement(CardElement);

//     if (card == null) {
//       return;
//     }
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });

//     if (error) {
//       console.log("[error]", error);
//       setCardError(error.message);
//     } else {
//       console.log("[PaymentMethod]", paymentMethod);
//       setCardError("");
//     }

//     const { paymentIntent, error: confirmError } =
//       await stripe.confirmCardSetup(clientSecret, {
//         payment_method: {
//           card: card,
//           billing_details: {
//             name: "Jenny Rosen",
//           },
//         },
//       });

//     if (confirmError) {
//       setCardError(confirmError.message);
//       console.log(confirmError.message);
//       return;
//     }
//     console.log(paymentIntent);
//   };

//   if (loading) {
//     return <Loading />;
//   }
//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement
//         options={{
//           style: {
//             base: {
//               fontSize: "16px",
//               color: "#424770",
//               "::placeholder": {
//                 color: "#aab7c4",
//               },
//             },
//             invalid: {
//               color: "#9e2146",
//             },
//           },
//         }}
//       />
//       <button type='submit' disabled={!stripe || clientSecret}>
//         Pay
//       </button>
//     </form>
//   );
// };

// export default CheckOutForm;

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ appointment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  // const { _id, price, patient, patientName } = appointment;

  const price = 50;

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || "");
    setSuccess("");
    setProcessing(true);
    // confirm card payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: "rohit",
          },
        },
      });

    if (intentError) {
      console(intentError?.message);
      return;
    }

    console.log(paymentIntent);

    // if (intentError) {
    //     setCardError(intentError?.message);
    //     setProcessing(false);
    // }
    // else {
    //     setCardError('');
    //     setTransactionId(paymentIntent.id);
    //     console.log(paymentIntent);
    //     setSuccess('Congrats! Your payment is completed.')

    //     //store payment on database
    //     const payment = {
    //         appointment: _id,
    //         transactionId: paymentIntent.id
    //     }
    //     fetch(`https://secret-dusk-46242.herokuapp.com/booking/${_id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'content-type': 'application/json',
    //             'authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //         },
    //         body: JSON.stringify(payment)
    //     }).then(res=>res.json())
    //     .then(data => {
    //         setProcessing(false);
    //         console.log(data);
    //     })

    // }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className='btn btn-success btn-sm mt-4'
          type='submit'
          disabled={!stripe || !clientSecret || success}
        >
          Pay
        </button>
      </form>
      {/* {
                cardError && <p className='text-red-500'>{cardError}</p>
            }
            {
                success && <div className='text-green-500'>
                    <p>{success}  </p>
                    <p>Your transaction Id: <span className="text-orange-500 font-bold">{transactionId}</span> </p>
                </div>
            } */}
    </>
  );
};

export default CheckoutForm;
