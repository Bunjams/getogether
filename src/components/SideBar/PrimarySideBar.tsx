import { Divider } from "antd";
import Profile from "components/Profile/Profile";
import RoleSwitcher from "components/RoleSwitcher/RoleSwitcher";
import { Plus } from "lucide-react";

const PrimarySideBar = () => {
  return (
    <div className="bg-red-400 pr-3 pl-1 py-1 flex flex-col justify-between transform transition duration-300 ease-in-out">
      <div>
        <RoleSwitcher />
        <Divider className="my-4 bg-whitebase" style={{ height: "2px" }} />
        <div className="text-red-400 bg-whitebase rounded-full flex items-center justify-center h-10 w-10">
          <Plus size={40} strokeWidth={1.5} color="currentColor" />
        </div>
      </div>
      <Profile />
    </div>
  );
};

export default PrimarySideBar;
