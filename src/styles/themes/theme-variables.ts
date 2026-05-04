import "styled-components";

import { ThemeInterface } from "../theme.types";
import { lightColorsTheme } from "./light/index";

export const themeObject = {
  light: lightColorsTheme,
} as const;

type Merge<A> = { [K in keyof A]: A[K] };

declare module "styled-components" {
  export interface DefaultTheme extends Merge<typeof lightColorsTheme> {
    theme: ThemeInterface;
  }
}
