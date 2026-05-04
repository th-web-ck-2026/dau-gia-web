import { Col as AntCol } from "antd";
import styled from "styled-components";

export const Col = styled(AntCol)`
  font-size: unset;

  &.ant-col-md-5 {
    flex: 0 0 20%;
    max-width: 20%;
  }
`;
