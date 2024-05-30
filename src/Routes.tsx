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

const Routing = () => {
  return (
    <Routes>
      <Route
        element={<PrivateRoute />}
        errorElement={
          <Suspense fallback={<PageLoader />}>
            <ErrorPage />
          </Suspense>
        }
      >
        <Route
          path="/*"
          element={
            <Suspense fallback={<PageLoader />}>
              <AllProtectedRoutes />
            </Suspense>
          }
        />
        <Route
          path="/create-event/*"
          element={
            <Suspense fallback={<PageLoader />}>
              <CreateEvent />
            </Suspense>
          }
        />
      </Route>

      <Route element={<AccountSetup />}>
        <Route
          path="/persona"
          element={
            <Suspense fallback={<PageLoader />}>
              <Persona />
            </Suspense>
          }
        />
        <Route
          path="/profile-setup"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProfileSetup />
            </Suspense>
          }
        />
      </Route>

      <Route element={<OtpOutlet />}>
        <Route
          path="/otp"
          element={
            <Suspense fallback={<PageLoader />}>
              <OTP />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/login"
        element={
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/signup"
        element={
          <Suspense fallback={<PageLoader />}>
            <SignUp />
          </Suspense>
        }
      />
      <Route
        path="/magic-link"
        element={
          <Suspense fallback={<PageLoader />}>
            <MagicLink />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Routing;
