import { CurrentUserContext } from "components/Context/CurrentUser";
import { NotificationContext } from "components/Context/Notification";
import { useContext } from "react";

export const useToast = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useToast must be used within a NotificationProvider");
  }
  return { ...context, alert: context.error };
};

export const useCurrentUser = () => {
  const { user } = useContext(CurrentUserContext);

  if (!user) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }

  return user;
};
