import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  let user = JSON.parse(localStorage.getItem("user") || "{}");

  return user?.email ? <Outlet context={{ user }} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
