"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

import { SessionQueryParams } from "@/api/sessions";
import { BaseEmpty } from "@/components/common";
import { TrangThaiPhien } from "@/constants";
import { SortOrder } from "@/constants";
import { LoaiPhien } from "@/constants/scoring";
import type {
  AuctionSession,
  KeyAssetItem,
  TenderSession,
} from "@/interfaces/sessions";

import AuctionCard from "./card/AuctionCard";
import KeyAssetCard from "./card/KeyAssetCard";
import TenderCard from "./card/TenderCard";
import { CardGrid } from "./card/index.styles";
import AuctionCardSkeleton from "./card/skeleton/AuctionCardSkeleton";
import KeyAssetCardSkeleton from "./card/skeleton/KeyAssetCardSkeleton";
import TenderCardSkeleton from "./card/skeleton/TenderCardSkeleton";
import HeroBanner from "./hero-banner";
import { useGetAuctions, useGetKeyAssets, useGetTenders } from "./index.hooks";
import * as S from "./index.styles";
import { NavigationButtons } from "./index.utils";
import WrapperSection from "./shared/WrapperSection";

const defaultParams: SessionQueryParams = {
  limit: 4,
  condition: {
    trangThai: TrangThaiPhien.MO,
  },
  order: {
    createdAt: SortOrder.DESC,
  },
};

const HomeContent = () => {
  const t = useTranslations("home");
  const t_common = useTranslations("common");
  const [activeTab, setActiveTab] = useState<LoaiPhien>(LoaiPhien.DAU_GIA);

  const {
    data: auctionsData,
    isLoading: isAuctionsLoading,
    isError: isAuctionsError,
  } = useGetAuctions({ ...defaultParams, limit: 4 });
  const {
    data: tendersData,
    isLoading: isTendersLoading,
    isError: isTendersError,
  } = useGetTenders({ ...defaultParams, limit: 3 });
  const {
    data: keyAssetsData,
    isLoading: isKeyAssetsLoading,
    isError: isKeyAssetsError,
  } = useGetKeyAssets({ ...defaultParams, limit: 3 });

  const auctions = auctionsData?.data?.result || [];
  const tenders = tendersData?.data?.result || [];
  const keyAssets = keyAssetsData?.data?.result || [];

  return (
    <S.HomeContainer>
      <HeroBanner />

      <NavigationButtons activeTab={activeTab} onChange={setActiveTab} />

      <S.ContentWrapper>
        {activeTab === LoaiPhien.DAU_GIA && (
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
        )}

        {activeTab === LoaiPhien.DAU_THAU && (
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
        )}

        <WrapperSection
          title={t("keyAssetsSection")}
          viewAllUrl="/key-assets"
          viewAllLabel={t("viewAllKeyAssets")}
        >
          {isKeyAssetsError ? (
            <BaseEmpty description={t_common("errorNotFound")} />
          ) : (
            <CardGrid $columns={3}>
              {isKeyAssetsLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <KeyAssetCardSkeleton key={i} />
                  ))
                : keyAssets.map((item: KeyAssetItem) => (
                    <KeyAssetCard key={item._id} data={item} />
                  ))}
            </CardGrid>
          )}
        </WrapperSection>
      </S.ContentWrapper>
    </S.HomeContainer>
  );
};

export default HomeContent;
