import React from 'react';
import { useGetStripePromise } from 'hooks/usePayment';
import { Elements } from '@stripe/react-stripe-js';

const withStripe = (parentProps) => (WrappedComponent) => {
  const WithStripe = (props) => {
    const elFonts = [
      {
        cssSrc:
          'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap',
      },
    ];
    //service
    const { stripePromise } = useGetStripePromise();
    if (!stripePromise) {
      return null;
    }
    return (
      <Elements stripe={stripePromise} options={{ fonts: elFonts }}>
        <WrappedComponent {...props} />
      </Elements>
    );
  };
  return WithStripe;
};

export default withStripe;
