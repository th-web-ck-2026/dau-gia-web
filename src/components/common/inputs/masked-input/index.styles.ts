import AntdMaskedInput from "antd-mask-input";
import styled from "styled-components";

export const MaskedInput = styled(AntdMaskedInput)`
  font-family: inherit;
  color: ${({ theme }) => theme.textMain};
  background-color: ${({ theme }) => theme.backgroundColorBase};
  padding: 11.4px 11px;
  border: 1px solid ${({ theme }) => theme.borderBase};
  border-radius: ${({ theme }) => theme.borderRadius.xxxs};

  &::placeholder {
    color: ${({ theme }) => theme.inputPlaceholder};
  }
`;
