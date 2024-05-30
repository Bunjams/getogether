import { Navigate, Outlet, useLocation } from "react-router-dom";

const OtpOutlet = () => {
  const location = useLocation();
  const { email } = location.state || {};

  return email ? <Outlet /> : <Navigate to="/login" />;
};

export default OtpOutlet;
