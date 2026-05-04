import { Tabs as AntdTabs } from "antd";
import styled from "styled-components";

export const Tabs = styled(AntdTabs)`
  .ant-tabs-tab.ant-tabs-tab-disabled {
    color: ${({ theme }) => theme.disabled};
  }

  &.ant-tabs .ant-tabs-tab:not(.ant-tabs-tab-active) {
    .ant-tabs-tab-btn,
    .ant-tabs-tab-remove {
      &:focus-visible {
        color: ${({ theme }) => theme.primary7};
      }
    }
  }
`;
