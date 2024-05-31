import { ReactNode } from "react";

const Header = ({ right, title }: { title: ReactNode; right: ReactNode }) => {
  return (
    <header className="flex justify-between">
      <div className="text-neutral-900 text-[30px] font-semibold leading-10">
        {title}
      </div>
      {right}
    </header>
  );
};

export default Header;
