import Loader from "components/Design/Loader/Loader";
import PrimarySideBar from "components/SideBar/PrimarySideBar";
import SecondarySideBar from "components/SideBar/SecondarySideBar";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useGetUserProfileQuery } from "store/api/userProfile";
const Home = lazy(() => import("pages/Home"));
const NotFound = lazy(() => import("components/NotFound/NotFound"));

const AllProtectedRoutes = () => {
  const { isLoading } = useGetUserProfileQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const sectionVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  if (isLoading) {
    return (
      <section className="flex flex-col h-screen p-2 bg-red-400">
        <section className="flex h-screen bg-neutral-0 items-center justify-center">
          <Loader />
        </section>
      </section>
    );
  }

  return (
    <section className="flex flex-col h-screen p-2 bg-red-400">
      <section className="flex h-screen bg-neutral-0">
        <AnimatePresence mode="wait">
          <motion.aside
            className="flex"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
            transition={{ duration: 0.5 }}
          >
            <PrimarySideBar />
            <SecondarySideBar />
          </motion.aside>
        </AnimatePresence>
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
      </section>
    </section>
  );
};

export default AllProtectedRoutes;
