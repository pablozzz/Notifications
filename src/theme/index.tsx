import { useMemo, ReactNode } from "react";
// material
import { CssBaseline } from "@mui/material";
import { ThemeProvider, ThemeOptions, createTheme } from "@mui/material/styles";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
// theme
import palette from "./palette";
import breakpoints from "./breakpoints";

type ThemeConfigProps = {
  children: ReactNode;
};

export default function ThemeConfig({ children }: ThemeConfigProps) {
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette,
      breakpoints
    }),
    []
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
