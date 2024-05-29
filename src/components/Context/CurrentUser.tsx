import { createContext, ReactNode } from "react";
import { useGetUserProfileQuery } from "store/api/userProfile";
import { User } from "types/model/user";

export const CurrentUserContext = createContext<{ user: User | undefined }>({
  user: undefined,
});

const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useGetUserProfileQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  return (
    <CurrentUserContext.Provider value={{ user: data }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
