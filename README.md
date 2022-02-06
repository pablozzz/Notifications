Application demo is deployed here: "https://pablozzz.github.io/Notifications/"

Application run: please use commands : "npm run install" -> "npm run start"

## Solution description:

Global notification system in React implemented on typescript via Material UI Framework.

All logic implemented inside Notification's context (src/contexts/NotificationsContext.tsx). This context provides API for access to the Notification System:

1. <NotificationsProvider> Application part that going to use notifications should be wrapped inside provider

```
<NotificationsProvider>
  <Main />
</NotificationsProvider>
```

2. Methods to setup Notifications context settings and show/close notifications.

#### There is short methods description below

`showNotification` -> display notification. See Notifications object description below.

`closeNotification` -> close notification by id. There is auto hide notification enabled by default, so no need to use this method directly

`setAutoCloseTimeout` -> Uses to set notifications auto hide timeout in seconds. Default is set to 5 seconds.

`setNotificationsLimit` -> Uses to set how many notifications can be displayed in one time. By default is set to "4".

`setScreenPosition` -> Uses to set notifications container position. Possible variants: top right (default), top left, bottom left and bottom right.

#### Notification object:

`id?` -> unique Id for notification (set automatically inside context)

`text` -> notification text

`title` -> notification title

`type` -> type of notification. Possible variants: 'success', 'error', 'info', 'warning'

`autoClose` -> auto hide notification, enabled by default

`callback` -> callback function that will be called on the notification close event

#### There is hook to use Notifications System inside React components (src/hooks/useNotifications.ts):

```
// use hooks example
const { showNotification } = useNotifications();

// show notification example
showNotification({
  title: "some title",
  text: "some text",
  type: "success"
})
```

## Next steps:

1. Localization integration (I would like to use react-i18next library).
2. Unit test integration.
3. Implement dialog windows (one or more buttons to ask user about actions).
