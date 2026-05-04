import { Rate as AntdRate } from "antd";
import styled from "styled-components";

export const Rate = styled(AntdRate)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;
