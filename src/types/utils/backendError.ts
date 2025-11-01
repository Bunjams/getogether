export type BackendError = {
  status: number;
  data: {
    success: boolean;
    error: {
      code: string;
      message: string;
    };
  };
};
