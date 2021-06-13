import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { LoadingScreen } from 'components/Atoms';
import { PrivateLayout } from 'components/Templates';
import renderRoutes from 'routers';
import { QueryClientProvider } from 'react-query';

import queryClient from 'utilities/queryClient';

import messages from 'translations';

function App() {
  const language = 'en';

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <IntlProvider locale={language} messages={messages[language]}>
          <Router>
            <Suspense fallback={<LoadingScreen />}>
              <Switch>
                {renderRoutes()}
                {renderRoutes('other-private')}

                <Route path="/">
                  <PrivateLayout />
                </Route>
              </Switch>
            </Suspense>
          </Router>
        </IntlProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
