import { useEffect } from "react";
import { INotification, Positions } from "../types/notifications";
// material
import { Box, Grid, useTheme, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// hooks
import useNotifications from "hooks/useNotifications";
// types
import { NotificationTypes } from "types/notifications";
// icons
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

interface INotificationProps extends INotification {
  position?: Positions;
}

const NotificationWrapper = styled(Box)(({ theme }) => ({
  minWidth: 300,
  padding: theme.spacing(0.5),
  borderRadius: theme.spacing(0.5)
}));

export default function Notification({
  id,
  text,
  title,
  type,
  autoClose = true,
  position = Positions.TopRight
}: INotificationProps) {
  const theme = useTheme();
  const { closeNotification, autoCloseTimeout } = useNotifications();

  useEffect(() => {
    if (id && autoClose) {
      const timer = setTimeout(() => {
        closeNotification(id);
      }, autoCloseTimeout);
      return () => clearTimeout(timer);
    }
  }, []);

  const renderIconByType = (type: NotificationTypes) => {
    const fillColor = theme.palette[type].main;
    switch (type) {
      case NotificationTypes.Error:
        return <CancelOutlinedIcon style={{ color: fillColor }} />;
      case NotificationTypes.Info:
        return <InfoOutlinedIcon style={{ color: fillColor }} />;
      case NotificationTypes.Success:
        return <CheckCircleOutlineIcon style={{ color: fillColor }} />;
      case NotificationTypes.Warning:
        return <ErrorOutlineOutlinedIcon style={{ color: fillColor }} />;
    }
  };

  return (
    // @ts-ignore
    <NotificationWrapper
      sx={{
        border: (theme) => `2px solid ${theme.palette[type].main}`,
        backgroundColor: (theme) => `${theme.palette[type].lighter}`
      }}
    >
      <Grid container direction="row" spacing={1}>
        <Grid item xs={1} sm={0.75} md={0.5}>
          {renderIconByType(type)}
        </Grid>
        <Grid item xs={10} sm={10.5} md={11}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: (theme) => theme.typography.fontWeightBold }}
          >
            {title}
          </Typography>
          <Typography variant="body2">{text}</Typography>
        </Grid>
        <Grid
          item
          xs={1}
          sm={0.75}
          md={0.5}
          sx={{ cursor: "pointer" }}
          textAlign="end"
          onClick={() => id && closeNotification(id)}
        >
          <CloseOutlinedIcon />
        </Grid>
      </Grid>
    </NotificationWrapper>
  );
}
