import { Skeleton } from "antd";
import styled from "styled-components";

const SkeletonWrapper = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  aspect-ratio: 4/3;
  position: relative;

  .ant-btn.ant-skeleton-button {
    width: 100%;
    height: 100%;
    border-radius: 0;
    display: block;
  }
`;

const KeyAssetCardSkeleton = () => (
  <SkeletonWrapper>
    <Skeleton.Button active block style={{ height: "100%", borderRadius: 0 }} />
  </SkeletonWrapper>
);

export default KeyAssetCardSkeleton;
