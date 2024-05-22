import { Dropdown, Layout, Menu, MenuProps } from "antd";
import Logo from "logo.svg";
import { Suspense, lazy } from "react";
import { Link, Route, Routes } from "react-router-dom";
import PrivateRoute from "routes/PrivateRoute";
const ProfileSetup = lazy(() => import("pages/ProfileSetup"));
const SignUp = lazy(() => import("pages/SignUp"));
const OTP = lazy(() => import("pages/OTP"));
const Login = lazy(() => import("pages/Login"));
const Home = lazy(() => import("pages/Home"));
const ErrorPage = lazy(() => import("components/ErrorBoundary/ErrorBoundary"));
const NotFound = lazy(() => import("components/NotFound/NotFound"));

const { Content, Sider } = Layout;
const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Host",
  },
  {
    key: "2",
    label: "Vendor",
  },
  {
    key: "3",
    label: "Guest",
  },
];

const AllProtectedRoutes = () => {
  return (
    <Layout hasSider className="flex flex-col h-screen">
      <Sider
        theme="light"
        className="overflow-auto h-screen !fixed left-0 top-0 bottom-0"
      >
        <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
          <button className="p-2 all:unset">
            <img
              src={Logo}
              className="rounded text-footnote"
              alt="getogether"
            />
          </button>
        </Dropdown>
        <Menu theme="light" mode="inline" defaultSelectedKeys={["3"]}>
          <Menu.Item className="all:unset">
            <Link to="/">Home</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="ml-[200px]">
        <Content className="overflow-auto">
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
        </Content>
      </Layout>
    </Layout>
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
      <Route
        path="/profile-setup"
        element={
          <Suspense>
            <ProfileSetup />
          </Suspense>
        }
      />
      <Route
        path="/otp"
        element={
          <Suspense>
            <OTP />
          </Suspense>
        }
      />
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
