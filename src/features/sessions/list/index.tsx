"use client";

import React, { useEffect, useState } from "react";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

import {
  ClockCircleOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import {
  BaseButton,
  BaseCard,
  BaseCol,
  BaseEmpty,
  BaseInput,
  BaseRow,
  BaseSelect,
  BaseSpin,
  BaseTabs,
  BaseTag,
  Option,
} from "@/components/common";
import { TrangThaiPhien } from "@/interfaces/tender";

import { useSessionList } from "./index.hooks";
import * as S from "./index.styles";
import {
  calculateTimeLeft,
  formatCurrency,
  formatTimeLeft,
} from "./index.utils";

// Self-updating Countdown component to keep list rendering efficient
function SessionCountdown({
  targetDate,
  onEnded,
}: {
  targetDate: string;
  onEnded?: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));
  const t = (key: string) => {
    const map: Record<string, string> = {
      days: "d",
      hours: "h",
      minutes: "m",
      seconds: "s",
      ended: "Ended",
    };
    return map[key] || key;
  };

  useEffect(() => {
    if (timeLeft.ended) return;

    const timer = setInterval(() => {
      const next = calculateTimeLeft(targetDate);
      setTimeLeft(next);
      if (next.ended) {
        clearInterval(timer);
        onEnded?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, timeLeft.ended, onEnded]);

  const isUrgent = !timeLeft.ended && timeLeft.days === 0 && timeLeft.hours < 2;

  return (
    <S.CountdownContainer $isUrgent={isUrgent}>
      <ClockCircleOutlined />
      <span>{formatTimeLeft(timeLeft, t)}</span>
    </S.CountdownContainer>
  );
}

export default function SessionListFeature() {
  const router = useRouter();
  const locale = useLocale();
  const {
    t,
    activeTab,
    handleTabChange,
    search,
    setSearch,
    status,
    setStatus,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    handleFilter,
    tenders,
    auctions,
    isLoading,
  } = useSessionList();

  const getStatusTag = (statusVal: TrangThaiPhien) => {
    switch (statusVal) {
      case TrangThaiPhien.MO:
        return <BaseTag color="green">{t("statusOpen")}</BaseTag>;
      case TrangThaiPhien.CONG_BO:
        return <BaseTag color="blue">{t("statusPublished")}</BaseTag>;
      case TrangThaiPhien.DONG:
        return <BaseTag color="red">{t("statusClosed")}</BaseTag>;
      case TrangThaiPhien.HUY:
        return <BaseTag color="default">{t("statusCanceled")}</BaseTag>;
      default:
        return <BaseTag color="orange">{t("statusDraft")}</BaseTag>;
    }
  };

  return (
    <S.Container>
      <S.HeaderSection>
        <S.Title>{t("title")}</S.Title>
        <S.Subtitle>
          Hệ thống Đấu thầu & Đấu giá trực tuyến uy tín, minh bạch
        </S.Subtitle>
      </S.HeaderSection>

      <S.FilterBox>
        <BaseRow gutter={[16, 16]} align="middle">
          <BaseCol xs={24} md={8}>
            <BaseInput
              prefix={<SearchOutlined />}
              placeholder={t("filterSearch")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onPressEnter={handleFilter}
            />
          </BaseCol>
          <BaseCol xs={24} md={6}>
            <BaseSelect
              placeholder={t("filterStatus")}
              value={status || undefined}
              onChange={(val) => setStatus(val as string)}
              style={{ width: "100%" }}
              allowClear
            >
              <Option value={TrangThaiPhien.MO}>{t("statusOpen")}</Option>
              <Option value={TrangThaiPhien.CONG_BO}>
                {t("statusPublished")}
              </Option>
              <Option value={TrangThaiPhien.DONG}>{t("statusClosed")}</Option>
              <Option value={TrangThaiPhien.HUY}>{t("statusCanceled")}</Option>
            </BaseSelect>
          </BaseCol>
          <BaseCol xs={12} md={4}>
            <BaseInput
              type="number"
              placeholder={t("filterMinPrice")}
              value={minPrice ?? ""}
              onChange={(e) =>
                setMinPrice(e.target.value ? Number(e.target.value) : null)
              }
              onPressEnter={handleFilter}
            />
          </BaseCol>
          <BaseCol xs={12} md={4}>
            <BaseInput
              type="number"
              placeholder={t("filterMaxPrice")}
              value={maxPrice ?? ""}
              onChange={(e) =>
                setMaxPrice(e.target.value ? Number(e.target.value) : null)
              }
              onPressEnter={handleFilter}
            />
          </BaseCol>
          <BaseCol xs={24} md={2}>
            <BaseButton
              type="primary"
              icon={<FilterOutlined />}
              onClick={handleFilter}
              block
            >
              {t("filterBtn")}
            </BaseButton>
          </BaseCol>
        </BaseRow>
      </S.FilterBox>

      <BaseTabs
        activeKey={activeTab}
        onChange={handleTabChange}
        items={[
          {
            key: "tender",
            label: t("tenderTab"),
            children: isLoading ? (
              <div style={{ textAlign: "center", padding: "3rem" }}>
                <BaseSpin size="large" />
              </div>
            ) : tenders.length === 0 ? (
              <BaseEmpty description={t("noSessions")} />
            ) : (
              <S.Grid>
                {tenders.map((tender) => (
                  <S.CardWrapper key={tender._id}>
                    <BaseCard bordered={false}>
                      <S.CardHeader>
                        <S.CardTitle>{tender.tieuDe}</S.CardTitle>
                        {getStatusTag(tender.trangThai)}
                      </S.CardHeader>

                      <SessionCountdown targetDate={tender.thoiGianKetThuc} />

                      <S.InfoRow>
                        <span className="label">{t("maxBudget")}</span>
                        <span className="value price">
                          {formatCurrency(tender.giaToiDa, locale)}
                        </span>
                      </S.InfoRow>

                      <S.InfoRow>
                        <span className="label">{t("criteriaWeight")}</span>
                        <span className="value">
                          {tender.trongSoKyThuat}% KT / {tender.trongSoGia}% G
                        </span>
                      </S.InfoRow>

                      <S.FooterAction>
                        <BaseButton
                          type="primary"
                          onClick={() =>
                            router.push(`/${locale}/sessions/${tender._id}`)
                          }
                        >
                          {t("viewDetail")}
                        </BaseButton>
                      </S.FooterAction>
                    </BaseCard>
                  </S.CardWrapper>
                ))}
              </S.Grid>
            ),
          },
          {
            key: "auction",
            label: t("auctionTab"),
            children: isLoading ? (
              <div style={{ textAlign: "center", padding: "3rem" }}>
                <BaseSpin size="large" />
              </div>
            ) : auctions.length === 0 ? (
              <BaseEmpty description={t("noSessions")} />
            ) : (
              <S.Grid>
                {auctions.map((auction) => (
                  <S.CardWrapper key={auction._id}>
                    <BaseCard bordered={false}>
                      <S.CardHeader>
                        <S.CardTitle>{auction.tieuDe}</S.CardTitle>
                        {getStatusTag(auction.trangThai)}
                      </S.CardHeader>

                      <SessionCountdown targetDate={auction.thoiGianKetThuc} />

                      <S.InfoRow>
                        <span className="label">{t("currentPrice")}</span>
                        <span className="value price">
                          {formatCurrency(auction.giaHienTai, locale)}
                        </span>
                      </S.InfoRow>

                      <S.InfoRow>
                        <span className="label">{t("startingPrice")}</span>
                        <span className="value">
                          {formatCurrency(auction.giaKhoiDiem, locale)}
                        </span>
                      </S.InfoRow>

                      <S.InfoRow>
                        <span className="label">{t("priceStep")}</span>
                        <span className="value">
                          +{formatCurrency(auction.buocGia, locale)}
                        </span>
                      </S.InfoRow>

                      <S.FooterAction>
                        <BaseButton
                          type="primary"
                          onClick={() =>
                            router.push(`/${locale}/sessions/${auction._id}`)
                          }
                        >
                          {t("viewDetail")}
                        </BaseButton>
                      </S.FooterAction>
                    </BaseCard>
                  </S.CardWrapper>
                ))}
              </S.Grid>
            ),
          },
        ]}
      />
    </S.Container>
  );
}
