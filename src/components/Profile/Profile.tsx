import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps } from "antd";
import { useCurrentUser } from "hooks/useCurrentUser";
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
          {profile_url ? (
            <Avatar size="large" shape="circle" src={profile_url} />
          ) : (
            <div className="text-red-400 bg-neutral-0 rounded-full flex items-center justify-center h-10 w-10">
              <UserOutlined size={40} color="currentColor" />
            </div>
          )}
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
        {profile_url ? (
          <Avatar size={40} shape="circle" src={profile_url} />
        ) : (
          <div className="text-red-400 bg-whitebase rounded-full flex items-center justify-center h-10 w-10">
            <UserOutlined size={40} color="currentColor" />
          </div>
        )}
      </button>
    </Dropdown>
  );
};

export default Profile;
