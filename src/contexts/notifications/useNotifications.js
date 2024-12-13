import { useContext } from "react";
import { NotificationsContext } from "./NotificationsProvider";
export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  try {
    if (!context) {
      return {
        showNotification: () => {},
        closeNotification: () => {},
      };
    }
  } catch (error) {
    console.log(error.message);
  }
  return context;
};
