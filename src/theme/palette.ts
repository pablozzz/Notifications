declare module "@mui/material/styles/createPalette" {
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

export enum PaletteColors {
  Info = "info",
  Success = "success",
  Warning = "warning",
  Error = "error"
}

// SETUP COLORS
const INFO = {
  lighter: "#E5F4FA",
  light: "#E5F4FA" /* need to set */,
  main: "#1A9CD5",
  dark: "#1A9CD5" /* need to set */,
  darker: "#1A9CD5" /* need to set */
};

const SUCCESS = {
  lighter: "#E5F9F4",
  light: "#E5F9F4" /* need to set */,
  main: "#1EC7A0",
  dark: "#1EC7A0" /* need to set */,
  darker: "#1EC7A0" /* need to set */
};

const WARNING = {
  lighter: "#FFF7E8",
  light: "#FFF7E8" /* need to set */,
  main: "#FFB825",
  dark: "#FFB825" /* need to set */,
  darker: "#FFB825" /* need to set */
};

const ERROR = {
  lighter: "#FDEDF0",
  light: "#FDEDF0" /* need to set */,
  main: "#F05C74",
  dark: "#F05C74" /* need to set */,
  darker: "#F05C74" /* need to set */
};

const COMMON = {
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR }
};

const palette = {
  ...COMMON
};

export default palette;
