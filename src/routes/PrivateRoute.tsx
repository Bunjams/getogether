import { Navigate, Outlet } from "react-router-dom";
import { useGetUsersQuery } from "store/api/userProfile";

const PrivateRoute = () => {
  let user = JSON.parse(localStorage.getItem("user") || "{}");
  const { data } = useGetUsersQuery();
  console.log("data:", data);

  return user?.role ? <Outlet context={{ user }} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
