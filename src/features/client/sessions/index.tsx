"use client";

import React from "react";

import { useSearchParams } from "next/navigation";

import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Slider } from "antd";

import { BaseButton } from "@/components/common/base-button";
import { BaseEmpty } from "@/components/common/base-empty";
import { BaseInput } from "@/components/common/base-input";
import { BasePagination } from "@/components/common/base-pagination";
import { BaseRadio } from "@/components/common/base-radio";
import ClientBreadCrumb from "@/components/features/client/bread-crumb";
import { TrangThaiPhien } from "@/constants";
import { LoaiPhien } from "@/constants/scoring";
import AuctionCardSkeleton from "@/features/client/home/card/skeleton/AuctionCardSkeleton";
import { formatCurrency } from "@/utils/common";

import SessionCard from "./components/SessionCard";
import * as S from "./index.styles";
import useClientSessions from "./index.utils";

const SessionsListContent: React.FC = () => {
  const {
    activeTab,
    items,
    tSessions,
    tStatus,
    search,
    setSearch,
    trangThai,
    setTrangThai,
    priceRange,
    setPriceRange,
    page,
    limit,
    sessions,
    total,
    isLoading,
    isError,
    handleTabChange,
    handlePageChange,
    handleResetFilters,
  } = useClientSessions();

  const isAuction = activeTab === LoaiPhien.DAU_GIA;
  const defaultPriceRange: [number, number] = [0, 10000000000];
  const activePriceRange = priceRange || defaultPriceRange;

  const handlePriceChange = (val: number | number[]) => {
    if (Array.isArray(val) && val.length === 2) {
      setPriceRange([val[0], val[1]]);
    }
  };

  return (
    <S.SessionsContainer>
      <ClientBreadCrumb items={items} />

      <S.ContentRoot>
        <S.ContentWrapper>
          <S.MainLayout>
            <S.FilterPanel>
              <S.FilterTitle>{tSessions("title")}</S.FilterTitle>

              <S.FilterSection>
                <S.FilterSectionTitle>
                  {tSessions("searchPlaceholder")}
                </S.FilterSectionTitle>
                <BaseInput
                  placeholder={tSessions("searchPlaceholder")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  prefix={<SearchOutlined />}
                  allowClear
                />
              </S.FilterSection>

              {isAuction && (
                <S.FilterSection>
                  <S.FilterSectionTitle>
                    {tSessions("filterPrice")}
                  </S.FilterSectionTitle>
                  <Slider
                    range
                    min={0}
                    max={10000000000}
                    step={10000000}
                    value={activePriceRange}
                    onChange={handlePriceChange}
                    tooltip={{ formatter: (val) => formatCurrency(val || 0) }}
                  />
                  <S.PriceLabelRow>
                    <span>{formatCurrency(activePriceRange[0])}</span>
                    <span>{formatCurrency(activePriceRange[1])}</span>
                  </S.PriceLabelRow>
                </S.FilterSection>
              )}

              <S.FilterSection>
                <S.FilterSectionTitle>
                  {tSessions("filterStatus")}
                </S.FilterSectionTitle>
                <BaseRadio.Group
                  value={trangThai}
                  onChange={(e) => setTrangThai(e.target.value)}
                >
                  <S.RadioStack>
                    <BaseRadio value={undefined}>
                      {tSessions("statusAll")}
                    </BaseRadio>
                    <BaseRadio value={TrangThaiPhien.MO}>
                      {tStatus("MO")}
                    </BaseRadio>
                    <BaseRadio value={TrangThaiPhien.CONG_BO}>
                      {tStatus("CONG_BO")}
                    </BaseRadio>
                    <BaseRadio value={TrangThaiPhien.DONG}>
                      {tStatus("DONG")}
                    </BaseRadio>
                  </S.RadioStack>
                </BaseRadio.Group>
              </S.FilterSection>

              <BaseButton
                type="default"
                icon={<ReloadOutlined />}
                onClick={handleResetFilters}
                style={{ width: "100%" }}
              >
                {tSessions("clearFilters")}
              </BaseButton>
            </S.FilterPanel>

            <S.ResultsSection>
              <S.TabContainer>
                <S.TabButton
                  $active={activeTab === LoaiPhien.DAU_GIA}
                  onClick={() => handleTabChange(LoaiPhien.DAU_GIA)}
                >
                  {tSessions("tabAuction")}
                </S.TabButton>
                <S.TabButton
                  $active={activeTab === LoaiPhien.DAU_THAU}
                  onClick={() => handleTabChange(LoaiPhien.DAU_THAU)}
                >
                  {tSessions("tabTender")}
                </S.TabButton>
              </S.TabContainer>

              <S.ResultsInfoRow>
                <span>{tSessions("resultsCount", { count: total })}</span>
              </S.ResultsInfoRow>

              {isLoading ? (
                <S.GridContainer>
                  {Array.from({ length: limit }).map((_, i) => (
                    <AuctionCardSkeleton key={i} />
                  ))}
                </S.GridContainer>
              ) : isError ? (
                <S.CenteredContainer>
                  <BaseEmpty description={tSessions("errorLoad")} />
                </S.CenteredContainer>
              ) : sessions.length === 0 ? (
                <S.CenteredContainer>
                  <BaseEmpty description={tSessions("noData")} />
                </S.CenteredContainer>
              ) : (
                <>
                  <S.GridContainer>
                    {sessions.map((session) => (
                      <SessionCard
                        key={session._id}
                        type={activeTab}
                        data={session}
                      />
                    ))}
                  </S.GridContainer>

                  <S.PaginationWrapper>
                    <BasePagination
                      current={page}
                      pageSize={limit}
                      total={total}
                      onChange={handlePageChange}
                      showSizeChanger={false}
                    />
                  </S.PaginationWrapper>
                </>
              )}
            </S.ResultsSection>
          </S.MainLayout>
        </S.ContentWrapper>
      </S.ContentRoot>
    </S.SessionsContainer>
  );
};

const SessionsList: React.FC = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || LoaiPhien.DAU_GIA;
  return <SessionsListContent key={tab} />;
};

export default SessionsList;
