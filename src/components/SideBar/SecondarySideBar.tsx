import classNames from "classnames";
import { ReactNode } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import Logo from "static/Image/Logo.svg";

export const NavMenu = ({
  children,
  icon,
  ...props
}: NavLinkProps & { icon: JSX.Element }) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        classNames(
          "flex gap-2 items-center px-4 py-1 rounded border-l-4 transform transition duration-300 ease-in-out",
          {
            "bg-neutral-0 text-red-600 text-body-bold border-red-400": isActive,
            "bg-whitebase text-body-regular font-medium text-neutral-700 border-transparent hover:bg-neutral-0":
              !isActive,
          }
        )
      }
    >
      <span className="shrink-0">{icon}</span>
      <>{children}</>
    </NavLink>
  );
};

const SecondarySideBar = ({
  children,
  baseRoute,
}: {
  children: ReactNode;
  baseRoute: string;
}) => {
  return (
    <nav className="shrink-0 bg-whitebase p-3 flex gap-4 flex-col w-64 h-[calc(100vh-16px)] overflow-y-auto">
      <NavLink to={baseRoute} className="py-1 flex items-center gap-1">
        <img src={Logo} alt="getogether" loading="lazy" className="h-6 w-6" />
        <h4 className="text-red-600 font-bold text-h4">Getogether</h4>
      </NavLink>
      {children}
    </nav>
  );
};

export default SecondarySideBar;
