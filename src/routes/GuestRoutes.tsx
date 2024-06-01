import { PageLoader } from "components/Design/Loader/Loader";
import GuestNavigation from "components/Navigation/GuestNavigation";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
const NotFound = lazy(() => import("components/NotFound/NotFound"));
const HomePage = lazy(() => import("pages/Guest/HomePage"));
const ChatPage = lazy(() => import("pages/ChatPage"));

const GuestRoutes = () => {
  const { eventId = "" } = useParams<{ eventId: string }>();

  return (
    <section className="flex w-full">
      <GuestNavigation />

      <Suspense
        fallback={
          <section className="flex items-center w-full justify-center">
            <PageLoader noBorder />
          </section>
        }
      >
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/guest/${eventId}/home`} />}
          />
          <Route path="/home" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </section>
  );
};

export default GuestRoutes;
