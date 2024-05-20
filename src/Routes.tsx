import { Dropdown, Layout, Menu, MenuProps } from "antd";
import ErrorPage from "components/ErrorBoundary/ErrorBoundary";
import NotFound from "components/NotFound/NotFound";
import Logo from "logo.svg";
import About from "pages/About";
import Home from "pages/Home";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import { Link, Route, Routes } from "react-router-dom";
import PrivateRoute from "routes/PrivateRoute";

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
          <Menu.Item className="all:unset">
            <Link to="/long-page">Long page</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="ml-[200px]">
        <Content className="overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/long-page" element={<About />} />
            <Route path="*" element={<NotFound />} />
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
        <Route path="/*" element={<AllProtectedRoutes />} />
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default Routing;
