import { PageLoader } from "components/Design/Loader/Loader";
import VendorNavigation from "components/Navigation/VendorNavigation";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const NotFound = lazy(() => import("components/NotFound/NotFound"));
const ChatPage = lazy(() => import("pages/ChatPage"));
const EventList = lazy(() => import("pages/Vendor/EventList"));
const Home = lazy(() => import("pages/Vendor/Home"));
const Services = lazy(() => import("pages/Vendor/Services"));

const VendorRoutes = () => {
  return (
    <section className="flex w-full">
      <VendorNavigation />
      <Suspense
        fallback={
          <section className="flex items-center w-full justify-center">
            <PageLoader noBorder />
          </section>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to={`/vendor/home`} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/event" element={<EventList />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/services" element={<Services />} />
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
