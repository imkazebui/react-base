import * as routePath from "../route-path";
import * as routeName from "../route-name";
import Dashboard from "components/Pages/Dashboard";

const routes = [
  {
    path: routePath.DASHBOARD,
    component: Dashboard,
    exact: true,
    name: routeName.DASHBOARD
  }
];

export default routes;
