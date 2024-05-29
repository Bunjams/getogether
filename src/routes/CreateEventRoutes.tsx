import EventDuration from "components/CreateEvent/EventDuration";
import InviteCoHosts from "components/CreateEvent/InviteCoHosts";
import Loader from "components/Design/Loader/Loader";
import CreateEvent from "pages/CreateEvent";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const CreateEventRoutes = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <Suspense fallback={<Loader />}>
            <CreateEvent />
          </Suspense>
        }
      />
      <Route path="/duration" element={<EventDuration />} />
      <Route path="/invite-co-hosts" element={<InviteCoHosts />} />
    </Routes>
  );
};

export default CreateEventRoutes;
