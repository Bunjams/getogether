import Button from "components/Design/Button/Button";
import Shimmer from "components/Design/Shimmer/Shimmer";
import useDocumentTitle from "hooks/useDocumentTitle";
import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { User } from "types/model/user";

const Home = () => {
  useDocumentTitle("Getogether");
  const navigate = useNavigate();

  const { user } = useOutletContext<{ user: User }>();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex items-center w-full justify-center flex-col">
      <img src={user.picture} className="rounded-full" alt={user.given_name} />
      <p className="text-subheading">
        {user.given_name} {user.family_name}
      </p>
      <Button type="primary" onClick={logout}>
        logout
      </Button>
    </header>
  );
};

export default Home;
