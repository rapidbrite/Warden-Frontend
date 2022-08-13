import { snackbarActions } from "../actions/snackbarActions";
const initState = {
  snackbarOpen: false,
  snackbarMessage: "",
  snackbarVariant: "",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case snackbarActions.SET_SNACKBAR:
      return {
        ...state,
        snackbarOpen: action.snackbarOpen,
        snackbarMessage: action.snackbarMessage,
        snackbarVariant: action.snackbarVariant,
      };
    default:
      return state;
  }
};

export default reducer;
