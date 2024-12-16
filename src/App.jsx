import Router from "./router/Router";
import "./App.css";
import { NotificationsProvider } from "./contexts/notifications/NotificationsProvider";

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
