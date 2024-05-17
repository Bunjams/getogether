import React from "react";

const Button = () => {
  return <button className="animate-pulse h-10 w-20 bg-slate-500 rounded" />;
};

const Img = () => {
  return (
    <div
      className="animate-pulse h-10 w-10 bg-slate-500 rounded-full"
      role="img"
    />
  );
};

const Shimmer = { Button, Img };

export default Shimmer;
