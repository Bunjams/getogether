import { Dropdown, MenuProps } from "antd";
import classNames from "classnames";
import Loader from "components/Design/Loader/Loader";
import { HandHeart, PartyPopper } from "lucide-react";
import CheckSolid from "static/Icons/CheckSolid";
import {
  useGetUserProfileQuery,
  useUpdateRoleMutation,
} from "store/api/userProfile";

type ProfileType = "HOST" | "VENDOR" | "GUEST";

const DropdownItem = ({
  title,
  isActive,
  subTitle,
}: {
  title: string;
  subTitle: string;
  isActive: boolean;
}) => {
  return (
    <div className="py-2 flex gap-3 items-center w-full justify-between ml-3">
      <div className="flex flex-col">
        <p className="text-h5-bold text-neutral-900">{title}</p>
        <p className="text-body-regular text-neutral-500">{subTitle}</p>
      </div>
      {isActive && (
        <div className="text-red-600 justify-self-end mr-2">
          <CheckSolid />
        </div>
      )}
    </div>
  );
};

const Icon = ({ icon }: { icon: ProfileType }) => {
  if (icon === "HOST") {
    return <PartyPopper strokeWidth={1.5} color="currentColor" size="20" />;
  }
  if (icon === "VENDOR") {
    return <HandHeart strokeWidth={1.5} color="currentColor" size="20" />;
  }
  return null;
};

const MenuIcon = ({
  isActive,
  icon,
}: {
  isActive: boolean;
  icon: ProfileType;
}) => {
  return (
    <div
      className={classNames("p-3 rounded-sm", {
        "text-red-600 bg-red-100": isActive,
        "bg-neutral-100 text-neutral-500": isActive,
      })}
    >
      <Icon icon={icon} />
    </div>
  );
};

const RoleSwitcher = () => {
  const { data, isFetching } = useGetUserProfileQuery({});

  const { role: currentProfile } = data || {};

  const [onRoleUpdate, { isLoading }] = useUpdateRoleMutation();

  const onProfileChange = async (profile: ProfileType) => {
    try {
      await onRoleUpdate({ role: profile }).unwrap();
    } catch (error) {}
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      type: "group",
      label: "Workspaces",
      children: [
        {
          key: "HOST",
          label: (
            <DropdownItem
              isActive={currentProfile === "HOST"}
              title="Host"
              subTitle="Add and host events"
            />
          ),
          icon: <MenuIcon icon="HOST" isActive={currentProfile === "HOST"} />,

          onClick: () => {
            onProfileChange("HOST");
          },
        },
        {
          key: "VENDOR",
          label: (
            <DropdownItem
              isActive={currentProfile === "VENDOR"}
              title="Vendors"
              subTitle="Provide services and track events"
            />
          ),
          icon: (
            <MenuIcon icon="VENDOR" isActive={currentProfile === "VENDOR"} />
          ),
          onClick: () => {
            onProfileChange("VENDOR");
          },
        },
      ],
    },
  ];

  const loading = isLoading || isFetching;

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomLeft"
      trigger={["click"]}
      disabled={loading}
    >
      <button className="all:unset bg-red-100 p-3 rounded-sm cursor-pointer text-red-600">
        {loading ? (
          <Loader size="20" />
        ) : (
          <>{currentProfile && <Icon icon={currentProfile} />}</>
        )}
      </button>
    </Dropdown>
  );
};

export default RoleSwitcher;
