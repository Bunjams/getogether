import { Avatar, Divider } from "antd";
import Profile from "components/Profile/Profile";
import RoleSwitcher from "components/RoleSwitcher/RoleSwitcher";
import { useCurrentUser } from "hooks/useCurrentUser";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllEevntsQuery } from "store/api/event";

const EventList = () => {
  const navigate = useNavigate();
  const { data = [], isLoading, isSuccess } = useGetAllEevntsQuery();

  const goToEvent = (uuid: string) => {
    navigate(`/${uuid}`);
  };

  if (!isSuccess) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      {data?.map(({ uuid, name }) => (
        <button
          key={uuid}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => goToEvent(uuid)}
        >
          <Avatar className="!border-solid !border-4 !border-red-300 h-10 w-10">
            {name[0]}
          </Avatar>
        </button>
      ))}
    </div>
  );
};

const PrimarySideBar = () => {
  const { role } = useCurrentUser();

  return (
    <nav className="bg-red-400 pr-3 pl-1 py-1 flex flex-col justify-between">
      <div>
        <RoleSwitcher />
        {role === "HOST" && (
          <div className="flex flex-col items-center gap-4">
            <Divider
              className="mt-4 mb-1 bg-whitebase"
              style={{ height: "2px" }}
            />
            <EventList />
            <Link to="/create-event">
              <button className="all:unset text-red-400 bg-whitebase rounded-full flex items-center justify-center h-10 w-10">
                <Plus size={40} strokeWidth={1.5} color="currentColor" />
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className="self-end">
        <Profile />
      </div>
    </nav>
  );
};

export default PrimarySideBar;
