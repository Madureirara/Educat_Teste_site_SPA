import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App"; // altere para .tsx se for necessário
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CoursePage from "./pages/CoursePage"; // altere para .tsx se for necessário
import PostList from "./pages/PostList";

// Definindo o tipo do `router` com as rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/course",
    element: <CoursePage />,
  },
  {
    path: "/PostList",
    element: <PostList />,
  },
]);

// Tipagem explícita para `document.getElementById`
const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
