'use client';

import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../../../utils/supabase/stripe';
import CheckoutForm from '../connections/CheckoutForm'
import Layout from '../components/Layout';

const Checkout: React.FC = () => (
  <Layout>
    <h1 className="text-2xl font-bold text-center my-8">Checkout</h1>
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  </Layout>
);

export default Checkout;