import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import React from "react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="flex items-center w-full justify-center flex-col gap-2 bg-neutral-0 h-[calc(100vh-16px)]">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    </section>
  );
};

export default NotFound;
