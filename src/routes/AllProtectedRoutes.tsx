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
      <section className="flex h-screen bg-neutral-0 border-8 border-red-400">
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
    </CurrentUserProvider>
  );
};

const AllProtectedRoutes = () => {
  const location = useLocation();
  const { isLoading } = useGetUserProfileQuery({});

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <CurrentUserProvider>
      <section className="flex h-screen bg-neutral-0 border-8 border-red-400 overflow-auto w-full no-scrollbar">
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
        <Suspense fallback={<PageLoader noBorder />}>
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
    </CurrentUserProvider>
  );
};

export default AllProtectedRoutes;
