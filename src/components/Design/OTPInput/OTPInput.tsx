import { Input as AntInput, ConfigProvider } from "antd";
import type { OTPProps } from "antd/es/input/OTP";
import useDocumentTitle from "hooks/useDocumentTitle";

type Props = {
  label?: string;
  name?: string;
} & OTPProps;

const OTPInput = ({ label, name, ...props }: Props) => {
  useDocumentTitle("Verification Required");

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
            padding: 12,
            paddingLG: 12,
            paddingSM: 12,
            paddingXS: 12,
            paddingInline: 12,
            paddingInlineLG: 12,
            paddingInlineSM: 12,
            paddingBlock: 12,
            paddingBlockLG: 12,
            paddingBlockSM: 12,
          },
        },
      }}
    >
      <AntInput.OTP {...props} />
    </ConfigProvider>
  );
};

export default OTPInput;
