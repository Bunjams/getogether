import {
  Button as AntButton,
  Avatar as AntAvatar,
  ButtonProps,
  AvatarProps,
} from "antd";
import React from "react";

type ShimmerProps = {
  Button: ButtonProps;
  Avatar: AvatarProps;
};

const Button = (props: ShimmerProps["Button"]) => {
  return (
    <AntButton
      className="animate-pulse bg-slate-200 rounded w-32"
      type="text"
      disabled
      {...props}
    />
  );
};

const Avatar = (props: ShimmerProps["Avatar"]) => {
  return (
    <AntAvatar className="animate-pulse bg-slate-200 rounded-full" {...props} />
  );
};

const Shimmer = { Button, Avatar };

export default Shimmer;
