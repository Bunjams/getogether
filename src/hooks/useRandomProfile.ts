import { useCurrentUser } from "./useCurrentUser";

export const useRandomProfile = () => {
  const user = useCurrentUser();
  return `https://robohash.org/${user.first_name}.png`;
};
