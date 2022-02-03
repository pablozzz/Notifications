// providers
import { NotificationsProvider } from "./contexts/NotificationsContext";
// components
import Main from "./pages/Main.tsx";

export default function App() {
  return (
    <NotificationsProvider>
      <Main />
    </NotificationsProvider>
  );
}
