import React, { createContext, useReducer } from "react";
import { initialUserDialogState, userDialogReducer } from "./reducer";
import {
  openDialogAction,
  closeDialogAction,
  setFieldsAction,
} from "./actions";

export const UserDialogContext = createContext();

export const UserDialogProvider = ({ children }) => {
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

  const setFields = (fields) => {
    dispatch(setFieldsAction(fields));
  };

  return (
    <UserDialogContext.Provider
      value={{
        isOpen: state.isOpen,
        fields: state.fields,
        userId: state.userId,
        openDialog,
        closeDialog,
        setFields,
      }}
    >
      {children}
    </UserDialogContext.Provider>
  );
};
