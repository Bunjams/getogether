import { PageLoader } from "components/Design/Loader/Loader";
import VendorNavigation from "components/Navigation/VendorNavigation";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const NotFound = lazy(() => import("components/NotFound/NotFound"));

const sectionVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const VendorRoutes = () => {
  return (
    <section className="flex w-full">
      <AnimatePresence mode="wait">
        <motion.aside
          className="flex"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={sectionVariants}
          transition={{ duration: 0.5 }}
        >
          <VendorNavigation />
        </motion.aside>
      </AnimatePresence>
      <Suspense
        fallback={
          <section className="flex items-center w-full justify-center">
            <PageLoader noBorder />
          </section>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to={`/vendor/home`} />} />
          <Route
            path="/home"
            element={
              <section className="flex items-center w-full justify-center">
                <PageLoader noBorder />
                home
              </section>
            }
          />
          <Route
            path="/event"
            element={
              <section className="flex items-center w-full justify-center">
                <PageLoader noBorder />
                event
              </section>
            }
          />
          <Route
            path="/chat"
            element={
              <section className="flex items-center w-full justify-center">
                <PageLoader noBorder />
                chat
              </section>
            }
          />
          <Route
            path="/services"
            element={
              <section className="flex items-center w-full justify-center">
                <PageLoader noBorder />
                services
              </section>
            }
          />
          <Route
            path="/payments"
            element={
              <section className="flex items-center w-full justify-center">
                <PageLoader noBorder />
                payments
              </section>
            }
          />
          <Route
            path="/calendar"
            element={
              <section className="flex items-center w-full justify-center">
                <PageLoader noBorder />
                calendar
              </section>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </section>
  );
};

export default VendorRoutes;
