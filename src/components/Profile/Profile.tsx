import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps } from "antd";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetUserProfileQuery } from "store/api/userProfile";

const DropdownItem = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <div className="flex flex-col">
      <p className="text-subheading text-neutral-900">{title}</p>
      <p className="text-body-regular text-neutral-500">{subTitle}</p>
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetUserProfileQuery();
  const { profile_url, first_name, last_name, email = "" } = data || {};

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
        <Avatar
          size="large"
          shape="circle"
          src={profile_url}
          icon={<UserOutlined />}
        />
      ),
    },
    {
      key: "signOut",
      label: (
        <div className="text-red-700 text-body-regular font-medium p-2">
          Sign out
        </div>
      ),
      icon: (
        <span className="text-red-700">
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
      disabled={isLoading}
    >
      <button className="all:unset cursor-pointer">
        <Avatar
          size="large"
          shape="circle"
          src={profile_url}
          icon={<UserOutlined size={40} />}
        />
      </button>
    </Dropdown>
  );
};

export default Profile;
