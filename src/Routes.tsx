import CurrentUserProvider from "components/Context/CurrentUser";
import { PageLoader } from "components/Design/Loader/Loader";
import PrimarySideBar from "components/SideBar/PrimarySideBar";
import { useCurrentUserQuery } from "hooks/useCurrentUserQuery";
import { lazy, Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AccountSetup from "routes/AccountSetup";
import OtpOutlet from "routes/OtpOutlet";
import PrivateRoute from "routes/PrivateRoute";
const ProfileSetup = lazy(() => import("pages/ProfileSetup"));
const SignUp = lazy(() => import("pages/SignUp"));
const OTP = lazy(() => import("pages/OTP"));
const Login = lazy(() => import("pages/Login"));
const ErrorPage = lazy(() => import("components/ErrorBoundary/ErrorBoundary"));
const Persona = lazy(() => import("pages/Persona"));
const CreateEvent = lazy(() => import("routes/CreateEventRoutes"));
const HostRoutes = lazy(() => import("routes/HostRoutes"));
const MagicLink = lazy(() => import("components/MagicLink/MagicLink"));
const NotFound = lazy(() => import("components/NotFound/NotFound"));
const VendorRoutes = lazy(() => import("routes/VendorRoutes"));
const HostNoEventPage = lazy(() => import("pages/Host/HostNoEventPage"));
const GuestRoutes = lazy(() => import("routes/GuestRoutes"));
const NoInvites = lazy(() => import("pages/Guest/NoInvites"));
const MagicInvite = lazy(() => import("components/MagicInvite/MagicInvite"));

const RedirectToRoleBasedRoute = () => {
  const { data, isSuccess } = useCurrentUserQuery();
  const { role } = data || {};

  if (!isSuccess) {
    return null;
  }

  if (role === "VENDOR") {
    return <Navigate to="/vendor" />;
  }

  if (role === "GUEST") {
    return <Navigate to="/guest" />;
  }

  if (role === "HOST") {
    return <Navigate to="/host" />;
  }

  return null;
};

const HostProtected = () => {
  const { data, isSuccess } = useCurrentUserQuery();
  const { role } = data || {};

  if (!isSuccess) {
    return null;
  }

  switch (role) {
    case "HOST":
      return <Outlet />;
    case "VENDOR":
      return <Navigate to="/vendor" />;
    case "GUEST":
      return <Navigate to="/guest" />;
    default:
      return <Navigate to="/login" />;
  }
};

const VendorProtected = () => {
  const { data, isSuccess } = useCurrentUserQuery();
  const { role } = data || {};

  if (!isSuccess) {
    return null;
  }

  switch (role) {
    case "VENDOR":
      return <Outlet />;
    case "HOST":
      return <Navigate to="/host" />;
    case "GUEST":
      return <Navigate to="/guest" />;
    default:
      return <Navigate to="/login" />;
  }
};

const GuestProtected = () => {
  const { data, isSuccess } = useCurrentUserQuery();
  const { role } = data || {};

  if (!isSuccess) {
    return null;
  }

  switch (role) {
    case "GUEST":
      return <Outlet />;
    case "HOST":
      return <Navigate to="/host" />;
    case "VENDOR":
      return <Navigate to="/vendor" />;
    default:
      return <Navigate to="/login" />;
  }
};

const Layout = () => {
  return (
    <CurrentUserProvider>
      <section className="flex h-screen bg-neutral-0 border-8  border-red-400 overflow-auto w-full no-scrollbar">
        <PrimarySideBar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route index element={<RedirectToRoleBasedRoute />} />
            <Route element={<HostProtected />} errorElement={<ErrorPage />}>
              <Route path="/host" element={<HostNoEventPage />} />
              <Route path="/host/:eventId/*" element={<HostRoutes />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route element={<GuestProtected />} errorElement={<ErrorPage />}>
              <Route path="/guest" element={<NoInvites />} />
              <Route path="/guest/:eventId/*" element={<GuestRoutes />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route element={<VendorProtected />} errorElement={<ErrorPage />}>
              <Route path="/vendor/*" element={<VendorRoutes />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </section>
    </CurrentUserProvider>
  );
};

const Routing = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<PrivateRoute />} errorElement={<ErrorPage />}>
          <Route path="/*" element={<Layout />} />
          <Route path="/create-event/*" element={<CreateEvent />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AccountSetup />}>
          <Route path="/persona" element={<Persona />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
        </Route>

        <Route element={<OtpOutlet />}>
          <Route path="/otp" element={<OTP />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/magic-link" element={<MagicLink />} />
        <Route path="/magic-invite" element={<MagicInvite />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Routing;
