import { Skeleton } from "antd";
import styled from "styled-components";

const SkeletonWrapper = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.border};
`;

const SkeletonImageBox = styled.div`
  width: 100%;
  height: 200px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    height: 170px;
  }

  .ant-skeleton-image {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

const SkeletonBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AuctionCardSkeleton = () => (
  <SkeletonWrapper>
    <SkeletonImageBox>
      <Skeleton.Button
        active
        block
        style={{ height: "200px", borderRadius: 0 }}
      />
    </SkeletonImageBox>
    <SkeletonBody>
      <Skeleton active paragraph={{ rows: 3 }} title={{ width: "40%" }} />
    </SkeletonBody>
  </SkeletonWrapper>
);

export default AuctionCardSkeleton;
