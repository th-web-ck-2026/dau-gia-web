import React from "react";

import BidderIcon from "@/assets/svg/bidder";

import * as S from "./index.styles";

interface WrapperSectionProps {
  title: string;
  viewAllUrl?: string;
  viewAllLabel?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const WrapperSection = ({
  title,
  viewAllUrl,
  viewAllLabel,
  icon = <BidderIcon />,
  children,
}: WrapperSectionProps) => (
  <S.SectionContainer>
    <S.SectionHeader>
      <S.SectionTitleGroup>
        {icon}
        <S.SectionTitle>{title}</S.SectionTitle>
      </S.SectionTitleGroup>
      {viewAllUrl && viewAllLabel && (
        <S.ViewAllLink href={viewAllUrl}>{viewAllLabel}</S.ViewAllLink>
      )}
    </S.SectionHeader>
    <S.SectionContent>{children}</S.SectionContent>
  </S.SectionContainer>
);

export default WrapperSection;
