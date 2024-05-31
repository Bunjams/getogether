import CurrentUserProvider from "components/Context/CurrentUser";
import Loader, { PageLoader } from "components/Design/Loader/Loader";
import PrimarySideBar from "components/SideBar/PrimarySideBar";
import SecondarySideBar from "components/SideBar/SecondarySideBar";
import { AnimatePresence, motion } from "framer-motion";
import ChatPage from "pages/ChatPage";
import Home from "pages/Home";
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { useGetUserProfileQuery } from "store/api/userProfile";
const NotFound = lazy(() => import("components/NotFound/NotFound"));
const GuestList = lazy(() => import("pages/GuestList"));

const sectionVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export const NoEventPage = () => {
  return (
    <CurrentUserProvider>
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
            </motion.aside>
            <Routes>
              <Route index element={<Home />} />
            </Routes>
          </AnimatePresence>
        </section>
      </section>
    </CurrentUserProvider>
  );
};

const AllProtectedRoutes = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const location = useLocation();
  const { isLoading } = useGetUserProfileQuery({});

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
    <CurrentUserProvider>
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
              <motion.aside
                key={eventId}
                className="flex"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={sectionVariants}
                transition={{ duration: 0.5 }}
              >
                <SecondarySideBar />
              </motion.aside>
            </motion.aside>
          </AnimatePresence>
          <Suspense fallback={<PageLoader />}>
            <Routes location={location}>
              <Route path="/home" element={<>Event pag {eventId}</>} />

              <Route path="/chat" element={<ChatPage />} />

              <Route path="/guest-list" element={<GuestList />} />
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

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </section>
      </section>
    </CurrentUserProvider>
  );
};

export default AllProtectedRoutes;
