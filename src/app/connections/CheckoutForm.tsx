// src/components/CheckoutForm.tsx
'use client';

import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);

    const cardElement = elements!.getElement(CardElement);

    if (!stripe || !elements || !cardElement) {
      setError('Stripe.js has not loaded yet.');
      setProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setProcessing(false);
      return;
    }

    // Call your backend to create the PaymentIntent
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
    });

    const paymentIntent = await response.json();

    const confirmCardPayment = await stripe.confirmCardPayment(paymentIntent.client_secret, {
      payment_method: paymentMethod.id,
    });

    if (confirmCardPayment.error) {
      setProcessing(false);
      return;
    }

    setSucceeded(true);
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || processing || succeeded}>
        {processing ? 'Processing...' : 'Pay'}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default CheckoutForm;
