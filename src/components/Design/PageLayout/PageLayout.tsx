import { ReactNode } from "react";

const PageLayout = ({
  children,
  header,
}: {
  header?: ReactNode;
  children: ReactNode;
}) => {
  return (
    <section className="pl-10 pr-4 pb-6 relative overflow-auto h-[calc(100vh-16px)] scroll-smooth">
      <div className="sticky top-0 z-header bg-neutral-0 pt-8">{header}</div>
      <div className="pt-6">{children}</div>
    </section>
  );
};

export default PageLayout;
