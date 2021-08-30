import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import axios from 'utilities/axios';
import queryClient from 'utilities/queryClient';

const API = {
  PAYMENT: {
    GET_STRIPE_PUBLISH_KEY: 'payments/subscriptions/key',
    PAYMENT_METHOD: 'payment-method',
    DELETE_PAYMENT_METHOD: (id) => `payment-method/${id}`,
    DELETE_PAYMENT_METHOD_ACH: (id) => `payment-method/ach/${id}`,
    PAYMENT_INTENT: 'payments/intents',
    CREATE_ACH: 'payment-method/ach',
    VERIFY_ACH: 'payment-method/ach/verify',
    CHARGE_ACH: 'payments/charge',
    TRANSACTIONS: 'payments/history',
    REQUEST_FUNDS: 'users/request-funds',
  },
};

export const useGetStripePublishKey = () => {
  return useQuery('stripePublishKey', () =>
    axios.get(API.PAYMENT.GET_STRIPE_PUBLISH_KEY).then((res) => res.data)
  );
};

export const useGetStripePromise = () => {
  const [stripePromise, setStripePromise] = useState(undefined);
  const { data: stripePublishKey } = useGetStripePublishKey();

  useEffect(() => {
    if (stripePublishKey) {
      const resp = loadStripe(stripePublishKey);
      setStripePromise(resp);
    }
  }, [stripePublishKey]);

  return { stripePromise };
};

export const useCreatePaymentMethod = () => {
  return useMutation(
    (values) => axios.post(API.PAYMENT.PAYMENT_METHOD, values),
    {
      onError: () => {},
      onSuccess: () => {
        queryClient.invalidateQueries('payment-methods');
      },
    }
  );
};

export const useGetListPaymentMethod = () => {
  return useQuery('payment-methods', () =>
    axios.get(API.PAYMENT.PAYMENT_METHOD).then((res) => res.data)
  );
};

export const useDeletePaymentMethod = () => {
  return useMutation(
    ({ cardId, type }) =>
      axios.delete(
        type === 'AchAccount'
          ? API.PAYMENT.DELETE_PAYMENT_METHOD_ACH(cardId)
          : API.PAYMENT.DELETE_PAYMENT_METHOD(cardId)
      ),
    {
      onSuccess: (_, { onCallback }) => {
        onCallback();
        queryClient.invalidateQueries('payment-methods');
      },
    }
  );
};

export const useGetPaymentIntent = () => {
  return useMutation(
    (values) =>
      axios.post(API.PAYMENT.PAYMENT_INTENT, values).then((res) => res.data),
    {
      onError: () => {},
    }
  );
};

export const useCreateACH = () => {
  return useMutation((values) => axios.post(API.PAYMENT.CREATE_ACH, values), {
    onError: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries('payment-methods');
    },
  });
};

export const useVerifyACH = () => {
  return useMutation((values) => axios.post(API.PAYMENT.VERIFY_ACH, values), {
    onError: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries('payment-methods');
    },
  });
};

export const useChargeACH = () => {
  return useMutation((values) => axios.post(API.PAYMENT.CHARGE_ACH, values));
};

export const useGetTransactions = (filters) => {
  return useQuery(
    ['transactions', filters],
    () =>
      axios
        .get(API.PAYMENT.TRANSACTIONS, { params: filters })
        .then((res) => res.data),
    {
      keepPreviousData: true,
    }
  );
};

export const useRequestFunds = () => {
  return useMutation((values) => axios.post(API.PAYMENT.REQUEST_FUNDS, values));
};
