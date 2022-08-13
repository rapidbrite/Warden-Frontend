export const snackbarActions = {
    SET_SNACKBAR: "SET_SNACKBAR",
  };
  
  export const getSnackbarActions = (dispatch) => {
    return {
      setSnackbar: (snackbarOpen, snackbarMessage, snackbarVariant) =>
        dispatch(setSnackbar(snackbarOpen, snackbarMessage, snackbarVariant)),
    };
  };
  
  export const setSnackbar = (snackbarOpen, snackbarMessage, snackbarVariant) => {
    return {
      type: snackbarActions.SET_SNACKBAR,
      snackbarOpen,
      snackbarMessage,
      snackbarVariant,
    };
  };
  