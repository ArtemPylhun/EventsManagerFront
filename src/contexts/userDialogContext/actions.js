export const UserDialogActionTypes = {
  OPEN_DIALOG: "OPEN_DIALOG",
  CLOSE_DIALOG: "CLOSE_DIALOG",
  SET_FIELDS: "SET_FIELDS",
};

export const openDialogAction = (payload) => ({
  type: UserDialogActionTypes.OPEN_DIALOG,
  payload,
});

export const closeDialogAction = () => ({
  type: UserDialogActionTypes.CLOSE_DIALOG,
});

export const setFieldsAction = (fields) => ({
  type: UserDialogActionTypes.SET_FIELDS,
  payload: fields,
});
