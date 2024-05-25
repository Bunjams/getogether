import Button from "components/Design/Button/Button";
import Loader from "components/Design/Loader/Loader";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "store/api/userProfile";

const Home = () => {
  useDocumentTitle("Getogether");
  const navigate = useNavigate();
  const { data, isLoading } = useGetUserQuery();
  const { profile_url, first_name, last_name } = data || {};

  const logout = () => {
    localStorage.removeItem("authUser");
    navigate("/login", { replace: true });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  return (
    <header className="flex items-center w-full justify-center flex-col">
      {profile_url && (
        <img src={profile_url} className="rounded-full" alt={first_name} />
      )}
      <p className="text-subheading">
        {first_name} {last_name}
      </p>
      <Button type="primary" onClick={logout}>
        logout
      </Button>
    </header>
  );
};

export default Home;
