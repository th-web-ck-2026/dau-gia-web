import styled from "styled-components";

import { BaseFlex } from "../base-flex";

export const ErrorContainer = styled(BaseFlex)`
  min-height: 100vh;
  width: 100%;
  padding: 24px;
  background: ${({ theme }) => theme.background || "#ffffff"};
`;

export const DevStackTrace = styled.pre`
  max-height: 200px;
  overflow-y: auto;
  text-align: left;
  background: ${({ theme }) => theme.bgError50 || "#FEF2F2"};
  padding: 16px;
  border-radius: 8px;
  font-size: 12px;
  font-family: monospace;
  color: ${({ theme }) => theme.textError || "#EF4444"};
  border: 1px solid ${({ theme }) => theme.error200 || "#FECACA"};
  white-space: pre-wrap;
  word-break: break-all;
`;
