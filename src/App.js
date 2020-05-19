import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { PrivateRoute, LoadingScreen } from "components/Atoms";
import { PrivateLayout } from "components/Templates";
import renderRoutes from "routers/render";
import * as routeName from "routers/route-name";

import messages_vi from "translations/vi.json";
import messages_en from "translations/en.json";

const messages = {
  vi: messages_vi,
  en: messages_en,
};

const languageBrowser = navigator.language.split(/[-_]/)[0];
const languageLocal = localStorage.getItem("language");

function App() {
  const [language, setLanguage] = useState(languageLocal || languageBrowser);

  // const language = languageLocal || languageBrowser;

  useEffect(() => {
    localStorage.setItem("language", "vi");
    setTimeout(() => setLanguage("vi"), 10000);
  }, []);

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Switch>
            {renderRoutes()}
            <PrivateRoute path="/" name={routeName.DASHBOARD}>
              <PrivateLayout />
            </PrivateRoute>
          </Switch>
        </Suspense>
      </Router>
    </IntlProvider>
  );
}

export default App;
