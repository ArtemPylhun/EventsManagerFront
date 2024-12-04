import React, { createContext, useState, useCallback, useMemo } from "react";
import NotificationsSnackbar from "../../components/common/NotificationsSnackbar";

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, options = {}) => {
    const key = options.key || Date.now().toString();
    setNotifications((prev) => [...prev, { key, message, ...options }]);
    return key;
  }, []);

  const closeNotification = useCallback((key) => {
    setNotifications((prev) => prev.filter((notif) => notif.key !== key));
  }, []);

  const contextValue = useMemo(
    () => ({ showNotification, closeNotification }),
    [showNotification, closeNotification]
  );

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
      <NotificationsSnackbar
        notifications={notifications}
        closeNotification={closeNotification}
      />
    </NotificationsContext.Provider>
  );
};
