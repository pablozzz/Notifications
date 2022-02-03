import { ReactNode } from "react";
// material
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";
// components
import Page from "../components/Page";

export default function StandalonePage({
  children,
  pageTitle = "Notification system"
}: {
  children: ReactNode;
  pageTitle?: string;
}) {
  const RootStyle = styled(Page)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh"
  }));

  return (
    <RootStyle title={pageTitle}>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {children}
      </Container>
    </RootStyle>
  );
}
