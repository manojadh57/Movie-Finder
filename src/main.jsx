// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css"; // <- makes Tailwind + your colors work
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";

const router = createBrowserRouter([
  {
    element: <App />, // App has <Outlet/> and <Link/>, so it must be inside a router
    children: [
      { path: "/", element: <Home /> },
      { path: "/movie/:imdbID", element: <Details /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
