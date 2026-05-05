import { DefaultTheme } from "styled-components";
import { colorTypeFrom } from "./theme.utils";
import { resetCss } from "./theme.reset";

export const getGlobalStyles = (theme: DefaultTheme) => `
  ${resetCss}

  :root {
    color-scheme: light dark;
  }

  html,
  body {
    height: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }

  body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  main {
    flex: 1 0 auto;
    background: #fff;
  }

  [data-no-transition] * {
    transition: none !important;
  }

  button,
  input {
    font-family: ${theme?.fontFamilies?.main}, sans-serif;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${theme.primary};
    border-radius: 1.25rem;
  }

  .ant-menu-vertical {
    .ant-menu-item {
      .ant-menu-title-content {
        a {
          font-size: ${theme.fontSizes.md};
          color: ${theme.textMain};

          &:hover,
          :active {
            color: ${theme.primary6};
          }
        }
      }
    }
    .ant-menu-item-selected {
      .ant-menu-title-content {
        a {
          color: inherit;
        }
      }
    }
  }

  .ant-tooltip {
    .ant-tooltip-content {
      .ant-tooltip-inner {
        min-width: 30px;
        min-height: 32px;
        padding: 8px 12px !important;
        font-size: ${theme.fontSizes.xxs};
      }
    }
  }

  .ant-notification {
    ${(["info", "success", "warning", "error"] as const)
      .map(
        (notification) => `
          .ant-notification-notice-${notification} {
            border: 1px solid ${theme[colorTypeFrom(notification)]};
            background: ${theme.notification[colorTypeFrom(notification)]};
          }
        `
      )
      .join("")}

    @media (max-width: ${theme.breakpoints.sm}px) {
      .ant-notification-notice {
        width: calc(100vw - 2rem);
      }
    }
  }

  .ant-message {
    @media (max-width: ${theme.breakpoints.sm}px) {
      .ant-message-notice-content {
        max-width: calc(100vw - 2rem);
        font-size: ${theme.fontSizes.xs};
      }
    }
  }
`;
