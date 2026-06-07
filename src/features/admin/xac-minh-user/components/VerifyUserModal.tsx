"use client";

import React, { useEffect, useState } from "react";

import { useTranslations } from "next-intl";

import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Descriptions, Form, Input } from "antd";

import { AdminXacMinhUserData } from "@/api/admin";
import {
  BaseButton,
  BaseImage,
  BaseModal,
  BasePopconfirm,
  BaseSpace,
} from "@/components/common";
import { BaseForm } from "@/components/common/forms/base-form";
import { BaseFormItem } from "@/components/common/forms/components/base-form-item";
import { TrangThaiXacMinhUser } from "@/constants";
import { useFeedback } from "@/hooks/common";

import { useAdminDuyetDonXacMinh } from "../index.hooks";
import * as S from "../index.styles";

interface VerifyUserModalProps {
  open: boolean;
  onClose: () => void;
  record: AdminXacMinhUserData | null;
  onSuccess: () => void;
}

const { TextArea } = Input;

export const VerifyUserModal: React.FC<VerifyUserModalProps> = ({
  open,
  onClose,
  record,
  onSuccess,
}) => {
  const t = useTranslations("admin");
  const { message } = useFeedback();
  const [form] = Form.useForm();
  const [isRejecting, setIsRejecting] = useState(false);

  const { mutate: duyetMutate, isPending } = useAdminDuyetDonXacMinh({
    onSuccess: (res) => {
      const isApproved = res.data.trangThai === TrangThaiXacMinhUser.DUYET;
      message.success(
        isApproved
          ? t("verification.modal.successApprove")
          : t("verification.modal.successReject")
      );
      onSuccess();
      handleClose();
    },
    onError: (err) => {
      const serverErrorMsg =
        err?.data && typeof err.data === "object" && "message" in err.data
          ? (err.data as any).message
          : undefined;
      message.error(serverErrorMsg || "Operation failed");
    },
  });

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsRejecting(false);
      form.resetFields();
    }
  }, [open, form, setIsRejecting]);

  const handleClose = () => {
    setIsRejecting(false);
    form.resetFields();
    onClose();
  };

  const handleApprove = () => {
    if (!record) return;
    duyetMutate({
      id: record._id,
      data: {
        trangThai: TrangThaiXacMinhUser.DUYET,
      },
    });
  };

  const handleRejectSubmit = (values: { lyDoTuChoi: string }) => {
    if (!record) return;
    duyetMutate({
      id: record._id,
      data: {
        trangThai: TrangThaiXacMinhUser.TU_CHOI,
        lyDoTuChoi: values.lyDoTuChoi,
      },
    });
  };

  if (!record) return null;

  const user = record.user;
  const isPendingRequest = record.trangThai === TrangThaiXacMinhUser.CHO_DUYET;

  return (
    <BaseModal
      open={open}
      onCancel={handleClose}
      title={t("verification.modal.title")}
      width={800}
      footer={null}
    >
      <S.ModalSectionTitle>
        {t("verification.modal.userInfo")}
      </S.ModalSectionTitle>
      <Descriptions bordered column={2} size="small">
        <Descriptions.Item label={t("verification.table.fullname")}>
          {user?.fullname || "-"}
        </Descriptions.Item>
        <Descriptions.Item label={t("verification.table.email")}>
          {user?.email || "-"}
        </Descriptions.Item>
        <Descriptions.Item label={t("verification.table.phone")}>
          {user?.phone || "-"}
        </Descriptions.Item>
        <Descriptions.Item label={t("verification.table.status")}>
          {record.trangThai}
        </Descriptions.Item>
        {record.trangThai === TrangThaiXacMinhUser.TU_CHOI && (
          <Descriptions.Item
            label={t("verification.modal.reasonForRejection")}
            span={2}
          >
            <span style={{ color: "#ef4444", fontWeight: 500 }}>
              {record.lyDoTuChoi || "-"}
            </span>
          </Descriptions.Item>
        )}
      </Descriptions>

      <S.ModalSectionTitle>
        {t("verification.modal.documents")}
      </S.ModalSectionTitle>
      <S.ImageGrid>
        <S.ImageCard>
          <BaseImage
            src={record.anhCccdTruoc || "/placeholder-image.png"}
            alt={t("verification.modal.cccdFront")}
            fallback="/placeholder-image.png"
            style={{ objectFit: "cover", borderRadius: "4px" }}
            height={120}
            width="100%"
          />
          <S.ImageTitle>{t("verification.modal.cccdFront")}</S.ImageTitle>
        </S.ImageCard>

        <S.ImageCard>
          <BaseImage
            src={record.anhCccdSau || "/placeholder-image.png"}
            alt={t("verification.modal.cccdBack")}
            fallback="/placeholder-image.png"
            style={{ objectFit: "cover", borderRadius: "4px" }}
            height={120}
            width="100%"
          />
          <S.ImageTitle>{t("verification.modal.cccdBack")}</S.ImageTitle>
        </S.ImageCard>

        <S.ImageCard>
          <BaseImage
            src={record.anhChanDung || "/placeholder-image.png"}
            alt={t("verification.modal.portrait")}
            fallback="/placeholder-image.png"
            style={{ objectFit: "cover", borderRadius: "4px" }}
            height={120}
            width="100%"
          />
          <S.ImageTitle>{t("verification.modal.portrait")}</S.ImageTitle>
        </S.ImageCard>
      </S.ImageGrid>

      {isPendingRequest && !isRejecting && (
        <S.ActionButtonContainer>
          <BaseButton
            danger
            icon={<CloseOutlined />}
            onClick={() => setIsRejecting(true)}
            disabled={isPending}
          >
            {t("verification.modal.rejectBtn")}
          </BaseButton>

          <BasePopconfirm
            title={t("verification.modal.approveConfirm")}
            onConfirm={handleApprove}
            okText={t("verification.modal.approveBtn")}
            cancelText={t("verification.modal.cancel")}
          >
            <BaseButton
              type="primary"
              icon={<CheckOutlined />}
              loading={isPending}
            >
              {t("verification.modal.approveBtn")}
            </BaseButton>
          </BasePopconfirm>
        </S.ActionButtonContainer>
      )}

      {isRejecting && (
        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            border: "1px solid #f3f4f6",
            borderRadius: "8px",
            background: "#fdf2f2",
          }}
        >
          <h4
            style={{
              margin: "0 0 12px 0",
              color: "#b91c1c",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            {t("verification.modal.rejectReasonTitle")}
          </h4>
          <BaseForm form={form} layout="vertical" onFinish={handleRejectSubmit}>
            <BaseFormItem
              name="lyDoTuChoi"
              label={t("verification.modal.rejectReasonLabel")}
              rules={[
                {
                  required: true,
                  message: t("verification.modal.rejectReasonRequired"),
                },
              ]}
            >
              <TextArea
                rows={3}
                placeholder={t("verification.modal.rejectReasonPlaceholder")}
              />
            </BaseFormItem>
            <S.ActionButtonContainer>
              <BaseSpace>
                <BaseButton onClick={() => setIsRejecting(false)}>
                  {t("verification.modal.cancel")}
                </BaseButton>
                <BaseButton
                  type="primary"
                  danger
                  htmlType="submit"
                  loading={isPending}
                >
                  {t("verification.modal.submitReject")}
                </BaseButton>
              </BaseSpace>
            </S.ActionButtonContainer>
          </BaseForm>
        </div>
      )}
    </BaseModal>
  );
};
