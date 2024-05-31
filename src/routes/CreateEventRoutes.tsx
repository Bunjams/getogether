import { PageLoader } from "components/Design/Loader/Loader";
import CreateEvent from "pages/CreateEvent";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const EventDuration = lazy(
  () => import("components/CreateEvent/EventDuration")
);
const InviteCoHosts = lazy(
  () => import("components/CreateEvent/InviteCoHosts")
);

const CreateEventRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route index element={<CreateEvent />} />
        <Route path="/duration" element={<EventDuration />} />
        <Route path="/invite-co-hosts" element={<InviteCoHosts />} />
      </Routes>
    </Suspense>
  );
};

export default CreateEventRoutes;
