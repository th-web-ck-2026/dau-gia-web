"use client";

import React, { useState } from "react";

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
  Select,
  Table,
  Tabs,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";

import CountdownTimer from "@/components/features/client/countdown-timer";
import ImageGallery from "@/components/features/client/image-gallery";
import RankingSessions from "@/components/features/client/ranking-sessios";
import { TrangThaiPhien } from "@/constants/scoring";
import { User } from "@/interfaces/auth";
import {
  TenderCriteria,
  TenderSession,
  TenderSubmission,
} from "@/interfaces/sessions";

import * as S from "../index.styles";
import {
  TenderRankingRecord,
  formatDate,
  formatVND,
  getTenderRankingColumns,
} from "../index.utils";

interface TenderPanelProps {
  sessionData: TenderSession;
  rankingRes: {
    data?: {
      phienId: string;
      trangThai: TrangThaiPhien;
      danhSach: TenderRankingRecord[];
    };
  } | null;
  rankingLoading: boolean;
  isAuthenticated: boolean;
  user: User | null | undefined;
  currentStatus: TrangThaiPhien;
  hasSubmittedTender: boolean;
  submitProposalMutation: {
    mutateAsync: (variables: {
      giaDeXuat: number;
      giaTriTieuChi: Array<{ tieuChiId: string; giaTriGoc: string | number }>;
    }) => Promise<unknown>;
    isPending: boolean;
  };
  refetchRanking: () => void;
  tenderSubmissions: TenderSubmission[];
  refetchSubmissions?: () => void;
  t: (key: string, values?: Record<string, string | number>) => string;
  tStatus: (key: string) => string;
}

export const TenderPanel: React.FC<TenderPanelProps> = ({
  sessionData,
  rankingRes,
  rankingLoading,
  isAuthenticated,
  user,
  currentStatus,
  hasSubmittedTender,
  submitProposalMutation,
  refetchRanking,
  tenderSubmissions,
  refetchSubmissions,
  t,
}) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isOwner = isAuthenticated && user?._id === sessionData?.chuPhienId;

  const handleProposalSubmit = (
    values: Record<string, string | number | undefined>
  ) => {
    const criteriaValues =
      sessionData.tieuChi
        ?.filter((cri) => {
          const val = values[`criteria_${cri._id}`];
          return val !== undefined && val !== null && val !== "";
        })
        .map((cri) => ({
          tieuChiId: cri._id,
          giaTriGoc: values[`criteria_${cri._id}`]!,
        })) || [];

    Modal.confirm({
      title: t("submitProposal"),
      content: t("submitProposalContent"),
      okText: t("confirmSubmitProposal"),
      cancelText: t("cancel"),
      onOk: async () => {
        try {
          await submitProposalMutation.mutateAsync({
            giaDeXuat: Number(values.giaDeXuat),
            giaTriTieuChi: criteriaValues,
          });
          message.success(t("proposalSuccessMsg"));
          setIsModalOpen(false);
          form.resetFields();
          refetchRanking();
          if (refetchSubmissions) refetchSubmissions();
        } catch (err: unknown) {
          const errMsg = err instanceof Error ? err.message : String(err);
          message.error(errMsg || t("proposalError"));
        }
      },
    });
  };

  const renderTenderBox = () => {
    if (isOwner) return null;

    if (currentStatus !== TrangThaiPhien.MO) {
      return (
        <S.RightActionCard>
          <S.ActionCardTitle>
            <InfoCircleOutlined style={{ color: "#EAB308" }} />
            {currentStatus === TrangThaiPhien.CONG_BO
              ? t("statusUpcomingTender")
              : t("statusClosed")}
          </S.ActionCardTitle>
          <Alert message={t("inactiveTenderWarning")} type="warning" showIcon />
        </S.RightActionCard>
      );
    }

    return (
      <S.RightActionCard>
        <S.ActionCardTitle>{t("submitProposalNow")}</S.ActionCardTitle>
        <S.ActionCardSubPrice>
          {t("minTechScoreLabel", {
            score: sessionData.diemKyThuatToiThieu ?? 0,
          })}
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
          <div>
            {hasSubmittedTender && (
              <Alert
                message={t("tenderSubmittedMsg")}
                description={t("tenderSubmittedDesc")}
                type="success"
                showIcon
                style={{ marginBottom: 12 }}
              />
            )}
            <Button
              type="primary"
              size="large"
              block
              disabled={hasSubmittedTender}
              onClick={() => setIsModalOpen(true)}
            >
              {hasSubmittedTender
                ? t("alreadySubmittedProposal")
                : t("submitProposal")}
            </Button>
          </div>
        )}
      </S.RightActionCard>
    );
  };

  const columns = getTenderRankingColumns((key: string) => t(key));
  const rankingList = rankingRes?.data?.danhSach || [];

  const criteriaColumns: ColumnsType<TenderCriteria> = [
    {
      title: t("criteriaName"),
      dataIndex: "tenTieuChi",
      key: "tenTieuChi",
    },
    {
      title: t("weight"),
      dataIndex: "trongSo",
      key: "trongSo",
      render: (val: number) => `${val}%`,
      align: "center" as const,
    },
    {
      title: t("required"),
      dataIndex: "batBuoc",
      key: "batBuoc",
      render: (val: boolean) => (val ? t("yes") : t("no")),
      align: "center" as const,
    },
    {
      title: t("limitDetails"),
      key: "limit",
      render: (_: unknown, record: TenderCriteria) => {
        if (record.loai === "LUA_CHON") {
          const options = record.cacLuaChon
            ?.map((o) =>
              t("optionLabelWithScore", { label: o.nhan, score: o.giaTri })
            )
            .join(", ");
          return t("optionsText", { options: options || "" });
        }
        const min = record.giaTriToiThieu;
        const max = record.giaTriToiDa;
        const unit = record.donVi || "";
        if (min !== undefined && max !== undefined)
          return `${min} - ${max} ${unit}`;
        if (min !== undefined) return `>= ${min} ${unit}`;
        if (max !== undefined) return `<= ${max} ${unit}`;
        return "-";
      },
    },
  ];

  const mySubmission = tenderSubmissions?.find(
    (sub) =>
      sub.nguoiThamGiaId === user?._id || sub.nguoiThamGia?._id === user?._id
  );

  return (
    <S.GridContainer>
      <S.LeftCol>
        <S.GalleryCard>
          <ImageGallery images={sessionData.danhSachHinhAnh} />
        </S.GalleryCard>

        {isAuthenticated && (
          <S.LiveLeaderboardCard>
            <S.LeaderboardTitleRow>
              <S.LeaderboardTitle>
                {t("liveTenderLeaderboard")}
              </S.LeaderboardTitle>
              <S.LeaderboardParticipantCount>
                {t("contractorsCount", { count: rankingList.length })}
              </S.LeaderboardParticipantCount>
            </S.LeaderboardTitleRow>
            <RankingSessions<TenderRankingRecord>
              data={rankingList}
              columns={columns}
              loading={rankingLoading}
              renderPodiumSubtitle={(item) =>
                t("podiumTenderSubtitle", { score: item.diemTongHop || 0 })
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
                label: t("tenderInfo"),
                children: (
                  <div>
                    <S.TabGrid>
                      <S.TabGridItem>
                        <S.TabGridLabel>{t("minTechScore")}</S.TabGridLabel>
                        <S.TabGridValue>
                          {t("scoreUnit", {
                            score: sessionData.diemKyThuatToiThieu ?? 0,
                          })}
                        </S.TabGridValue>
                      </S.TabGridItem>
                      <S.TabGridItem>
                        <S.TabGridLabel>{t("tenderCode")}</S.TabGridLabel>
                        <S.TabGridValue
                          style={{ fontSize: 15, wordBreak: "break-all" }}
                        >
                          {sessionData._id}
                        </S.TabGridValue>
                      </S.TabGridItem>
                      <S.TabGridItem>
                        <S.TabGridLabel>{t("format")}</S.TabGridLabel>
                        <S.TabGridValue style={{ fontSize: 16 }}>
                          {sessionData.anDanh ? t("anonymous") : t("public")}
                        </S.TabGridValue>
                      </S.TabGridItem>
                      <S.TabGridItem>
                        <S.TabGridLabel>
                          {t("totalProposedContractors")}
                        </S.TabGridLabel>
                        <S.TabGridValue style={{ fontSize: 16 }}>
                          {t("contractorsCount", { count: rankingList.length })}
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
                      {sessionData.moTa || t("noTenderDescription")}
                    </S.DescriptionText>
                  </div>
                ),
              },
              {
                key: "criteria",
                label: t("evaluationCriteria"),
                children: (
                  <Table
                    dataSource={sessionData.tieuChi || []}
                    columns={criteriaColumns}
                    rowKey="_id"
                    pagination={false}
                    size="middle"
                  />
                ),
              },
              {
                key: "submission",
                label: t("yourProposal"),
                children: mySubmission ? (
                  <div style={{ padding: "8px 0" }}>
                    <Alert
                      message={t("proposalRecorded")}
                      type="success"
                      showIcon
                      style={{ marginBottom: 20 }}
                    />
                    <S.InfoList
                      style={{
                        background: "#F8FAFC",
                        padding: 16,
                        borderRadius: 12,
                      }}
                    >
                      <S.InfoItem>
                        <S.InfoLabel>{t("proposedPrice")}</S.InfoLabel>
                        <S.InfoValue style={{ color: "#2563EB", fontSize: 16 }}>
                          {formatVND(mySubmission.giaDeXuat)}
                        </S.InfoValue>
                      </S.InfoItem>
                      <S.InfoItem>
                        <S.InfoLabel>{t("approvalStatus")}</S.InfoLabel>
                        <S.InfoValue>{mySubmission.trangThai}</S.InfoValue>
                      </S.InfoItem>
                      {mySubmission.diemKyThuat !== undefined && (
                        <S.InfoItem>
                          <S.InfoLabel>{t("techScore")}</S.InfoLabel>
                          <S.InfoValue>
                            {t("scoreUnit", {
                              score: mySubmission.diemKyThuat,
                            })}
                          </S.InfoValue>
                        </S.InfoItem>
                      )}
                      {mySubmission.diemGia !== undefined && (
                        <S.InfoItem>
                          <S.InfoLabel>{t("priceScore")}</S.InfoLabel>
                          <S.InfoValue>
                            {t("scoreUnit", { score: mySubmission.diemGia })}
                          </S.InfoValue>
                        </S.InfoItem>
                      )}
                      {mySubmission.diemTongHop !== undefined && (
                        <S.InfoItem>
                          <S.InfoLabel>{t("combinedScore")}</S.InfoLabel>
                          <S.InfoValue
                            style={{ color: "#0D9488", fontSize: 16 }}
                          >
                            {t("scoreUnit", {
                              score: mySubmission.diemTongHop,
                            })}
                          </S.InfoValue>
                        </S.InfoItem>
                      )}
                    </S.InfoList>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "32px 0",
                      color: "#9CA3AF",
                    }}
                  >
                    <InfoCircleOutlined
                      style={{ fontSize: 40, marginBottom: 12 }}
                    />
                    <span>{t("noProposalText")}</span>
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
            />
          </div>

          <S.OverviewInfoGrid>
            <S.OverviewInfoBlock>
              <S.OverviewLabel>{t("announcementTime")}</S.OverviewLabel>
              <S.OverviewValue style={{ fontSize: 13 }}>
                {sessionData.thoiDiemCongBo
                  ? formatDate(sessionData.thoiDiemCongBo, "HH:mm - DD/MM/YYYY")
                  : t("announcementImmediate")}
              </S.OverviewValue>
            </S.OverviewInfoBlock>
            <S.OverviewInfoBlock>
              <S.OverviewLabel>{t("tenderFormat")}</S.OverviewLabel>
              <S.OverviewValue>
                {sessionData.anDanh ? t("anonymous") : t("public")}
              </S.OverviewValue>
            </S.OverviewInfoBlock>
            <S.OverviewInfoBlock>
              <S.OverviewLabel>{t("tenderStartTime")}</S.OverviewLabel>
              <S.OverviewValue style={{ fontSize: 13 }}>
                {formatDate(sessionData.thoiGianBatDau, "HH:mm - DD/MM/YYYY")}
              </S.OverviewValue>
            </S.OverviewInfoBlock>
            <S.OverviewInfoBlock>
              <S.OverviewLabel>{t("tenderEndTime")}</S.OverviewLabel>
              <S.OverviewValue style={{ fontSize: 13 }}>
                {formatDate(sessionData.thoiGianKetThuc, "HH:mm - DD/MM/YYYY")}
              </S.OverviewValue>
            </S.OverviewInfoBlock>
          </S.OverviewInfoGrid>
        </S.RightOverviewCard>

        {renderTenderBox()}
      </S.RightCol>

      <Modal
        title={t("submitProposal")}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleProposalSubmit}
          style={{ marginTop: 16 }}
        >
          <Form.Item
            name="giaDeXuat"
            label={t("proposedPriceLabel")}
            rules={[
              { required: true, message: t("enterProposedPrice") },
              { type: "number", min: 1, message: t("proposedPriceMin") },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
              addonAfter={t("vnd")}
              placeholder={t("enterProposedPricePlaceholder")}
            />
          </Form.Item>

          {sessionData.tieuChi && sessionData.tieuChi.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ fontWeight: 600, marginBottom: 12 }}>
                {t("techCriteriaInfo")}
              </h4>
              {sessionData.tieuChi.map((cri) => {
                const isSelect = cri.loai === "LUA_CHON";
                return (
                  <Form.Item
                    key={cri._id}
                    name={`criteria_${cri._id}`}
                    label={t("criteriaLabelWithWeight", {
                      name: cri.tenTieuChi,
                      weight: cri.trongSo,
                    })}
                    rules={[
                      {
                        required: cri.batBuoc,
                        message: t("enterCriteriaValue", {
                          name: cri.tenTieuChi,
                        }),
                      },
                    ]}
                  >
                    {isSelect ? (
                      <Select placeholder={t("selectValue")}>
                        {cri.cacLuaChon?.map((o) => (
                          <Select.Option key={o.giaTri} value={o.giaTri}>
                            {t("optionLabelWithScore", {
                              label: o.nhan,
                              score: o.giaTri,
                            })}
                          </Select.Option>
                        ))}
                      </Select>
                    ) : (
                      <InputNumber
                        style={{ width: "100%" }}
                        placeholder={t("enterValueWithUnit", {
                          unit: cri.donVi || "",
                        })}
                      />
                    )}
                  </Form.Item>
                );
              })}
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
              marginTop: 24,
            }}
          >
            <Button onClick={() => setIsModalOpen(false)}>
              {t("cancelBtn")}
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitProposalMutation.isPending}
            >
              {t("confirmSubmitBtn")}
            </Button>
          </div>
        </Form>
      </Modal>
    </S.GridContainer>
  );
};
