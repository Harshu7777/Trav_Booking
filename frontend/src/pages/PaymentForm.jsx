import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CreateBooking from './CreateBooking';

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe or Elements not loaded");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
    } else {
      console.log('Token:', token);
      // Send the token to your backend for processing
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CreateBooking/>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}

export default PaymentForm;
