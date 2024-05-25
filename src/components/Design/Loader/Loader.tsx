import { Spin, SpinProps } from "antd";
import React from "react";

const Loader = (props: SpinProps) => {
  return <Spin {...props} />;
};

export default Loader;
