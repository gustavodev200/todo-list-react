import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "./index.css";
import { Toaster } from "sonner";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/private-route.tsx";
import Login from "./pages/login.tsx";

const router = createBrowserRouter([
  { path: "/", element: <PrivateRoute component={App} /> },
  { path: "/login", element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster richColors />
  </React.StrictMode>
);
