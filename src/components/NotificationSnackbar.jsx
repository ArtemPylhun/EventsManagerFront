import React, { memo } from "react";
import { Snackbar, Alert } from "@mui/material";

const NotificationSnackbar = memo(({ open, onClose, notification }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
  >
    <Alert
      onClose={onClose}
      severity={notification.severity}
      sx={{ width: "100%" }}
    >
      {notification.message}
    </Alert>
  </Snackbar>
));

export default NotificationSnackbar;
