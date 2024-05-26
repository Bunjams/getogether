import type { TableProps } from "antd";
import { Table as AntTable, ConfigProvider } from "antd";
import AnimatedPage from "../AnimatedPage/AnimatedPage";

const Table = (props: TableProps) => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatedPage
      variants={sectionVariants}
      className="bg-white shadow-button-secondary p-4 rounded-lg"
    >
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
        <AntTable {...props} />
      </ConfigProvider>
    </AnimatedPage>
  );
};

export default Table;
