import { BadgeProps } from "antd";
import { DefaultTheme } from "styled-components";

import { NotificationType } from "@/components/common/base-notification";
import { COLOR_TYPE_LOOKUP, Priority } from "@/styles/theme.constants";
import { ColorType, Severity } from "@/styles/theme.types";

type Breakpoints = keyof DefaultTheme["breakpoints"];

const units = "px";
const normalize = <T extends string | number>(value: T) =>
  typeof value === "string" ? value : (`${value}${units}` as const);

export const normalizeProp = (
  prop: string | number | readonly number[] | readonly string[]
): string => {
  if (typeof prop == "number" || typeof prop == "string") {
    return normalize(prop);
  }
  return prop.map(normalize).join(" ");
};

export const colorTypeFrom = (
  value:
    | Priority
    | Severity
    | NotificationType
    | BadgeProps["status"]
    | undefined
): ColorType => COLOR_TYPE_LOOKUP[value as keyof typeof COLOR_TYPE_LOOKUP];

export const media =
  <T extends Breakpoints>(breakpoint: T) =>
  ({ theme }: { readonly theme: DefaultTheme }) =>
    `width >= ${normalize(theme.breakpoints[breakpoint])}` as const;

export const mediaMax =
  <T extends Breakpoints>(breakpoint: T) =>
  ({ theme }: { readonly theme: DefaultTheme }) =>
    `width < ${normalize(theme.breakpoints[breakpoint])}` as const;

export const mediaRange =
  <Lower extends Breakpoints, Upper extends Breakpoints>(
    lower: Lower,
    upper: Upper
  ) =>
  ({ theme }: { readonly theme: DefaultTheme }) =>
    `${normalize(theme.breakpoints[lower])} <= width < ${normalize(
      theme.breakpoints[upper]
    )}` as const;

export const shadeColor = (color: string, percent: number): string => {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = parseInt(((R * (100 + percent)) / 100).toString());
  G = parseInt(((G * (100 + percent)) / 100).toString());
  B = parseInt(((B * (100 + percent)) / 100).toString());

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  const RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  const GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  const BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
};

export const hexToRGB = (hex: string): string => {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  return `${r}, ${g}, ${b}`;
};
