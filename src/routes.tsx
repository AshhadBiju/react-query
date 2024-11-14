import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Import the route object for lazy loading routes
const UserList: React.FC = lazy(() => import("@/pages/Users/UsersList"));
const Post: React.FC = lazy(() => import("@/pages/Post/Post"));
const Search: React.FC = lazy(() => import("@/pages/Search/Search"));
const Home: React.FC = lazy(() => import("@/pages/Home/Home"));
const About: React.FC = lazy(() => import("@/pages/About"));

// Define routes
const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/post", element: <Post /> },
  { path: "/users", element: <UserList /> },
  { path: "/search", element: <Search /> },
  { path: "/about", element: <About /> },
];

export default routes;
