import React from "react";

import Home from "./Home";
import Navbar from "./components/Navbar";
import Dapp from "./Dapp";
import Portfolio from "./Portfolio";

// according to RRD v6.4+
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
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
      <Route exact path="/" element={<Home />} />
      <Route path="/dapp" element={<Navigate to="/dapp/portfolio" replace />} />
      <Route path="/dapp" element={<Dapp />}>
        <Route path={"portfolio"} element={<Portfolio />} />
      </Route>
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
