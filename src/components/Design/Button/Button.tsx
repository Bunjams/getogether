import {
  Button as AntButton,
  ButtonProps as AntButtonProps,
  ConfigProvider,
} from "antd";

const Button = (props: AntButtonProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#EF897A",
            colorPrimaryHover: "#F6A295",
            colorPrimaryActive: "#D85E4D",
            colorBgContainerDisabled: "#F3F4F8",
            colorTextDisabled: "#B3B5BC",
            colorLink: "#4E97D9",
            colorLinkActive: "#2774BA",
            colorLinkHover: "#79B7EF",
            colorBgTextHover: "#F3F4F8",
            colorBgTextActive: "#FAFAFA",
            borderRadius: 2,
            borderRadiusLG: 2,
            borderRadiusSM: 2,
            borderRadiusXS: 2,
            borderRadiusOuter: 2,
          },
        },
      }}
    >
      <AntButton {...props} />
    </ConfigProvider>
  );
};

export default Button;
