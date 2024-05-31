import { CurrentUserContext } from "components/Context/CurrentUser";
import { NotificationContext } from "components/Context/Notification";
import { useContext } from "react";

export const useCurrentUser = () => {
  const { user } = useContext(CurrentUserContext);

  if (!user) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }

  return user;
};
