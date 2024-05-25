import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import AccountSetup from "routes/AccountSetup";
import OtpOutlet from "routes/OtpOutlet";
import PrivateRoute from "routes/PrivateRoute";
const ProfileSetup = lazy(() => import("pages/ProfileSetup"));
const SignUp = lazy(() => import("pages/SignUp"));
const OTP = lazy(() => import("pages/OTP"));
const Login = lazy(() => import("pages/Login"));
const Home = lazy(() => import("pages/Home"));
const ErrorPage = lazy(() => import("components/ErrorBoundary/ErrorBoundary"));
const NotFound = lazy(() => import("components/NotFound/NotFound"));
const Persona = lazy(() => import("pages/Persona"));
const PrimarySideBar = lazy(() => import("components/SideBar/PrimarySideBar"));

const AllProtectedRoutes = () => {
  return (
    <div className="flex flex-col h-screen p-2 bg-red-400">
      <div className="flex h-screen bg-whitebase">
        <Suspense>
          <PrimarySideBar />
        </Suspense>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

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
        <Route path="/*" element={<AllProtectedRoutes />} />
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
