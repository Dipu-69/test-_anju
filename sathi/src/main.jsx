import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/globals.css";

import App from "./app";
import Home from "./pages/home";
import Chat from "./pages/chat";
import Consultants from "./pages/consultants";
import ConsultantDetail from "./pages/consultant-detail";
import Resources from "./pages/resources";
import Contact from "./pages/contact";
import About from "./pages/about";
import Privacy from "./pages/privacy";
import Terms from "./pages/terms";
import NotFound from "./pages/not-found";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "chat", element: <Chat /> },
      { path: "consultants", element: <Consultants /> },
      { path: "consultants/:id", element: <ConsultantDetail /> },
      { path: "resources", element: <Resources /> },
      { path: "contact", element: <Contact /> },
      { path: "about", element: <About /> },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);