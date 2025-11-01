import { ConfigProvider, Radio, RadioProps } from "antd";
type Props = RadioProps & {
  label?: string;
};

const RadioButton = ({ label, ...props }: Props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Radio: {
            fontSize: 14,
            borderRadius: 2,
            borderRadiusSM: 2,
            borderRadiusLG: 2,
            colorBorder: "#F3F4F8",
            buttonColor: "#101222",
            buttonCheckedColorDisabled: "#FEFDFD",
            buttonSolidCheckedColor: "#F3F4F8",
            colorInfoTextActive: "#FEFDFD",
            buttonSolidCheckedBg: "#EF897A",
            buttonSolidCheckedHoverBg: "#EF897A",
            buttonSolidCheckedActiveBg: "#EF897A",
          },
        },
      }}
    >
      <Radio.Button {...props} className="hover:text-neutral-900" />
    </ConfigProvider>
  );
};

export default RadioButton;
