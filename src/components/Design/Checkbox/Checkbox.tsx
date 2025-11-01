import { Checkbox as AntCheckbox, CheckboxProps, ConfigProvider } from "antd";

const Checkbox = (props: CheckboxProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Checkbox: {
            colorPrimary: "#EF897A",
            colorIconHover: "#EF897A",
            colorPrimaryHover: "#EF897A",
            borderRadius: 2,
          },
        },
      }}
    >
      <AntCheckbox {...props} />
    </ConfigProvider>
  );
};

export default Checkbox;
