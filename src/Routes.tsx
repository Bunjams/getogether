import { Layout, Menu } from "antd";
import ErrorPage from "components/ErrorBoundary/ErrorBoundary";
import NotFound from "components/NotFound/NotFound";
import About from "pages/About";
import DatePciker from "pages/DatePicker";
import Home from "pages/Home";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import { Link, Routes, Route } from "react-router-dom";
import PrivateRoute from "routes/PrivateRoute";

const { Content, Sider } = Layout;

const AllProtectedRoutes = () => {
  return (
    <Layout hasSider className="flex flex-col h-screen">
      <Sider
        theme="light"
        className="overflow-auto h-screen !fixed left-0 top-0 bottom-0"
      >
        <Menu theme="light" mode="inline" defaultSelectedKeys={["3"]}>
          <Menu.Item className="all:unset">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item className="all:unset">
            <Link to="/date-picker">Date</Link>
          </Menu.Item>
          <Menu.Item className="all:unset">
            <Link to="/long-page">Long page</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="ml-[200px]">
        <Content className="overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/date-picker" element={<DatePciker />} />
            <Route path="/long-page" element={<About />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

const Routing = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />} errorElement={<ErrorPage />}>
        <Route
          path="/"
          element={<AllProtectedRoutes />}
          ErrorBoundary={ErrorPage}
        >
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default Routing;
