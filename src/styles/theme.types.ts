import type { Breakpoint } from "antd";
import type { PresetColorKey } from "antd/es/theme/interface";
import type * as CSS from "csstype";

type IndexedPrimary = `primary${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}`;

export type IndexedPrimaries = Record<IndexedPrimary, string>;

export type ThemeType = "light" | "dark";

export type Dimension = number | string;

export type Severity = "success" | "error" | "info" | "warning";

export type NamedColors = Record<
  CSS.DataType.NamedColor | PresetColorKey,
  string
>;

export type ColorType = "primary" | "success" | "warning" | "error" | "info";

type ColorTypes = Record<ColorType, string>;

type RGB = Record<ColorType | IndexedPrimary | "background", string>;

export type FontWeights = Record<
  | "thin"
  | "extraLight"
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "extraBold"
  | "black",
  number
>;

export type NamedIndexes = Record<
  "main" | "secondary" | "tertiary" | "quaternary" | "bePro" | "inter",
  string
>;

export enum WidthCategory {
  small = "xs",
  medium = "md",
  large = "xl",
}

export type WidthCategories =
  | Record<WidthCategory, number>
  | Record<WidthCategory, string>
  | Record<WidthCategory, readonly number[]>
  | Record<WidthCategory, readonly string[]>;

export type RelativeSizeKey =
  | Breakpoint
  | `${"xx" | "xxx" | "xxxx"}${"s" | "l"}`;

export type RelativeSizes =
  | Record<RelativeSizeKey, number>
  | Record<RelativeSizeKey, string>;

export interface ThemeInterface
  extends ColorTypes, IndexedPrimaries, Partial<NamedColors> {
  background: string;
  secondaryBackground: string;
  backgroundColorBase: string;
  backgroundSecondary: string;
  backgroundQuaterary: string;
  backgroundTeriary: string;
  backgroundBrand: string;
  backgroundBrand50: string;
  backgroundBrand100: string;
  backgroundBrand900: string;
  layoutBodyBg: string;
  layoutHeaderBg: string;
  layoutSiderBg: string;
  siderBackground: string;
  collapseBackground: string;
  tertiaryBg: string;
  bgBrandSubtle: string;
  bgSuccess50: string;
  bgWarning50: string;
  bgError50: string;
  bgGray50: string;
  blue200: string;
  blue50: string;
  white70: string;
  white20: string;
  brand700: string;

  textMain: string;
  textLight: string;
  textSecondary: string;
  textQuaternary: string;
  textBrand: string;
  textDark: string;
  textWhite: string;
  textSiderPrimary: string;
  textSiderSecondary: string;
  textLink: string;
  subText: string;
  heading: string;
  inputPlaceholder: string;
  breadcrumb: string;
  textTertiary: string;
  textSenary: string;
  textSecondarys: string;
  textError: string;
  error50: string;
  error100: string;
  error600: string;
  textTabDisable: string;
  success200: string;
  warning50: string;
  warning200: string;
  error200: string;
  gray200: string;
  success700: string;
  success500: string;
  warning500: string;
  warning700: string;
  error700: string;
  gray700: string;

  border: string;
  borderBase: string;
  borderTertiary: string;
  boxShadow: string;
  boxShadowHover: string;
  radioBoxShadow: string;
  modalBoxShadow: string;
  borderCheckBox: string;
  borderPagination: string;

  split: string;
  sliderFillColor: string;
  itemHoverBg: string;
  avatarBg: string;
  icon: string;
  iconHover: string;

  successBg: string;
  successBorder: string;
  disabled: string;
  disabledBg: string;
  selectionDisabled: string;

  notification: ColorTypes;

  rgb: RGB;

  fontWeights: FontWeights;
  fontFamilies: Partial<NamedIndexes>;
  fontSizes: Partial<RelativeSizes>;

  heights: Partial<RelativeSizes>;
  breakpoints: Partial<RelativeSizes>;
  borderRadius: Partial<RelativeSizes>;
  margins: Partial<RelativeSizes>;
  paddings: Partial<RelativeSizes>;

  iconBrand: string;
}
