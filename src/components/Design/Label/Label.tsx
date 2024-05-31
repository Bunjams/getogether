import classNames from "classnames";
import React, { HTMLAttributes } from "react";

const Label = ({
  htmlFor,
  required = false,
  className,
  ...props
}: HTMLAttributes<HTMLLabelElement> & {
  htmlFor?: string;
  required?: boolean;
}) => (
  <label
    className={classNames(
      "text-footnote text-neutral-600",
      {
        "after:font-bold after:text-red-600 after:content-['_*'] after:text-h4 after:leading-3 after:-ml-1":
          required,
      },
      className
    )}
    htmlFor={htmlFor}
    {...props}
  />
);

export default Label;
