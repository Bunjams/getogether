import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  let user = JSON.parse(localStorage.getItem("authUser") || "{}");

  return user?.role ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
