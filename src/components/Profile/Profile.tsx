import { Avatar, Dropdown, MenuProps } from "antd";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useRandomProfile } from "hooks/useRandomProfile";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DropdownItem = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <div className="flex flex-col">
      <p className="text-h5-bold text-neutral-900">{title}</p>
      <p className="text-body-regular text-neutral-500">{subTitle}</p>
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const { profile_url, first_name, last_name, email = "" } = user || {};
  const profileUrl = useRandomProfile();

  const signOut = () => {
    localStorage.removeItem("authUser");
    navigate("/login", { replace: true });
  };

  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <DropdownItem subTitle={email} title={`${first_name} ${last_name}`} />
      ),
      icon: (
        <span className="ml-2">
          <Avatar size="large" shape="circle" src={profile_url || profileUrl} />
        </span>
      ),
    },
    {
      key: "signOut",
      label: (
        <div className="text-red-600 text-body-regular font-medium p-2">
          Sign out
        </div>
      ),
      icon: (
        <span className="text-red-600">
          <LogOut size={16} strokeWidth={2} color="currentColor" />
        </span>
      ),
      onClick: signOut,
    },
  ];
  return (
    <Dropdown
      menu={{ items }}
      placement="bottomLeft"
      trigger={["click"]}
      disabled={!user}
    >
      <button className="all:unset cursor-pointer">
        <Avatar size={40} shape="circle" src={profile_url || profileUrl} />
      </button>
    </Dropdown>
  );
};

export default Profile;
