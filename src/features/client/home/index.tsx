"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

import { BaseEmpty } from "@/components/common";
import { TrangThaiPhien } from "@/constants";
import { SortOrder } from "@/constants";
import { LoaiPhien } from "@/constants/scoring";
import type { AuctionSession, TenderSession } from "@/interfaces/sessions";

import AuctionCard from "./card/AuctionCard";
import TenderCard from "./card/TenderCard";
import { CardGrid } from "./card/index.styles";
import AuctionCardSkeleton from "./card/skeleton/AuctionCardSkeleton";
import TenderCardSkeleton from "./card/skeleton/TenderCardSkeleton";
import HeroBanner from "./hero-banner";
import { useGetAuctions, useGetTenders } from "./index.hooks";
import * as S from "./index.styles";
import { NavigationButtons } from "./index.utils";
import WrapperSection from "./shared/WrapperSection";

const HomeContent = () => {
  const t = useTranslations("client.home");
  const t_common = useTranslations("common");
  const [activeTab, setActiveTab] = useState<LoaiPhien>(LoaiPhien.DAU_GIA);

  const {
    data: auctionsData,
    isLoading: isAuctionsLoading,
    isError: isAuctionsError,
  } = useGetAuctions(
    {
      limit: 4,
      condition: { trangThai: TrangThaiPhien.MO },
      order: { createdAt: SortOrder.DESC },
    },
    { enabled: activeTab === LoaiPhien.DAU_GIA }
  );

  const {
    data: upcomingAuctionsData,
    isLoading: isUpcomingAuctionsLoading,
    isError: isUpcomingAuctionsError,
  } = useGetAuctions(
    {
      limit: 4,
      condition: { trangThai: TrangThaiPhien.CONG_BO },
      order: { createdAt: SortOrder.DESC },
    },
    { enabled: activeTab === LoaiPhien.DAU_GIA }
  );

  const {
    data: successfulAuctionsData,
    isLoading: isSuccessfulAuctionsLoading,
    isError: isSuccessfulAuctionsError,
  } = useGetAuctions(
    {
      limit: 4,
      condition: { trangThai: TrangThaiPhien.DONG },
      order: { createdAt: SortOrder.DESC },
    },
    { enabled: activeTab === LoaiPhien.DAU_GIA }
  );

  const {
    data: tendersData,
    isLoading: isTendersLoading,
    isError: isTendersError,
  } = useGetTenders(
    {
      limit: 3,
      condition: { trangThai: TrangThaiPhien.MO },
      order: { createdAt: SortOrder.DESC },
    },
    { enabled: activeTab === LoaiPhien.DAU_THAU }
  );

  const {
    data: upcomingTendersData,
    isLoading: isUpcomingTendersLoading,
    isError: isUpcomingTendersError,
  } = useGetTenders(
    {
      limit: 3,
      condition: { trangThai: TrangThaiPhien.CONG_BO },
      order: { createdAt: SortOrder.DESC },
    },
    { enabled: activeTab === LoaiPhien.DAU_THAU }
  );

  const {
    data: successfulTendersData,
    isLoading: isSuccessfulTendersLoading,
    isError: isSuccessfulTendersError,
  } = useGetTenders(
    {
      limit: 3,
      condition: { trangThai: TrangThaiPhien.DONG },
      order: { createdAt: SortOrder.DESC },
    },
    { enabled: activeTab === LoaiPhien.DAU_THAU }
  );

  const auctions = auctionsData?.data?.result || [];
  const upcomingAuctions = upcomingAuctionsData?.data?.result || [];
  const successfulAuctions = successfulAuctionsData?.data?.result || [];

  const tenders = tendersData?.data?.result || [];
  const upcomingTenders = upcomingTendersData?.data?.result || [];
  const successfulTenders = successfulTendersData?.data?.result || [];

  return (
    <S.HomeContainer>
      <HeroBanner />

      <NavigationButtons activeTab={activeTab} onChange={setActiveTab} />

      <S.ContentRoot>
        <S.ContentWrapper>
          {activeTab === LoaiPhien.DAU_GIA && (
            <>
              <WrapperSection
                title={t("auctionSection")}
                viewAllUrl="/auction-sessions"
                viewAllLabel={t("viewAllAuctions")}
              >
                {isAuctionsError ? (
                  <BaseEmpty description={t_common("errorNotFound")} />
                ) : (
                  <CardGrid $columns={4}>
                    {isAuctionsLoading
                      ? Array.from({ length: 4 }).map((_, i) => (
                          <AuctionCardSkeleton key={i} />
                        ))
                      : auctions.map((item: AuctionSession) => (
                          <AuctionCard key={item._id} data={item} />
                        ))}
                  </CardGrid>
                )}
              </WrapperSection>

              <WrapperSection
                title={t("upcomingAuctionSection")}
                viewAllUrl="/auction-sessions?status=CONG_BO"
                viewAllLabel={t("viewAllAuctions")}
              >
                {isUpcomingAuctionsError ? (
                  <BaseEmpty description={t_common("errorNotFound")} />
                ) : (
                  <CardGrid $columns={4}>
                    {isUpcomingAuctionsLoading
                      ? Array.from({ length: 4 }).map((_, i) => (
                          <AuctionCardSkeleton key={i} />
                        ))
                      : upcomingAuctions.map((item: AuctionSession) => (
                          <AuctionCard
                            key={item._id}
                            data={item}
                            showBidCount={false}
                          />
                        ))}
                  </CardGrid>
                )}
              </WrapperSection>

              <WrapperSection
                title={t("successfulAuctionSection")}
                viewAllUrl="/auction-sessions?status=DONG"
                viewAllLabel={t("viewAllAuctions")}
              >
                {isSuccessfulAuctionsError ? (
                  <BaseEmpty description={t_common("errorNotFound")} />
                ) : (
                  <CardGrid $columns={4}>
                    {isSuccessfulAuctionsLoading
                      ? Array.from({ length: 4 }).map((_, i) => (
                          <AuctionCardSkeleton key={i} />
                        ))
                      : successfulAuctions.map((item: AuctionSession) => (
                          <AuctionCard key={item._id} data={item} />
                        ))}
                  </CardGrid>
                )}
              </WrapperSection>
            </>
          )}

          {activeTab === LoaiPhien.DAU_THAU && (
            <>
              <WrapperSection
                title={t("tenderSection")}
                viewAllUrl="/tender-sessions"
                viewAllLabel={t("viewAllTenders")}
              >
                {isTendersError ? (
                  <BaseEmpty description={t_common("errorNotFound")} />
                ) : (
                  <CardGrid $columns={3}>
                    {isTendersLoading
                      ? Array.from({ length: 3 }).map((_, i) => (
                          <TenderCardSkeleton key={i} />
                        ))
                      : tenders.map((item: TenderSession) => (
                          <TenderCard key={item._id} data={item} />
                        ))}
                  </CardGrid>
                )}
              </WrapperSection>

              <WrapperSection
                title={t("upcomingTenderSection")}
                viewAllUrl="/tender-sessions?status=CONG_BO"
                viewAllLabel={t("viewAllTenders")}
              >
                {isUpcomingTendersError ? (
                  <BaseEmpty description={t_common("errorNotFound")} />
                ) : (
                  <CardGrid $columns={3}>
                    {isUpcomingTendersLoading
                      ? Array.from({ length: 3 }).map((_, i) => (
                          <TenderCardSkeleton key={i} />
                        ))
                      : upcomingTenders.map((item: TenderSession) => (
                          <TenderCard
                            key={item._id}
                            data={item}
                            showParticipantCount={false}
                          />
                        ))}
                  </CardGrid>
                )}
              </WrapperSection>

              <WrapperSection
                title={t("successfulTenderSection")}
                viewAllUrl="/tender-sessions?status=DONG"
                viewAllLabel={t("viewAllTenders")}
              >
                {isSuccessfulTendersError ? (
                  <BaseEmpty description={t_common("errorNotFound")} />
                ) : (
                  <CardGrid $columns={3}>
                    {isSuccessfulTendersLoading
                      ? Array.from({ length: 3 }).map((_, i) => (
                          <TenderCardSkeleton key={i} />
                        ))
                      : successfulTenders.map((item: TenderSession) => (
                          <TenderCard key={item._id} data={item} />
                        ))}
                  </CardGrid>
                )}
              </WrapperSection>
            </>
          )}
        </S.ContentWrapper>
      </S.ContentRoot>
    </S.HomeContainer>
  );
};

export default HomeContent;
