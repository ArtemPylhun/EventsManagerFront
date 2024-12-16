import { memo } from "react";
import { Snackbar, Alert } from "@mui/material";

const NotificationsSnackbar = memo(({ notifications, closeNotification }) => {
  const handleClose = (key) => () => {
    closeNotification(key);
  };

  return (
    <>
      {notifications.map((notif) => (
        <Snackbar
          key={notif.key}
          open={true}
          autoHideDuration={notif.autoHideDuration || 4000}
          onClose={handleClose(notif.key)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose(notif.key)}
            severity={notif.severity || "info"}
            sx={{ width: "100%" }}
          >
            {notif.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
});

export default NotificationsSnackbar;
