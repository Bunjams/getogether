import Loader from "components/Design/Loader/Loader";
import PrimarySideBar from "components/SideBar/PrimarySideBar";
import SecondarySideBar from "components/SideBar/SecondarySideBar";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
const Home = lazy(() => import("pages/Home"));
const NotFound = lazy(() => import("components/NotFound/NotFound"));

const AllProtectedRoutes = () => {
  return (
    <div className="flex flex-col h-screen p-2 bg-red-400">
      <div className="flex h-screen bg-neutral-0">
        <PrimarySideBar />
        <SecondarySideBar />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense>
                <Home />
              </Suspense>
            }
          />

          <Route
            path="/chat"
            element={
              <section className="flex items-center w-full justify-center">
                <Loader /> Chat
              </section>
            }
          />

          <Route
            path="/guest-list"
            element={
              <section className="flex items-center w-full justify-center">
                <Loader /> Guest List
              </section>
            }
          />
          <Route
            path="/vendors"
            element={
              <section className="flex items-center w-full justify-center">
                <Loader /> Vendors
              </section>
            }
          />
          <Route
            path="/expense-manager"
            element={
              <section className="flex items-center w-full justify-center">
                <Loader /> Expense Manager
              </section>
            }
          />
          <Route
            path="*"
            element={
              <Suspense>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default AllProtectedRoutes;
