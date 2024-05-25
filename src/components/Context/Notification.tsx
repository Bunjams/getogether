import { NotificationInstance } from "antd/es/notification/interface";
import useNotification from "antd/es/notification/useNotification";
import React, { ReactNode, createContext } from "react";

export type NotificationContextType = NotificationInstance;

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, context] = useNotification();

  return (
    <NotificationContext.Provider value={{ ...notifications }}>
      {children}
      {context}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
