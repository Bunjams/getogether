import classNames from "classnames";
import {
  HandCoins,
  Home,
  ListChecks,
  MessageSquareMore,
  Users,
} from "lucide-react";
import { NavLink, NavLinkProps } from "react-router-dom";
import Logo from "static/Image/Logo.svg";

const NavMenu = ({
  children,
  icon,
  ...props
}: NavLinkProps & { icon: JSX.Element }) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        classNames("flex gap-2 items-center px-4 py-1 rounded border-l-4", {
          "bg-neutral-0 text-red-600 text-body-strong font-semibold border-red-400 transform transition duration-300 ease-in-out":
            isActive,
          "bg-whitebase text-body-regular font-medium text-neutral-700 border-transparent transform transition-all duration-[400ms] ease-in-out":
            !isActive,
        })
      }
    >
      <span className="shrink-0">{icon}</span>
      <>{children}</>
    </NavLink>
  );
};

const SecondarySideBar = () => {
  return (
    <div className="bg-whitebase p-3 flex gap-4 flex-col  w-64">
      <NavLink to="/" className="py-1 flex items-center gap-1">
        <img src={Logo} alt="getogether" loading="lazy" className="h-6 w-6" />
        <h4 className="text-red-600 font-bold text-h4">Getogether</h4>
      </NavLink>
      <NavMenu
        to="/"
        icon={<Home size={16} strokeWidth={2} color="currentColor" />}
      >
        Home
      </NavMenu>
      <NavMenu
        to="/chat"
        icon={
          <MessageSquareMore size={16} strokeWidth={2} color="currentColor" />
        }
      >
        Chat
      </NavMenu>
      <NavMenu
        to="/guest-list"
        icon={<ListChecks size={16} strokeWidth={2} color="currentColor" />}
      >
        Guest List
      </NavMenu>
      <NavMenu
        to="/vendors"
        icon={<Users size={16} strokeWidth={2} color="currentColor" />}
      >
        Vendors
      </NavMenu>
      <NavMenu
        to="/expense-manager"
        icon={<HandCoins size={16} strokeWidth={2} color="currentColor" />}
      >
        Expense Manager
      </NavMenu>
    </div>
  );
};

export default SecondarySideBar;
