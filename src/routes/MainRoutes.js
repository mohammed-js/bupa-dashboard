import { lazy } from "react";

// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";

// dashboard routing
const TranslateCertificate = Loadable(
  lazy(() => import("../views/TranslateCertificate"))
);

// sample page routing
const Statistics = Loadable(lazy(() => import("../views/Statistics")));
const Members = Loadable(lazy(() => import("../views/Members")));
const Settings = Loadable(lazy(() => import("../views/Settings")));
const Support = Loadable(lazy(() => import("../views/Support")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Statistics />,
    },
    {
      path: "dashboard",
      element: <Statistics />,
    },
    {
      path: "members",
      element: <Members />,
    },
    {
      path: "translate_certificate",
      element: <TranslateCertificate />,
    },
    {
      path: "settings",
      element: <Settings />,
    },
    {
      path: "support",
      element: <Support />,
    },
  ],
};

export default MainRoutes;
