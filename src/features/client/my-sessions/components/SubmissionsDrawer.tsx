"use client";

import React, { useState } from "react";

import { useTranslations } from "next-intl";

import {
  BaseButton,
  BaseDrawer,
  BasePopconfirm,
  BaseSelect,
  BaseSpace,
  BaseTable,
} from "@/components/common";
import { LoaiPhien, TrangThaiPhien } from "@/constants";
import {
  useCloseAuctionSession,
  useCloseTenderSession,
  useGetAuctionBids,
  useGetTenderSubmissions,
} from "@/features/client/my-sessions/index.hooks";
import * as S from "@/features/client/my-sessions/index.styles";
import {
  SelectedSession,
  getDrawerAuctionColumns,
  getDrawerTenderColumns,
  getErrorMessage,
} from "@/features/client/my-sessions/index.utils";
import { useFeedback } from "@/hooks/common";
import { formatNumber } from "@/utils/number";

interface SubmissionsDrawerProps {
  open: boolean;
  onClose: () => void;
  session: SelectedSession | null;
  onSuccess: () => void;
}

const SubmissionsDrawer: React.FC<SubmissionsDrawerProps> = ({
  open,
  onClose,
  session,
  onSuccess,
}) => {
  const t = useTranslations("mySessionsPage");
  const tCommon = useTranslations("common");
  const [selectedWinnerId, setSelectedWinnerId] = useState<string | undefined>(
    undefined
  );
  const { message } = useFeedback();

  const sessionId = session?.id || "";
  const isAuction = session?.type === LoaiPhien.DAU_GIA;
  const isOpen = session?.status === TrangThaiPhien.MO;

  const { data: auctionBidsRes, isLoading: loadingBids } = useGetAuctionBids(
    sessionId,
    {
      enabled: open && isAuction,
    }
  );

  const { data: tenderSubmissionsRes, isLoading: loadingSubmissions } =
    useGetTenderSubmissions(sessionId, { enabled: open && !isAuction });

  const closeAuctionMutation = useCloseAuctionSession();
  const closeTenderMutation = useCloseTenderSession();

  const handleCloseAuction = async () => {
    try {
      await closeAuctionMutation.mutateAsync(sessionId);
      message.success(t("closeSuccess"));
      onSuccess();
      onClose();
    } catch (err) {
      message.error(getErrorMessage(err) || t("closeAuctionError"));
    }
  };

  const handleCloseTender = async () => {
    try {
      await closeTenderMutation.mutateAsync({
        id: sessionId,
        winnerSubmissionId: selectedWinnerId,
      });
      message.success(t("closeSuccess"));
      onSuccess();
      onClose();
    } catch (err) {
      message.error(getErrorMessage(err) || t("closeTenderError"));
    }
  };

  const bidsData = auctionBidsRes?.data || [];
  const submissionsData = tenderSubmissionsRes?.data || [];

  const minScore = session?.minTechnicalScore || 50;
  const qualifiedSubmissions = submissionsData.filter(
    (sub) => (sub.diemKyThuat || 0) >= minScore
  );

  const auctionColumns = getDrawerAuctionColumns(t);
  const tenderColumns = getDrawerTenderColumns(t);

  return (
    <BaseDrawer
      title={
        isAuction
          ? t("drawerBidsTitle", { title: session?.title || "" })
          : t("drawerSubmissionsTitle", { title: session?.title || "" })
      }
      placement="right"
      width={750}
      onClose={onClose}
      open={open}
      destroyOnClose
    >
      {isOpen && (
        <S.WinnerSection>
          <S.WinnerHeader>{t("closeSessionSettings")}</S.WinnerHeader>
          {isAuction ? (
            <BaseSpace>
              <span>{t("closeAuctionDesc")}</span>
              <BasePopconfirm
                title={t("closeConfirm")}
                onConfirm={handleCloseAuction}
                okText={tCommon("confirm")}
                cancelText={tCommon("cancel")}
              >
                <BaseButton
                  type="primary"
                  danger
                  loading={closeAuctionMutation.isPending}
                >
                  {t("closeBtn")}
                </BaseButton>
              </BasePopconfirm>
            </BaseSpace>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <span>{t("closeTenderDesc")}</span>
              <S.DrawerOptionLabelWrapper>
                <BaseSelect
                  placeholder={t("selectWinnerPlaceholder")}
                  style={{ flex: 1 }}
                  value={selectedWinnerId}
                  onChange={(val) => setSelectedWinnerId(val as string)}
                  allowClear
                  options={qualifiedSubmissions.map((sub) => ({
                    value: sub._id,
                    label: `${sub.nguoiThamGia?.fullname || t("anonymousBidder")} (${t("priceLabel")}: ${formatNumber(sub.giaDeXuat)} đ - ${t("totalScoreLabel")}: ${(sub.diemTongHop || 0).toFixed(1)})`,
                  }))}
                />
                <BasePopconfirm
                  title={t("closeConfirm")}
                  onConfirm={handleCloseTender}
                  okText={tCommon("confirm")}
                  cancelText={tCommon("cancel")}
                >
                  <BaseButton
                    type="primary"
                    danger
                    loading={closeTenderMutation.isPending}
                  >
                    {t("closeBtn")}
                  </BaseButton>
                </BasePopconfirm>
              </S.DrawerOptionLabelWrapper>
            </div>
          )}
        </S.WinnerSection>
      )}

      {isAuction ? (
        <BaseTable
          dataSource={bidsData}
          columns={auctionColumns}
          rowKey="_id"
          loading={loadingBids}
          locale={{ emptyText: t("emptyBids") }}
          pagination={{ pageSize: 10 }}
        />
      ) : (
        <BaseTable
          dataSource={submissionsData}
          columns={tenderColumns}
          rowKey="_id"
          loading={loadingSubmissions}
          locale={{ emptyText: t("emptySubmissions") }}
          pagination={{ pageSize: 10 }}
        />
      )}
    </BaseDrawer>
  );
};

export default SubmissionsDrawer;
