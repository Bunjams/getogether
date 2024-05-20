import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

import { Button, Result } from "antd";
import { ResultStatusType } from "antd/es/result";
import React from "react";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const error = useRouteError() as Error;

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  const errorText = error.data;
  const errorStatus = error.status as ResultStatusType;

  return (
    <Result
      status={errorStatus}
      title="404"
      subTitle={`Sorry, ${errorText}`}
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default ErrorPage;
