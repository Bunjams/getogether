import { PageLoader } from "components/Design/Loader/Loader";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
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
const AllProtectedRoutes = lazy(() => import("routes/AllProtectedRoutes"));
const MagicLink = lazy(() => import("components/MagicLink/MagicLink"));
const NoEventPage = lazy(() => import("routes/AllProtectedRoutes"));

const Routing = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<PrivateRoute />} errorElement={<ErrorPage />}>
          <Route path="/" element={<NoEventPage />} />
          <Route path="/create-event/*" element={<CreateEvent />} />
          <Route path="/event/:eventId/*" element={<AllProtectedRoutes />} />
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
      </Routes>
    </Suspense>
  );
};

export default Routing;
