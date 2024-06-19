'use client';

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Subscription: React.FC = () => {
  const handleSubscribe = async (priceId: string) => {
    const stripe = await stripePromise;

    if (!stripe) {
      console.error('Stripe has not loaded yet.');
      return;
    }

    // Call your backend to create the Checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });

    if (response.status !== 200) {
      console.error('Failed to create checkout session');
      return;
    }

    const session = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h1>
      <div className="grid grid-cols-3 gap-4">
        {[
          { id: 'price_1', name: 'Basic', price: '10$', features: ['Improved productivity', 'Enhanced performance', 'Cost savings', 'Improved communication', 'Enhanced collaboration'] },
          { id: 'price_2', name: 'Essential', price: '10$', features: ['Improved productivity', 'Enhanced performance', 'Cost savings', 'Improved communication', 'Enhanced collaboration'] },
          { id: 'price_3', name: 'Advanced', price: '10$', features: ['Improved productivity', 'Enhanced performance', 'Cost savings', 'Improved communication', 'Enhanced collaboration'] }
        ].map((plan) => (
          <div key={plan.id} className="border p-4 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-4">{plan.name}</h2>
            <p className="text-2xl font-bold mb-4">{plan.price}</p>
            <ul className="mb-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="mb-2">
                  <i className="fas fa-check-circle text-green-500"></i> {feature}
                </li>
              ))}
            </ul>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => handleSubscribe(plan.id)}
            >
              Subscribe to this Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
