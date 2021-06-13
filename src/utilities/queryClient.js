import { QueryClient } from 'react-query';
// import ErrorHandler from './errorHandler';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // onError: (error) => ErrorHandler.showError(error),
      retry: 0,
    },
    mutations: {
      // onError: (error) => ErrorHandler.showError(error),
    },
  },
});

const queryCache = queryClient.getQueryCache();

export { queryCache };

export default queryClient;
