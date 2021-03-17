import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { PrivateRoute, LoadingScreen } from 'components/Atoms';
import { PrivateLayout } from 'components/Templates';
import renderRoutes from 'routers/render';
import { QueryClientProvider, QueryClient } from 'react-query';

import messages from 'translations';

import { Login } from 'modules/auth';
import { StaffList } from 'modules/staffs';

const queryClient = new QueryClient();

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

                <Route path="/login">
                  <Login />
                </Route>

                <Route path="/staff">
                  <StaffList />
                </Route>

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
