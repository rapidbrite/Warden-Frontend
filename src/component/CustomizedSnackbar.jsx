import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { connect } from "react-redux";
import { getSnackbarActions } from "../store/actions/snackbarActions";
import "../scss/snackbar.scss";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbars = ({ setSnackbar, snackbar }, props) => {
  // const { vertical, horizontal, open } = state;
  const vertical = "bottom";
  const horizontal = "right";
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false, "", "");
  };



  return (
    <Stack spacing={2}>
      <Snackbar
        open={snackbar.snackbarOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}

      >
        <Alert
          className={`${snackbar.snackbarVariant === "success" ? "snackbar_success" : "snackbar_error"}`}
          onClose={handleClose}
          severity={
            snackbar.snackbarVariant === "success" ? "success" : "error"
          }

        >
          {snackbar.snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack >
  );
};

const mapStateToProps = (snackbar) => {
  return {
    ...snackbar,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getSnackbarActions(dispatch),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(CustomizedSnackbars);
