import { useContext, useRef } from "react";
import { UserDialogContext } from "./userDialogContextProvider";
export const useUserDialogContext = () => {
  const context = useContext(UserDialogContext);
  console.log(context);
  if (!context) {
    throw new Error(
      "useUserDialogContext must be used within a UserDialogProvider"
    );
  }
  return context;
};
