import { Radio, RadioGroupProps } from "antd";
import Label from "../Label/Label";
type Props = RadioGroupProps & {
  label?: string;
  required?: boolean;
};

const RadioGroup = ({ label, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-0.5 h-max">
      {label && (
        <Label htmlFor={props.name} required={props.required}>
          {label}
        </Label>
      )}
      <Radio.Group {...props} buttonStyle="solid" />
    </div>
  );
};

export default RadioGroup;
