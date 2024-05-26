import classNames from "classnames";
import React, { createContext, forwardRef, useContext } from "react";

type TableContextType = {
  layout?: "table" | "flex" | "fixed";
  size?: "small" | "regular" | "large";
  isLoading?: boolean;
};

const TableContext = createContext<TableContextType>({
  layout: "table",
  size: "regular",
  isLoading: false,
});

const Head = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >
) => (
  <thead
    {...props}
    className={classNames(
      "text-body-regular rounded-t-lg text-text-30 bg-surface border-0 border-solid border-neutral-30 border-b sticky top-0 z-table-head" +
        props.className || ""
    )}
  />
);

const HeadCell = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >
) => {
  const { size } = useContext(TableContext);

  return (
    <th
      className={classNames("text-subtext-sm uppercase", {
        "p-2": size === "small",
        "p-4": size === "regular",
      })}
      {...props}
    />
  );
};

const Row = forwardRef<
  HTMLTableRowElement,
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > & { onRowClick?: () => void }
>((props, ref) => {
  const { layout } = useContext(TableContext);

  return (
    <tr
      onClick={props.onRowClick}
      {...props}
      ref={ref}
      className={classNames(
        "px-3 border-solid border-neutral-0 border-b border-0 text-body " +
          props.className || "",
        {
          "flex items-center": layout === "flex",
          "hover:t-bg-surface-lighter-grey cursor-pointer": Boolean(
            props.onRowClick
          ),
        }
      )}
    />
  );
});

const BodyWrapper = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >
) => <div className="overflow-auto" {...props} />;

const Body = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >
) => <tbody {...props}></tbody>;

const Container = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  > &
    TableContextType
) => {
  return (
    <TableContext.Provider
      value={{
        layout: props.layout || "table",
        size: props.size || "small",
        isLoading: props.isLoading,
      }}
    >
      <div className="h-full w-full overflow-x-auto" {...props} />
    </TableContext.Provider>
  );
};

const Cell = ({
  children,
  ...props
}: React.PropsWithChildren<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >
>) => {
  const { size, isLoading } = useContext(TableContext);

  return (
    <td
      className={classNames({
        "p-2": size === "small",
        "p-4": size === "regular",
      })}
      {...props}
    >
      {isLoading ? (
        <div className="bg-neutral-20 rounded-md my-2 h-6 animate-pulse"></div>
      ) : (
        children
      )}
    </td>
  );
};

const Content = (
  props: React.DetailedHTMLProps<
    React.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  >
) => {
  const { layout } = useContext(TableContext);
  return (
    <table
      className={classNames("w-full", props.className, {
        "table-fixed": layout === "fixed",
      })}
      {...props}
    />
  );
};

const Table = {
  Container,
  Content,
  Body,
  BodyWrapper,
  Row,
  Head,
  HeadCell,
  Cell,
};

export default Table;
