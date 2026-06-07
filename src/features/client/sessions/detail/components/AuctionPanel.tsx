"use client";

import React, { useState } from "react";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import {
  InfoCircleOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Form,
  InputNumber,
  Modal,
  Table,
  Tabs,
  message,
} from "antd";

import { BasePagination } from "@/components/common/base-pagination";
import CountdownTimer from "@/components/features/client/countdown-timer";
import ImageGallery from "@/components/features/client/image-gallery";
import RankingSessions from "@/components/features/client/ranking-sessios";
import { TrangThaiPhien } from "@/constants/scoring";
import { User } from "@/interfaces/auth";
import { AuctionSession, UserBid } from "@/interfaces/sessions";

import * as S from "../index.styles";
import {
  AuctionRankingRecord,
  formatDate,
  formatVND,
  getAuctionRankingColumns,
} from "../index.utils";

interface AuctionPanelProps {
  sessionData: AuctionSession;
  statusRes: {
    data?: {
      trangThai: TrangThaiPhien;
      tongSoLuotDat: number;
      giaHienTai: number;
      thoiGianServer: string;
      bietDanhNguoiDanDau?: string;
      giaHopLeKeTiep?: number;
    };
  } | null;
  rankingRes: {
    data?: {
      phienId: string;
      trangThai: TrangThaiPhien;
      danhSach: AuctionRankingRecord[];
    };
  } | null;
  rankingLoading: boolean;
  isAuthenticated: boolean;
  user: User | null | undefined;
  currentStatus: TrangThaiPhien;
  currentPrice: number;
  totalBids: number;
  leadingUserNickname: string;
  minRequiredBid: number;
  placeBidMutation: {
    mutateAsync: (variables: { giaDat: number }) => Promise<unknown>;
    isPending: boolean;
  };
  refetchStatus: () => void;
  refetchRanking: () => void;
  bidHistory: UserBid[];
  refetchBids?: () => void;
  t: (key: string, values?: Record<string, string | number>) => string;
  tStatus: (key: string) => string;
}

export const AuctionPanel: React.FC<AuctionPanelProps> = ({
  sessionData,
  statusRes,
  rankingRes,
  rankingLoading,
  isAuthenticated,
  user,
  currentStatus,
  currentPrice,
  totalBids,
  leadingUserNickname,
  minRequiredBid,
  placeBidMutation,
  refetchStatus,
  refetchRanking,
  bidHistory,
  refetchBids,
  t,
}) => {
  const router = useRouter();
  const tCommon = useTranslations("common");
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const isOwner = isAuthenticated && user?._id === sessionData?.chuPhienId;

  const handleQuickBidClick = (multiplier: number) => {
    const step = sessionData.buocGia || 0;
    const currentInputVal = form.getFieldValue("giaDat");
    const baseVal =
      typeof currentInputVal === "number" && currentInputVal >= minRequiredBid
        ? currentInputVal
        : minRequiredBid;
    const targetVal = baseVal + multiplier * step;
    form.setFieldsValue({ giaDat: targetVal });
  };

  const handleResetBid = () => {
    form.setFieldsValue({ giaDat: minRequiredBid });
  };

  const handleBidSubmit = (values: { giaDat: number }) => {
    Modal.confirm({
      title: t("confirmBid"),
      content: t("confirmBidPrice", { price: formatVND(values.giaDat) }),
      okText: t("confirm"),
      cancelText: t("cancel"),
      onOk: async () => {
        try {
          await placeBidMutation.mutateAsync({ giaDat: values.giaDat });
          message.success(t("bidSuccessMsg"));
          form.resetFields();
          refetchStatus();
          refetchRanking();
          if (refetchBids) refetchBids();
        } catch (err: unknown) {
          const errMsg = err instanceof Error ? err.message : String(err);
          message.error(errMsg || t("bidError"));
        }
      },
    });
  };

  const renderBiddingBox = () => {
    if (isOwner) return null;

    if (currentStatus !== TrangThaiPhien.MO) {
      return (
        <S.RightActionCard>
          <S.ActionCardTitle>
            <InfoCircleOutlined style={{ color: "#EAB308" }} />
            {currentStatus === TrangThaiPhien.CONG_BO
              ? t("statusUpcoming")
              : t("statusClosed")}
          </S.ActionCardTitle>
          <Alert
            message={t("inactiveSessionWarning")}
            type="warning"
            showIcon
          />
        </S.RightActionCard>
      );
    }

    return (
      <S.RightActionCard>
        <S.ActionCardTitle>{t("placeBidNow")}</S.ActionCardTitle>
        <S.ActionCardSubPrice>
          {t("minPrice", { price: formatVND(minRequiredBid) })}
        </S.ActionCardSubPrice>

        {!isAuthenticated ? (
          <S.WarningBox>
            <InfoCircleOutlined style={{ fontSize: 24, color: "#D97706" }} />
            <S.WarningText>{t("loginToBid")}</S.WarningText>
            <S.WarningButtonRow>
              <Button type="primary" onClick={() => router.push("/auth/login")}>
                {t("unauthorized")}
              </Button>
              <Button onClick={() => router.push("/auth/register")}>
                {t("register")}
              </Button>
            </S.WarningButtonRow>
          </S.WarningBox>
        ) : !user?.isVerified ? (
          <S.WarningBox>
            <SafetyCertificateOutlined
              style={{ fontSize: 24, color: "#D97706" }}
            />
            <S.WarningText>{t("verifyToBid")}</S.WarningText>
            <Button type="primary" onClick={() => router.push("/profile")}>
              {t("verifyNow")}
            </Button>
          </S.WarningBox>
        ) : (
          <Form form={form} layout="vertical" onFinish={handleBidSubmit}>
            <Form.Item
              name="giaDat"
              rules={[
                { required: true, message: t("enterBidAmount") },
                {
                  type: "number",
                  min: minRequiredBid,
                  message: t("minBidRequired", {
                    minPrice: formatVND(minRequiredBid),
                  }),
                },
              ]}
              style={{ marginBottom: 12 }}
            >
              <InputNumber
                style={{ width: "100%" }}
                size="large"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                addonAfter={t("vnd")}
                placeholder={t("enterAtLeast", {
                  amount: formatVND(minRequiredBid),
                })}
              />
            </Form.Item>

            <S.BidInputLabel style={{ marginTop: 12, marginBottom: 8 }}>
              {t("quickBid")}
            </S.BidInputLabel>
            <S.QuickBidGrid style={{ marginTop: 0, marginBottom: 16 }}>
              <S.QuickBidButton onClick={() => handleQuickBidClick(1)}>
                +{formatVND(sessionData.buocGia)}
              </S.QuickBidButton>
              <S.QuickBidButton onClick={() => handleQuickBidClick(2)}>
                +{formatVND(sessionData.buocGia * 2)}
              </S.QuickBidButton>
              <S.QuickBidButton onClick={() => handleQuickBidClick(5)}>
                +{formatVND(sessionData.buocGia * 5)}
              </S.QuickBidButton>
              <S.QuickBidButton $isReset onClick={handleResetBid}>
                {tCommon("reset", { defaultValue: "Reset" })}
              </S.QuickBidButton>
            </S.QuickBidGrid>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={placeBidMutation.isPending}
            >
              {t("placeBid")}
            </Button>
          </Form>
        )}
      </S.RightActionCard>
    );
  };

  const columns = getAuctionRankingColumns((key: string) => t(key));
  const rankingList = rankingRes?.data?.danhSach || [];

  const bidHistoryColumns = [
    {
      title: t("stt"),
      key: "stt",
      render: (_: unknown, __: unknown, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
      width: 70,
      align: "center" as const,
    },
    {
      title: t("bidder"),
      key: "bidder",
      render: (_: unknown, record: UserBid) => {
        if (!record.nguoiThamGia) {
          return sessionData.anDanh ? t("bidderAnonymous") : t("noName");
        }
        const isSelf = record.nguoiThamGiaId === user?._id;
        const name = record.nguoiThamGia.fullname || t("participant");
        return isSelf ? t("selfSuffix", { name }) : name;
      },
    },
    {
      title: t("bidPrice"),
      dataIndex: "giaDat",
      key: "giaDat",
      render: (val: number) => formatVND(val),
      align: "right" as const,
    },
    {
      title: t("time"),
      dataIndex: "thoiDiemDat",
      key: "thoiDiemDat",
      render: (val: string) => formatDate(val, "HH:mm:ss DD/MM/YYYY"),
    },
  ];

  return (
    <S.GridContainer>
      <S.LeftCol>
        <S.GalleryCard>
          <ImageGallery images={sessionData.danhSachHinhAnh} />
        </S.GalleryCard>

        {isAuthenticated && (
          <S.LiveLeaderboardCard>
            <S.LeaderboardTitleRow>
              <S.LeaderboardTitle>{t("liveLeaderboard")}</S.LeaderboardTitle>
              <S.LeaderboardParticipantCount>
                {t("participantsCount", { count: rankingList.length })}
              </S.LeaderboardParticipantCount>
            </S.LeaderboardTitleRow>
            <RankingSessions<AuctionRankingRecord>
              data={rankingList}
              columns={columns}
              loading={rankingLoading}
              renderPodiumSubtitle={(item) =>
                t("podiumSubtitle", { price: formatVND(item.giaDat) })
              }
            />
          </S.LiveLeaderboardCard>
        )}

        <S.TabCard>
          <Tabs
            defaultActiveKey="info"
            items={[
              {
                key: "info",
                label: t("assetInfo"),
                children: (
                  <div>
                    <S.TabGrid>
                      <S.TabGridItem>
                        <S.TabGridLabel>{t("totalBids")}</S.TabGridLabel>
                        <S.TabGridValue>
                          {t("bidsCountUnit", { count: totalBids })}
                        </S.TabGridValue>
                      </S.TabGridItem>
                      <S.TabGridItem>
                        <S.TabGridLabel>{t("sessionCode")}</S.TabGridLabel>
                        <S.TabGridValue
                          style={{ fontSize: 15, wordBreak: "break-all" }}
                        >
                          {sessionData._id}
                        </S.TabGridValue>
                      </S.TabGridItem>
                    </S.TabGrid>
                    <div
                      style={{
                        height: 1,
                        background: "#F3F4F6",
                        margin: "16px 0",
                      }}
                    />
                    <h3
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        marginBottom: 12,
                      }}
                    >
                      {t("detailedDescription")}
                    </h3>
                    <S.DescriptionText>
                      {sessionData.moTa || t("noDescription")}
                    </S.DescriptionText>
                  </div>
                ),
              },
              {
                key: "history",
                label: t("bidHistory"),
                children: (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    <Table
                      dataSource={bidHistory.slice(
                        (currentPage - 1) * pageSize,
                        currentPage * pageSize
                      )}
                      columns={bidHistoryColumns}
                      rowKey="_id"
                      size="middle"
                      pagination={false}
                      locale={{ emptyText: t("emptyBidHistory") }}
                    />
                    {bidHistory.length > pageSize && (
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <BasePagination
                          current={currentPage}
                          pageSize={pageSize}
                          total={bidHistory.length}
                          onChange={(page) => setCurrentPage(page)}
                        />
                      </div>
                    )}
                  </div>
                ),
              },
            ]}
          />
        </S.TabCard>
      </S.LeftCol>

      <S.RightCol>
        <S.RightOverviewCard>
          <S.RightCardTitle>{sessionData.tieuDe}</S.RightCardTitle>

          <div>
            <S.RightCardLabel>{t("timeLeft")}</S.RightCardLabel>
            <CountdownTimer
              targetDate={sessionData.thoiGianKetThuc}
              status={currentStatus}
              serverTime={statusRes?.data?.thoiGianServer}
            />
          </div>

          <S.OverviewInfoGrid>
            <S.OverviewInfoBlock>
              <S.OverviewLabel>{t("startPrice")}</S.OverviewLabel>
              <S.OverviewValue>
                {formatVND(sessionData.giaKhoiDiem)}
              </S.OverviewValue>
            </S.OverviewInfoBlock>
            <S.OverviewInfoBlock>
              <S.OverviewLabel>{t("priceStep")}</S.OverviewLabel>
              <S.OverviewValue>
                {formatVND(sessionData.buocGia)}
              </S.OverviewValue>
            </S.OverviewInfoBlock>
            <S.OverviewInfoBlock>
              <S.OverviewLabel>{t("startTime")}</S.OverviewLabel>
              <S.OverviewValue style={{ fontSize: 13 }}>
                {formatDate(sessionData.thoiGianBatDau, "HH:mm - DD/MM/YYYY")}
              </S.OverviewValue>
            </S.OverviewInfoBlock>
            <S.OverviewInfoBlock>
              <S.OverviewLabel>{t("endTime")}</S.OverviewLabel>
              <S.OverviewValue style={{ fontSize: 13 }}>
                {formatDate(sessionData.thoiGianKetThuc, "HH:mm - DD/MM/YYYY")}
              </S.OverviewValue>
            </S.OverviewInfoBlock>
          </S.OverviewInfoGrid>
        </S.RightOverviewCard>

        {currentStatus === TrangThaiPhien.MO && (
          <S.RightLiveStatusCard>
            <S.LiveStatusHeader>{t("liveSessionRunning")}</S.LiveStatusHeader>
            <S.LiveStatusPriceSection>
              <S.LiveStatusPriceLabel>
                {t("highestCurrentPrice")}
              </S.LiveStatusPriceLabel>
              <S.LiveStatusPriceValue>
                {formatVND(currentPrice)}
              </S.LiveStatusPriceValue>
            </S.LiveStatusPriceSection>
            <S.LiveStatusSubGrid>
              <S.LiveStatusSubBlock>
                <S.LiveStatusSubLabel>{t("bids")}</S.LiveStatusSubLabel>
                <S.LiveStatusSubValue>{totalBids}</S.LiveStatusSubValue>
              </S.LiveStatusSubBlock>
              <S.LiveStatusSubBlock>
                <S.LiveStatusSubLabel>{t("leader")}</S.LiveStatusSubLabel>
                <S.LiveStatusSubValue
                  style={{ fontSize: 13, wordBreak: "break-all" }}
                >
                  {leadingUserNickname || t("noLeader")}
                </S.LiveStatusSubValue>
              </S.LiveStatusSubBlock>
            </S.LiveStatusSubGrid>
          </S.RightLiveStatusCard>
        )}

        {renderBiddingBox()}
      </S.RightCol>
    </S.GridContainer>
  );
};
