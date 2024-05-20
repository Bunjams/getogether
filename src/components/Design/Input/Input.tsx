import { Input as AntInput, ConfigProvider, InputProps } from "antd";

const Input = (props: InputProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            hoverBorderColor: "#F6A295",
            activeBorderColor: "#F6A295",
            colorText: "#101222",
            colorTextPlaceholder: "#B3B5BC",
            activeShadow: "0 0 0 2px rgba(246, 162, 149, 0.2)",
            borderRadius: 2,
            borderRadiusLG: 2,
            borderRadiusSM: 2,
            borderRadiusXS: 2,
            borderRadiusOuter: 2,
          },
        },
      }}
    >
      <AntInput {...props} />
    </ConfigProvider>
  );
};

export default Input;
