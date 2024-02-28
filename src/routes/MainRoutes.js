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
const History = Loadable(lazy(() => import("../views/History")));
const Settings = Loadable(lazy(() => import("../views/Settings")));
const Support = Loadable(lazy(() => import("../views/Support")));
const Database = Loadable(lazy(() => import("../views/Database")));

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
      path: "history",
      element: <History />,
    },
    {
      path: "settings",
      element: <Settings />,
    },
    {
      path: "database",
      element: <Database />,
    },
    {
      path: "support",
      element: <Support />,
    },
  ],
};

export default MainRoutes;
