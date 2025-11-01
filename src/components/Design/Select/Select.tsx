import React from "react";
import Label from "../Label/Label";
import { Radio, Select as AntSelect, Space } from "antd";
import type { SelectProps } from "antd";

type Props = SelectProps & {
  label?: string;
  name?: string;
  required?: boolean;
};

const Select = ({ label, size = "middle", ...rest }: Props) => {
  return (
    <span className="relative block w-full">
      {label && (
        <Label htmlFor={rest.name} required={rest.required}>
          {label}
        </Label>
      )}
      <AntSelect {...rest} size={size} style={{ width: "100%" }} />
    </span>
  );
};

export default Select;
