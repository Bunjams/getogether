import { Input as AntInput, InputProps } from "antd";
import Label from "../Label/Label";

type Props = InputProps & {
  label?: string;
};

const Input = ({ label, size = "middle", ...props }: Props) => {
  return (
    <span className="relative block w-full">
      {label && (
        <Label htmlFor={props.name} required={props.required}>
          {label}
        </Label>
      )}
      <AntInput {...props} size={size} />
    </span>
  );
};

export default Input;
