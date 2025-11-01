import { PageLoader } from "components/Design/Loader/Loader";
import HostNavigation from "components/Navigation/HostNavigation";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
const NotFound = lazy(() => import("components/NotFound/NotFound"));
const GuestList = lazy(() => import("pages/Host/GuestList"));
const HostEventPage = lazy(() => import("pages/Host/EventHomePage"));
const ChatPage = lazy(() => import("pages/ChatPage"));
const VendorList = lazy(() => import("pages/Host/VendorList"));
const ExpenseManager = lazy(() => import("pages/Host/ExpenseManager"));
const ComingSoon = lazy(() => import("components/ComingSoon/ComingSoon"));

const HostRoutes = () => {
  const { eventId = "" } = useParams<{ eventId: string }>();

  return (
    <section className="flex w-full">
      <HostNavigation />
      <Suspense
        fallback={
          <section className="flex items-center w-full justify-center">
            <PageLoader noBorder />
          </section>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to={`/host/${eventId}/home`} />} />
          <Route path="/home" element={<HostEventPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/guest-list" element={<GuestList />} />
          <Route path="/vendors" element={<VendorList />} />
          <Route path="/expense-manager" element={<ComingSoon />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </section>
  );
};

export default HostRoutes;
