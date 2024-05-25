import Button from "components/Design/Button/Button";
import useDocumentTitle from "hooks/useDocumentTitle";
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
      {user.profile_url && (
        <img
          src={user.profile_url}
          className="rounded-full"
          alt={user.first_name}
        />
      )}
      <p className="text-subheading">
        {user.first_name} {user.last_name}
      </p>
      <Button type="primary" onClick={logout}>
        logout
      </Button>
    </header>
  );
};

export default Home;
