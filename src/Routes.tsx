import { Suspense, lazy } from "react";
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
const CreateEvent = lazy(() => import("pages/CreateEvent"));
const AllProtectedRoutes = lazy(() => import("routes/AllProtectedRoutes"));

const Routing = () => {
  return (
    <Routes>
      <Route
        element={<PrivateRoute />}
        errorElement={
          <Suspense>
            <ErrorPage />
          </Suspense>
        }
      >
        <Route
          path="/*"
          element={
            <Suspense>
              <AllProtectedRoutes />
            </Suspense>
          }
        />
        <Route
          path="/create-event"
          element={
            <Suspense>
              <CreateEvent />
            </Suspense>
          }
        />
      </Route>

      <Route element={<AccountSetup />}>
        <Route
          path="/persona"
          element={
            <Suspense>
              <Persona />
            </Suspense>
          }
        />
        <Route
          path="/profile-setup"
          element={
            <Suspense>
              <ProfileSetup />
            </Suspense>
          }
        />
      </Route>

      <Route element={<OtpOutlet />}>
        <Route
          path="/otp"
          element={
            <Suspense>
              <OTP />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/login"
        element={
          <Suspense>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/signup"
        element={
          <Suspense>
            <SignUp />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Routing;
