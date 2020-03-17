import * as routePath from "../route-path";
import * as routeName from "../route-name";
import OtherPage from "components/Pages/OtherPage";

const routes = [
  {
    path: routePath.OTHER_PAGE,
    component: OtherPage,
    exact: true,
    name: routeName.OTHER_PAGE
  }
];

export default routes;
