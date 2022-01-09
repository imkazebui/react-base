import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { LoadingScreen } from 'components/Atoms';
import renderRoutes from 'routers';
import { QueryClientProvider } from 'react-query';

import queryClient from 'utilities/queryClient';

import messages from 'translations';

const App = () => {
  const language = 'en';
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <IntlProvider locale={language} messages={messages[language]}>
          <Router>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                {renderRoutes()}
                {renderRoutes('other-private')}
                {/* <Routes path="/">
                  <PrivateLayout />
                </Routes> */}
              </Routes>
            </Suspense>
          </Router>
        </IntlProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
