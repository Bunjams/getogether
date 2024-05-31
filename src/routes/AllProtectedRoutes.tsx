import CurrentUserProvider from "components/Context/CurrentUser";
import Loader, { PageLoader } from "components/Design/Loader/Loader";
import PrimarySideBar from "components/SideBar/PrimarySideBar";
import SecondarySideBar from "components/SideBar/SecondarySideBar";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useGetUserProfileQuery } from "store/api/userProfile";
const NotFound = lazy(() => import("components/NotFound/NotFound"));
const GuestList = lazy(() => import("pages/Host/GuestList"));
const HostEventPage = lazy(() => import("pages/Host/EventHomePage"));
const ChatPage = lazy(() => import("pages/ChatPage"));
const HostNoEventPage = lazy(() => import("pages/Host/HostNoEventPage"));
const VendorList = lazy(() => import("pages/Host/VendorList"));
const ExpenseManager = lazy(() => import("pages/Host/ExpenseManager"));

const sectionVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export const NoEventPage = () => {
  return (
    <CurrentUserProvider>
      <section className="flex flex-col h-screen p-2 bg-red-400">
        <section className="flex h-[calc(100vh-16px)] bg-neutral-0">
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
              <Route index element={<HostNoEventPage />} />
            </Routes>
          </AnimatePresence>
        </section>
      </section>
    </CurrentUserProvider>
  );
};

const AllProtectedRoutes = () => {
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
      <section className="flex flex-col h-screen p-2 bg-red-400 w-full">
        <section className="flex h-[calc(100vh-16px)] bg-neutral-0 w-[calc(100vw-16px)] overflow-auto">
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
          <Suspense fallback={<PageLoader />}>
            <Routes location={location}>
              <Route path="/home" element={<HostEventPage />} />

              <Route path="/chat" element={<ChatPage />} />

              <Route path="/guest-list" element={<GuestList />} />
              <Route path="/vendors" element={<VendorList />} />
              <Route path="/expense-manager" element={<ExpenseManager />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </section>
      </section>
    </CurrentUserProvider>
  );
};

export default AllProtectedRoutes;
