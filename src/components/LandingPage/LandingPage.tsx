import cx from "classnames";
import React, { HTMLAttributes, forwardRef } from "react";
import Logo from "static/Image/Logo.svg";

type DashboardContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

const Header = ({ className }: DashboardContainerProps) => (
  <div className={cx("flex-[0_0_auto] flex w-full", className || "")}>
    <div className="px-6 py-3 col-span-2 self-start">
      <img src={Logo} alt="getogether" />
    </div>
  </div>
);

const Content = ({
  img,
  children,
}: DashboardContainerProps &
  HTMLAttributes<HTMLDivElement> & { img: string }) => (
  <div className="h-[calc(100vh-76px)] flex items-center w-full md:justify-between md:px-16 justify-center">
    {children}
    <img src={img} alt="SignInSignUpSide" className="md:block hidden" />
  </div>
);

const LandingPage = Object.assign(
  forwardRef<HTMLDivElement, DashboardContainerProps>(
    ({ children, className }, ref) => {
      return (
        <div
          ref={ref}
          className={cx(
            "flex flex-col w-full bg-[url('static/Image/LandingPageBackground.svg')] bg-no-repeat bg-cover items-center justify-center",
            className || ""
          )}
        >
          {children}
        </div>
      );
    }
  ),
  {
    Header,
    Content,
  }
);

export default LandingPage;
