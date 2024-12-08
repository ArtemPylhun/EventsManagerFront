import Router from "./router/Router";
import "./App.css";
import { NotificationsProvider } from "./contexts/notifications/NotificationsProvider";
import { UserDialogProvider } from "./contexts/userDialogContext/userDialogContextProvider";

function App() {
  return (
    <>
      <NotificationsProvider>
        <Router />
      </NotificationsProvider>
    </>
  );
}

export default App;
