import { Input as AntInput, ConfigProvider } from "antd";
import Label from "../Label/Label";

type Props = {
  label?: string;
} & React.ComponentProps<typeof AntInput.TextArea>;

const TextArea = ({ label, size = "middle", ...props }: Props) => {
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
      <span className="relative block w-full">
        {label && (
          <Label htmlFor={props.name} required={props.required}>
            {label}
          </Label>
        )}
        <AntInput.TextArea {...props} size={size} />
      </span>
    </ConfigProvider>
  );
};

export default TextArea;
