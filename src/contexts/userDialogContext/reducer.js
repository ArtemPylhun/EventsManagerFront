import { UserDialogActionTypes } from "./actions";

export const initialUserDialogState = {
  isOpen: false,
  fields: [],
  userId: null,
};

export const userDialogReducer = (state = initialUserDialogState, action) => {
  switch (action.type) {
    case UserDialogActionTypes.OPEN_DIALOG:
      return {
        ...state,
        isOpen: true,
        fields: action.payload.fields || [],
        userId: action.payload.userId || null,
      };
    case UserDialogActionTypes.CLOSE_DIALOG:
      return { ...state, isOpen: false, fields: [] };
    case UserDialogActionTypes.SET_FIELDS: {
      const dynamicUserForm = action.payload.reduce((form, field) => {
        form[field] = state.userForm[field] || "";
        return form;
      }, {});
      return {
        ...state,
        fields: action.payload,
        userForm: dynamicUserForm,
      };
    }
    default:
      return state;
  }
};
