import { useCurrentUserQuery } from "hooks/useCurrentUserQuery";
import { createContext, ReactNode } from "react";
import { User } from "types/model/user";

export const CurrentUserContext = createContext<{ user: User | undefined }>({
  user: undefined,
});

const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useCurrentUserQuery();

  const currentUser = data || {
    first_name: "",
    last_name: "",
    mobile: null,
    email: "",
    profile_url: null,
    uuid: "",
    role: null,
    refresh: [],
    access: "",
    member: {
      member_id: "",
      access_token: "",
      uuid: "",
    },
  };

  return (
    <CurrentUserContext.Provider
      value={{
        user: currentUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
