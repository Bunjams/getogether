import { Input as AntInput, InputProps } from "antd";
import Label from "../Label/Label";

type Props = InputProps & {
  label?: string;
};

const Input = ({ label, size = "middle", ...rest }: Props) => {
  return (
    <span className="relative block w-full">
      {label && (
        <Label htmlFor={rest.name} required={rest.required}>
          {label}
        </Label>
      )}
      <AntInput {...rest} size={size} />
    </span>
  );
};

export default Input;
