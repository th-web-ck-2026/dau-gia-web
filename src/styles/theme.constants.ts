import {
  ColorType,
  FontWeights,
  NamedColors,
  NamedIndexes,
  RelativeSizes,
} from "./theme.types";

export enum Priority {
  INFO,
  LOW,
  MEDIUM,
  HIGH,
}

export const BORDER_RADIUS = {
  xxxxs: "0.375rem",
  xxxs: "0.5rem",
  xxs: "0.75rem",
  xs: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  xxl: "1.5rem",
  xxxl: "1.625rem",
  xxxxl: "2rem",
} satisfies Partial<RelativeSizes>;

export const BASE_COLORS = {
  white: "#ffffff",
  black: "#000000",
  green: "#008000",
  orange: "#ffb155",
  gray: "#808080",
  lightgray: "#c5d3e0",
  violet: "#ee82ee",
  lightgreen: "#89dca0",
  pink: "#ffc0cb",
  blue: "#0000ff",
  skyblue: "#35a0dc",
  red: "#ff5252",
} satisfies Partial<NamedColors>;

export const COLOR_TYPE_LOOKUP = {
  ["default"]: "primary",
  ["info"]: "info",
  ["mention"]: "primary",
  ["processing"]: "primary",
  ["undefined"]: "primary",
  [Priority.INFO]: "primary",

  ["success"]: "success",
  [Priority.LOW]: "success",

  ["warning"]: "warning",
  [Priority.MEDIUM]: "warning",

  ["error"]: "error",
  [Priority.HIGH]: "error",
} as const satisfies Record<string, ColorType>;

export const LAYOUT = {
  mobile: {
    headerHeight: "3.5rem",
  },
  desktop: {
    headerHeight: "5rem",
    headerHeightAdmin: "4.5rem",
  },
} as const;

export const FONT_FAMILY = {
  main: "var(--font-sf-pro)",
  secondary: "Lato",
  bePro: "var(--font-be-vietnam-pro)",
  inter: "var(--font-inter)",
} satisfies Partial<NamedIndexes>;

export const FONT_SIZE = {
  xxxs: "0.5rem",
  xxs: "0.75rem",
  xs: "0.875rem",
  sm: "0.9375rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  xxl: "1.5rem",
  xxxl: "1.75rem",
  xxxxl: "2rem",
} satisfies Partial<RelativeSizes>;

export const FONT_WEIGHT = {
  thin: 100,
  extraLight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
} satisfies Partial<FontWeights>;

export const HEIGHTS = {
  xxxxs: "0.875rem",
  xxxs: "1rem",
  xxs: "1.5rem",
  xs: "2rem",
  sm: "2.5rem",
  md: "3rem",
  lg: "3.125rem",
  xxl: "4rem",
} satisfies Partial<RelativeSizes>;

export const BREAKPOINTS = {
  xs: 360,
  sm: 568,
  md: 768,
  lg: 992,
  xl: 1280,
  xxl: 1920,
} satisfies Partial<RelativeSizes>;

export const MARGINS = {
  xs: "0.5rem",
  sm: "0.625rem",
  md: "1rem",
  lg: "1.25rem",
  xl: "1.875rem",
  xxl: "2rem",
  xxxl: "2.5rem",
} satisfies Partial<RelativeSizes>;

export const PADDINGS = {
  xxxxs: "0.25rem",
  xxxs: "0.5rem",
  xxs: "0.75rem",
  xs: "0.9375rem",
  sm: "1rem",
  md: "1.25rem",
  lg: "1.5rem",
  xl: "2.25rem",
  xxl: "2.5rem",
} satisfies Partial<RelativeSizes>;

export const MODAL_SIZES = {
  xs: "400px",
  md: "600px",
  xl: "800px",
} satisfies Partial<RelativeSizes>;
