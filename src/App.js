import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { PrivateRoute, LoadingScreen } from 'components/Atoms';
import { PrivateLayout } from 'components/Templates';
import renderRoutes from 'routers/render';

import messages from 'translations';

function App() {
  const language = 'en';

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Switch>
            {renderRoutes()}

            <Route path="/">
              <PrivateLayout />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </IntlProvider>
  );
}

export default App;
