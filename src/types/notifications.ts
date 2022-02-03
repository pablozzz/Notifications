export enum NotificationTypes {
  Info = "info",
  Error = "error",
  Warning = "warning",
  Success = "success"
}

export interface INotification {
  id?: string;
  text: string;
  title: string;
  type: NotificationTypes;
  autoClose?: boolean;
  callback?: () => void;
}

export interface INotificationsState {
  notifications: INotification[];
  autoCloseTimeout: number;
  limit: number;
  error: any | null;
  screenPosition: Positions;
}

export interface INotificationsContext extends INotificationsState {
  showNotification: (notification: INotification) => void;
  closeNotification: (id: string) => void;
  setAutoCloseTimeout: (timeout: number) => void;
  setNotificationsLimit: (limit: number) => void;
  setScreenPosition: (position: Positions) => void;
}

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Positions {
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left"
}
