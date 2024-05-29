import { ConfigProvider, DatePicker as DateSelector } from "antd";
import { DatePickerProps } from "antd/es/date-picker";
import Label from "../Label/Label";

type Props = DatePickerProps & {
  label?: string;
};

const DatePciker = ({ label, ...props }: Props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          DatePicker: {
            activeBorderColor: "#FEFDFD",
            hoverBorderColor: "#F6A295",
            borderRadius: 2,
            borderRadiusLG: 2,
            borderRadiusSM: 2,
            colorBorder: "#F3F4F8",
          },
        },
      }}
    >
      <div className="flex flex-col gap-0.5 h-max">
        {label && (
          <Label htmlFor={props.name} required={props.required}>
            {label}
          </Label>
        )}
        <DateSelector {...props} />
      </div>
    </ConfigProvider>
  );
};

export default DatePciker;
