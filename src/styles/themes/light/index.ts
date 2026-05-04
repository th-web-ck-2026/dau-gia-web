import {
  BASE_COLORS,
  BORDER_RADIUS,
  BREAKPOINTS,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  HEIGHTS,
  MARGINS,
  PADDINGS,
} from "@/styles/theme.constants";
import type { ThemeInterface } from "@/styles/theme.types";
import { hexToRGB } from "@/styles/theme.utils";

const colorTypes = {
  primary: "#1f3aa0",
  success: "#30AF5B",
  warning: "#FFB155",
  error: "#ef4444",
  info: "#3B82F6",
};

const indexedPrimaries = {
  primary1: "#f0f4ff",
  primary2: "#d6e3ff",
  primary3: "#b3c8ff",
  primary4: "#7aa3ff",
  primary5: "#006AE9",
  primary6: "#2849D0",
  primary7: "#1f3aa0",
  primary8: "#172b70",
  primary9: "#0e1c40",
  primary10: "#050d10",
};

const background = BASE_COLORS.white;

const rgb = Object.fromEntries(
  Object.entries({
    ...colorTypes,
    ...indexedPrimaries,
    background,
  } satisfies ThemeInterface["rgb"]).map(([key, hexColor]) => [
    key,
    hexToRGB(hexColor),
  ])
) as ThemeInterface["rgb"];

export const lightColorsTheme = {
  ...indexedPrimaries,
  ...colorTypes,
  ...BASE_COLORS,
  rgb,

  background,
  secondaryBackground: "#F8FBFF",
  backgroundColorBase: "#ffffff",
  layoutBodyBg: "#f9fafb",
  backgroundSecondary: "#F9FAFB",
  backgroundQuaterary: "#E5E7EB",
  backgroundTeriary: "#f3f4f6",
  backgroundBrand: "#1A3F75",
  backgroundBrand50: "#FDF1F1",
  backgroundBrand100: "#F8DADA",
  backgroundBrand900: "#001733",
  layoutHeaderBg: "#ffffff",
  layoutSiderBg: "#ffffff",
  siderBackground: "#ffffff",
  collapseBackground: "rgb(214, 58, 58)",
  tertiaryBg: "#EEF1F6",
  bgBrandSubtle: "#EBF4FF",
  bgSuccess50: "#ECFDF3",
  bgWarning50: "#FFFBEB",
  bgError50: "#FEF2F2",
  bgGray50: "#F9FAFC",
  blue200: "#BFDBFE",
  blue50: "#EFF6FF",
  white20: "rgba(255, 255, 255, 0.2)",
  white70: "rgba(255, 255, 255, 0.70)",
  brand700: "#941A1A",

  textMain: "#000",
  textLight: "#9A9B9F",
  textSecondary: BASE_COLORS.white,
  textQuaternary: "#6B6C70",
  textBrand: "#1A3F75",
  textDark: "#404040",
  textSiderPrimary: "#006AE9",
  textWhite: "#FFFFFFB2",
  textSiderSecondary: "#ffffff",
  textLink: "#3B82F6",
  subText: "#4A5565",
  heading: "#3C3C3C",
  inputPlaceholder: "#A6A6A6",
  breadcrumb: "rgba(0, 0, 0, 0.45)",
  textTertiary: "#4E4F53",
  textSenary: "#8F9196",
  textSecondarys: "#374151",
  textError: "#EF4444",
  error50: "#FEF2F2",
  error100: "#FEE2E2",
  error600: "#DC2626",
  textTabDisable: "#D1D5DB",
  success200: "#A9EFC5",
  warning50: "#FFFBEB",
  warning200: "#FDE68A",
  error200: "#FECACA",
  gray200: "#D6DAE1",
  success700: "#067647",
  success500: "#17B26A",
  warning500: "#F59E0B",
  warning700: "#B45309",
  error700: "#B91C1C",
  gray700: "#373D4E",

  border: "#E5E7EB",
  borderBase: "#E5E7EB",
  borderTertiary: "#F3F4F6",
  boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.07)",
  boxShadowHover: "0 4px 16px 0 rgba(0, 0, 0, 0.2)",
  radioBoxShadow: `0 0 0 3px rgba(${rgb.primary}, 0.12)`,
  modalBoxShadow:
    "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
  borderCheckBox: "#D1D5DB",
  borderPagination: "#F1F1F1",

  split: "#f0f0f0",
  sliderFillColor: "#e1e1e1",
  itemHoverBg: "#EBF4FF",
  avatarBg: "#ccc",
  icon: "#a9a9a9",
  iconHover: "#006AE9",

  successBg: "#e1f0e4",
  successBorder: "#a1d6ad",
  disabled: "rgba(0, 0, 0, 0.25)",
  disabledBg: "#c5d3e0",
  selectionDisabled: "#bfbfbf",

  notification: {
    primary: "#E6F4FF",
    success: "#F6FFED",
    warning: "#FFFBE6",
    error: "#FFF2F0",
    info: "#f0f7ff",
  },

  fontSizes: FONT_SIZE,
  fontWeights: FONT_WEIGHT,
  fontFamilies: FONT_FAMILY,

  heights: HEIGHTS,
  breakpoints: BREAKPOINTS,
  borderRadius: BORDER_RADIUS,
  margins: MARGINS,
  paddings: PADDINGS,

  iconBrand: "#3D95FF",
} as const satisfies ThemeInterface;
