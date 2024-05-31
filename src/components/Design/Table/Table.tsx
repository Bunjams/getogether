import type { TableProps } from "antd";
import { ConfigProvider, Table as AntTable } from "antd";
import { ReactNode } from "react";

type Props = {
  header?: ReactNode;
} & TableProps;

const Table = ({ header, ...rest }: Props) => {
  return (
    <div className="bg-white shadow-button-secondary p-4 rounded-lg">
      {header}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBorderRadius: 0,
              headerBg: "#FAFAFA",
              headerColor: "#101222",
              cellFontSize: 14,
            },
          },
        }}
      >
        <AntTable {...rest} />
      </ConfigProvider>
    </div>
  );
};

export default Table;
