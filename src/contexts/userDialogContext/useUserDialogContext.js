import { useContext } from "react";
import { UserDialogContext } from "./userDialogContextProvider";
export const useUserDialogContext = () => {
  const context = useContext(UserDialogContext);
  try {
    if (!context) {
      return {
        isOpen: false,
        fields: [],
        userId: null,
        openDialog: () => {},
        closeDialog: () => {},
        setLoading: () => {},
        setFields: () => {},
        setNotification: () => {},
      };
    }
  } catch (error) {
    console.log(error.message);
  }

  return context;
};
