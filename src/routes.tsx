import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Import the route object for lazy loading routes
const UserList: React.FC = lazy(() => import("@/pages/Users/UsersList"));
const Dashboard: React.FC = lazy(() => import("@/pages/Dashboard/Dashboard"));
const GeneralSettings: React.FC = lazy(
  () => import("@/pages/Settings/GeneralSettings")
);
const Home: React.FC = lazy(() => import("@/pages/Home/Home"));
const About: React.FC = lazy(() => import("@/pages/About"));

// Define routes
const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/users", element: <UserList /> },
  { path: "/settings", element: <GeneralSettings /> },
  { path: "/about", element: <About /> },
];

export default routes;
