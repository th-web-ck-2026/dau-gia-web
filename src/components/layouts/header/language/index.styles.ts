import { DownOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { BaseButton } from "@/components/common";

export const LangButton = styled(BaseButton)`
  &.ant-btn-text {
    padding: 0 8px;
    display: flex;
    align-items: center;
    height: 32px;

    &:hover {
      background-color: transparent !important;
    }
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;

  svg {
    display: block;
    width: 20px;
    height: 20px;
  }
`;

export const LangLabel = styled.span<{ $color?: string }>`
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ $color, theme }) => $color || theme.textMain};
  line-height: 1;
`;

export const ChevronIcon = styled(DownOutlined)<{ $isOpen: boolean }>`
  font-size: 10px;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform: rotate(${({ $isOpen }) => ($isOpen ? 180 : 0)}deg);
`;
