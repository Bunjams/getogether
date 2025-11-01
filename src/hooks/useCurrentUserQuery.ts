import { useGetUserProfileQuery } from "store/api/userProfile";
import { User } from "types/model/user";

export const useCurrentUserQuery = () => {
  let user = JSON.parse(localStorage.getItem("authUser") || "{}") as User;

  const res = useGetUserProfileQuery(
    {},
    { refetchOnMountOrArgChange: true, skip: !user.access }
  );
  return res;
};
