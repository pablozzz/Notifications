import { createContext, useReducer, useRef, ReactNode } from "react";
// components
import Notification from "../components/Notification";
// material
import { Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme, useMediaQuery } from "@mui/material";
// types
import {
  INotificationsContext,
  INotificationsState,
  ActionMap,
  INotification,
  Positions
} from "../types/notifications";
// utils
import { v4 as uuid } from "uuid";

const DEFAULT_MAXIMAL_NOTIFICATIONS_LIMIT = 4; // use to set limit of notifications in one time
const DEFAULT_AUTO_CLOSE_TIMEOUT = 5 * 1000; // use to set default auto close timeout
const DEFAULT_SCREEN_POSITION = Positions.TopRight; // use to set default screen positions for notifications container

const NotificationsWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  zIndex: 1000 /* Need to unsure that maximal Z-index set cross the app */
}));

const initialState: INotificationsState = {
  notifications: [],
  autoCloseTimeout: DEFAULT_AUTO_CLOSE_TIMEOUT,
  limit: DEFAULT_MAXIMAL_NOTIFICATIONS_LIMIT,
  screenPosition: DEFAULT_SCREEN_POSITION,
  error: null
};

enum ActionTypes {
  SetNotifications = "SET_NOTIFICATIONS",
  SetAutoCloseTimeout = "SET_AUTO_CLOSE_TIMEOUT",
  SetScreenPosition = "SET_SCREEN_POSITION",
  SetLimit = "SET_LIMIT",
  ResetState = "RESET_STATE"
}

type NotificationsPayload = {
  [ActionTypes.SetNotifications]: {
    notifications: INotification[];
  };
  [ActionTypes.SetAutoCloseTimeout]: {
    timeout: number;
  };
  [ActionTypes.SetLimit]: {
    limit: number;
  };
  [ActionTypes.SetScreenPosition]: {
    position: Positions;
  };
  [ActionTypes.ResetState]: undefined;
};

type NotificationsActions =
  ActionMap<NotificationsPayload>[keyof ActionMap<NotificationsPayload>];

const reducer = (state: INotificationsState, action: NotificationsActions) => {
  if (action.type === ActionTypes.SetNotifications) {
    const { notifications } = action.payload;
    return {
      ...state,
      notifications
    };
  }
  if (action.type === ActionTypes.SetAutoCloseTimeout) {
    const { timeout } = action.payload;
    return {
      ...state,
      timeout
    };
  }
  if (action.type === ActionTypes.SetLimit) {
    const { limit } = action.payload;
    return {
      ...state,
      limit
    };
  }
  if (action.type === ActionTypes.SetScreenPosition) {
    const { position } = action.payload;
    return {
      ...state,
      position
    };
  }
  if (action.type === ActionTypes.ResetState) {
    return initialState;
  }
  return state;
};

const NotificationsContext = createContext<INotificationsContext | null>(null);

function NotificationsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true });

  const notificationsRef = useRef(state.notifications);
  notificationsRef.current = state.notifications;

  const showNotification = (notification: INotification) => {
    let notificationsClone = [...state.notifications];
    notificationsClone.push({
      ...notification,
      id: uuid().slice(0, 8) // we need to have unique id for each notification
    });

    dispatch({
      type: ActionTypes.SetNotifications,
      payload: { notifications: notificationsClone }
    });
  };

  const closeNotification = (id: string) => {
    /*
     * this function used inside setTimeout if notification has autoClose
     * that is why we need to bind in to current state by ref
     * */
    const notificationsClone = [...notificationsRef.current];
    const notification = notificationsClone.find(
      (notification) => notification.id === id
    );

    // call callback function on close if exists
    if (notification && typeof notification.callback === "function") {
      notification.callback();
    }

    dispatch({
      type: ActionTypes.SetNotifications,
      payload: {
        notifications: notificationsClone.filter(
          (notification) => notification.id !== id
        )
      }
    });
  };

  const setAutoCloseTimeout = (timeout: number) => {
    dispatch({
      type: ActionTypes.SetAutoCloseTimeout,
      payload: {
        timeout: timeout * 1000 // cast seconds to milliseconds
      }
    });
  };

  const setNotificationsLimit = (limit: number) => {
    dispatch({
      type: ActionTypes.SetLimit,
      payload: {
        limit
      }
    });
  };

  const setScreenPosition = (position: Positions) => {
    dispatch({
      type: ActionTypes.SetScreenPosition,
      payload: {
        position
      }
    });
  };

  const getNotificationsContainerPosition = () => {
    /*
     * On mobile notifications should be on the top of the screen
     * to avoid overlap with UI control buttons
     */
    if (isMobile) {
      return { top: 0, left: "unset", right: 0, bottom: "unset" };
    }

    switch (state.screenPosition) {
      case Positions.TopRight:
        return { top: 0, left: "unset", right: 0, bottom: "unset" };
      case Positions.TopLeft:
        return { top: 0, left: 0, right: "unset", bottom: "unset" };
      case Positions.BottomLeft:
        return { top: "unset", left: 0, right: "unset", bottom: 0 };
      case Positions.BottomRight:
        return { top: "unset", left: "unset", right: 0, bottom: 0 };
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        ...state,
        showNotification,
        closeNotification,
        setAutoCloseTimeout,
        setNotificationsLimit,
        setScreenPosition
      }}
    >
      {children}
      <NotificationsWrapper sx={{ ...getNotificationsContainerPosition() }}>
        <Stack spacing={1}>
          {state.notifications
            .slice(isMobile ? -2 : -state.limit)
            .map((notification) => (
              <Notification key={notification.id} {...notification} />
            ))}
        </Stack>
      </NotificationsWrapper>
    </NotificationsContext.Provider>
  );
}

export { NotificationsContext, NotificationsProvider };
