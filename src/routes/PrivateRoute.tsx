import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = { user: "null" };
  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
