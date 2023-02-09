import React from "react";

import Home from "./Home";
import Dapp from "./Dapp";
import Navbar from "./components/Navbar";

// according to RRD v6.4+
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route element={<Home />} path="/" />
      <Route element={<Dapp />} path="/dapp" />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
