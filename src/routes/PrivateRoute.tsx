import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  let user = { email: "" };

  try {
    user = JSON.parse(localStorage.getItem("user") || "");
  } catch (error) {}

  return user?.email ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
