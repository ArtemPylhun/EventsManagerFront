import { useContext } from "react";
import { NotificationsContext } from "./NotificationsProvider";
export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    console.log("notifications context must be user inside of its provider");
  }
  return context;
};
