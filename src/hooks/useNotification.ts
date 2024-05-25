import { NotificationContext } from "components/Context/Notification";
import { useContext } from "react";

export const useToast = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useToast must be used within a NotificationProvider");
  }
  return { ...context, alert: context.error };
};
