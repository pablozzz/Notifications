// material UI
import { Button, Stack, Box, Tooltip } from "@mui/material";
// layouts
import StandalonePage from "../layouts/StandalonePage";
// hooks
import useNotifications from "../hooks/useNotifications";
// types
import { NotificationTypes } from "../types/notifications";

const EXAMPLE_NOTIFICATION_CONTENT = {
  title: "Lorem ipsum",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
};

export default function Main() {
  const { showNotification } = useNotifications();

  return (
    <StandalonePage>
      <Box
        sx={{
          width: 500,
          height: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <Stack direction="row" spacing={2} width="100%">
            <Tooltip title="This button shows example of Success notification">
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={() =>
                  showNotification({
                    title: EXAMPLE_NOTIFICATION_CONTENT.title,
                    text: EXAMPLE_NOTIFICATION_CONTENT.text,
                    type: NotificationTypes.Success,
                    callback: () => console.log("callback using example")
                  })
                }
              >
                Success
              </Button>
            </Tooltip>

            <Tooltip title="This button shows example of Info notification">
              <Button
                fullWidth
                variant="contained"
                color="info"
                onClick={() =>
                  showNotification({
                    title: EXAMPLE_NOTIFICATION_CONTENT.title,
                    text: EXAMPLE_NOTIFICATION_CONTENT.text,
                    type: NotificationTypes.Info
                  })
                }
              >
                Info
              </Button>
            </Tooltip>
          </Stack>
          <Stack direction="row" spacing={2} width="100%">
            <Tooltip title="This button shows example of Error notification">
              <Button
                fullWidth
                variant="contained"
                color="error"
                onClick={() =>
                  showNotification({
                    title: EXAMPLE_NOTIFICATION_CONTENT.title,
                    text: EXAMPLE_NOTIFICATION_CONTENT.text,
                    type: NotificationTypes.Error
                  })
                }
              >
                Error
              </Button>
            </Tooltip>
            <Tooltip title="This button shows example of Warning notification">
              <Button
                fullWidth
                variant="contained"
                color="warning"
                onClick={() =>
                  showNotification({
                    title: EXAMPLE_NOTIFICATION_CONTENT.title,
                    text: EXAMPLE_NOTIFICATION_CONTENT.text,
                    type: NotificationTypes.Warning
                  })
                }
              >
                Warning
              </Button>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>
    </StandalonePage>
  );
}
