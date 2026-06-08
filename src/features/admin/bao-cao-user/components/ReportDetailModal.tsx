"use client";

import React, { useEffect } from "react";

import { useTranslations } from "next-intl";

import { Form, Input } from "antd";

import { AdminReportRow } from "@/api/admin";
import {
  BaseButton,
  BaseImage,
  BaseModal,
  BaseSpace,
} from "@/components/common";
import { BaseForm } from "@/components/common/forms/base-form";
import { BaseFormItem } from "@/components/common/forms/components/base-form-item";
import { useFeedback } from "@/hooks/common";

import { useReplyAdminReport } from "../index.hooks";
import * as S from "../index.styles";

interface ReportDetailModalProps {
  open: boolean;
  onClose: () => void;
  record: AdminReportRow | null;
  onSuccess: () => void;
}

const { TextArea } = Input;

const TYPE_LABEL_MAP: Record<string, string> = {
  LUA_DAO: "typeScam",
  SPAM: "typeSpam",
  QUAY_ROI: "typeHarass",
  NOI_DUNG_XAU: "typeBadContent",
  KHAC: "typeOther",
};

const formatDate = (d?: string | null) => {
  if (!d) return "-";
  return new Date(d).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({
  open,
  onClose,
  record,
  onSuccess,
}) => {
  const t = useTranslations("admin");
  const { message } = useFeedback();
  const [form] = Form.useForm();

  const { mutate: replyMutate, isPending } = useReplyAdminReport({
    onSuccess: () => {
      message.success(t("reports.replySuccess"));
      onSuccess();
      handleClose();
    },
    onError: (err) => {
      const serverMsg =
        err?.data && typeof err.data === "object" && "message" in err.data
          ? (err.data as any).message
          : undefined;
      message.error(serverMsg || t("reports.replyError"));
    },
  });

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form]);

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const handleSubmit = (values: { phanHoiAdmin: string }) => {
    if (!record) return;
    replyMutate({
      id: record._id,
      data: { phanHoiAdmin: values.phanHoiAdmin },
    });
  };

  if (!record) return null;

  const isDone = record.trangThai === "DA_XU_LY";
  const images: string[] = record.danhSachHinhAnh || [];
  const typeKey = TYPE_LABEL_MAP[record.loai] ?? "typeOther";

  return (
    <BaseModal
      open={open}
      onCancel={handleClose}
      title={t("reports.modalTitle")}
      width={860}
      footer={null}
    >
      {/* ── Thông tin báo cáo ── */}
      <S.ModalSectionTitle>{t("reports.sectionInfo")}</S.ModalSectionTitle>

      <S.InfoGrid>
        <S.InfoRow>
          <S.InfoLabel>{t("reports.labelReporter")}</S.InfoLabel>
          <S.InfoValue>{record.nguoiToCaoId || "-"}</S.InfoValue>
        </S.InfoRow>
        <S.InfoRow>
          <S.InfoLabel>{t("reports.labelReported")}</S.InfoLabel>
          <S.InfoValue>{record.nguoiBiToCaoId || "-"}</S.InfoValue>
        </S.InfoRow>
        <S.InfoRow>
          <S.InfoLabel>{t("reports.labelType")}</S.InfoLabel>
          <S.InfoValue>
            <S.TypeBadge>{t(`reports.${typeKey}`)}</S.TypeBadge>
          </S.InfoValue>
        </S.InfoRow>
        <S.InfoRow>
          <S.InfoLabel>{t("reports.labelStatus")}</S.InfoLabel>
          <S.InfoValue>
            <S.StatusBadge $done={isDone}>
              {isDone ? t("reports.statusDone") : t("reports.statusPending")}
            </S.StatusBadge>
          </S.InfoValue>
        </S.InfoRow>
        <S.InfoRow>
          <S.InfoLabel>{t("reports.labelCreatedAt")}</S.InfoLabel>
          <S.InfoValue>{formatDate(record.createdAt)}</S.InfoValue>
        </S.InfoRow>
        {isDone && (
          <S.InfoRow>
            <S.InfoLabel>{t("reports.labelProcessedAt")}</S.InfoLabel>
            <S.InfoValue>{formatDate(record.thoiGianXuLy)}</S.InfoValue>
          </S.InfoRow>
        )}
      </S.InfoGrid>

      <S.InfoRow style={{ marginTop: 16 }}>
        <S.InfoLabel>{t("reports.labelTitle")}</S.InfoLabel>
        <S.InfoValue style={{ fontWeight: 600, fontSize: "1rem" }}>
          {record.tieuDe}
        </S.InfoValue>
      </S.InfoRow>

      <S.InfoRow style={{ marginTop: 12 }}>
        <S.InfoLabel>{t("reports.labelContent")}</S.InfoLabel>
        <S.ContentBlock>{record.noiDung}</S.ContentBlock>
      </S.InfoRow>

      {/* ── Hình ảnh bằng chứng ── */}
      <S.ModalSectionTitle>{t("reports.sectionEvidence")}</S.ModalSectionTitle>
      {images.length === 0 ? (
        <S.NoImageText>{t("reports.noImages")}</S.NoImageText>
      ) : (
        <S.ImageGrid>
          {images.map((src, idx) => (
            <S.ImageCard key={idx}>
              <BaseImage
                src={src}
                alt={`evidence-${idx + 1}`}
                fallback="/placeholder-image.png"
                style={{ objectFit: "cover", borderRadius: "4px" }}
                height={120}
                width="100%"
              />
            </S.ImageCard>
          ))}
        </S.ImageGrid>
      )}

      {/* ── Phản hồi Admin ── */}
      <S.ModalSectionTitle>{t("reports.sectionReply")}</S.ModalSectionTitle>

      {isDone ? (
        <S.AlreadyProcessedBanner>
          <strong>{t("reports.labelAdminReply")}:</strong>{" "}
          {record.phanHoiAdmin || "-"}
        </S.AlreadyProcessedBanner>
      ) : (
        <BaseForm form={form} layout="vertical" onFinish={handleSubmit}>
          <BaseFormItem
            name="phanHoiAdmin"
            rules={[{ required: true, message: t("reports.replyRequired") }]}
          >
            <TextArea rows={4} placeholder={t("reports.replyPlaceholder")} />
          </BaseFormItem>

          <S.ActionButtonContainer>
            <BaseSpace>
              <BaseButton onClick={handleClose} disabled={isPending}>
                {t("reports.btnCancel")}
              </BaseButton>
              <BaseButton type="primary" htmlType="submit" loading={isPending}>
                {t("reports.btnReply")}
              </BaseButton>
            </BaseSpace>
          </S.ActionButtonContainer>
        </BaseForm>
      )}
    </BaseModal>
  );
};
