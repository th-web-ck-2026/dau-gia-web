import { styled } from "styled-components";

import { BaseTag } from "@/components/common";
import { TrangThaiPhien } from "@/constants";

export const StyledTag = styled(BaseTag)<{
  $status: TrangThaiPhien;
  $showDot: boolean;
}>`
  && {
    display: inline-flex;
    width: fit-content;
    padding: 4px 8px;
    align-items: center;
    gap: 4px;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    border: none;

    color: ${({ theme, $status }) => {
      switch ($status) {
        case TrangThaiPhien.MO:
          return theme.textSessionInProgress;
        case TrangThaiPhien.CONG_BO:
          return theme.textSessionUpcoming;
        case TrangThaiPhien.DONG:
          return theme.textSessionSuccess;
        case TrangThaiPhien.HUY:
          return theme.textSessionCancel;
        case TrangThaiPhien.NHAP:
        default:
          return theme.textSessionDefault;
      }
    }};

    background-color: ${({ theme, $status }) => {
      switch ($status) {
        case TrangThaiPhien.MO:
          return theme.bgSessionInProgress;
        case TrangThaiPhien.CONG_BO:
          return theme.bgSessionUpcoming;
        case TrangThaiPhien.DONG:
          return theme.bgSessionSuccess;
        case TrangThaiPhien.HUY:
          return theme.bgSessionCancel;
        case TrangThaiPhien.NHAP:
        default:
          return theme.bgSessionDefault;
      }
    }};

    &::before {
      content: "";
      display: ${({ $showDot }) => ($showDot ? "inline-block" : "none")};
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: currentColor;
    }
  }
`;
