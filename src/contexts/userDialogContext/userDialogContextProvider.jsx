import React, { createContext, useReducer } from "react";
import { initialUserDialogState, userDialogReducer } from "./reducer";
import {
  openDialogAction,
  closeDialogAction,
  setLoadingAction,
  setFieldsAction,
  showNotificationAction,
} from "./actions";
import { useNotifications } from "../notifications/useNotifications";

export const UserDialogContext = createContext();

export const UserDialogProvider = ({ children }) => {
  const { showNotification } = useNotifications();

  const [state, dispatch] = useReducer(
    userDialogReducer,
    initialUserDialogState
  );

  const openDialog = (userId, fields = []) => {
    dispatch(openDialogAction({ userId, fields }));
  };

  const closeDialog = () => {
    dispatch(closeDialogAction());
  };

  const setLoading = (isLoading) => {
    dispatch(setLoadingAction(isLoading));
  };

  const setFields = (fields) => {
    dispatch(setFieldsAction(fields));
  };

  const setNotification = (notification) => {
    dispatch(showNotificationAction(notification));
    showNotification(notification.message, { ...notification });
  };
  return (
    <UserDialogContext.Provider
      value={{
        isOpen: state.isOpen,
        fields: state.fields,
        userId: state.userId,
        openDialog,
        closeDialog,
        setLoading,
        setFields,
        setNotification,
      }}
    >
      {children}
    </UserDialogContext.Provider>
  );
};
