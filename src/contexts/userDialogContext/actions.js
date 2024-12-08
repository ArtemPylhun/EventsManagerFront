export const UserDialogActionTypes = {
  OPEN_DIALOG: "OPEN_DIALOG",
  CLOSE_DIALOG: "CLOSE_DIALOG",
  SET_LOADING: "SET_LOADING",
  SET_FIELDS: "SET_FIELDS",
  SHOW_NOTIFICATION: "SHOW_NOTIFICATION",
  RESET_NOTIFICATION: "RESET_NOTIFICATION",
};

export const openDialogAction = (payload) => ({
  type: UserDialogActionTypes.OPEN_DIALOG,
  payload,
});

export const closeDialogAction = () => ({
  type: UserDialogActionTypes.CLOSE_DIALOG,
});

export const setLoadingAction = (payload) => ({
  type: UserDialogActionTypes.SET_LOADING,
  payload,
});

export const showNotificationAction = (notification) => ({
  type: UserDialogActionTypes.SHOW_NOTIFICATION,
  payload: notification,
});

export const resetNotificationAction = () => ({
  type: UserDialogActionTypes.RESET_NOTIFICATION,
});

export const setFieldsAction = (fields) => ({
  type: UserDialogActionTypes.SET_FIELDS,
  payload: fields,
});
