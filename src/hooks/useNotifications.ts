import { useContext } from "react";
import { NotificationsContext } from "../contexts/NotificationsContext";

const useNotifications = () => {
  const context = useContext(NotificationsContext);

  if (!context)
    throw new Error(
      "Notifications context must be use inside NotificationsProvider"
    );

  return context;
};

export default useNotifications;
