import { Navigate, Outlet } from "react-router-dom";

const OtpOutlet = () => {
  let email = localStorage.getItem("email");

  return email ? <Outlet /> : <Navigate to="/login" />;
};

export default OtpOutlet;
