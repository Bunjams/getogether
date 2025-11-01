import { jwtDecode } from "jwt-decode";

export const useTokenDecode = () => {
  const getDecodedHeader = ({ token }: { token?: string }) => {
    if (token) {
      const decodedHeader = jwtDecode(token);
      return decodedHeader;
    }
  };
  return { getDecodedHeader };
};
