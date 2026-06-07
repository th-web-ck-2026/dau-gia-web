"use client";

import React, { useEffect } from "react";

import { useTranslations } from "next-intl";

import { Form, Input, Select } from "antd";

import { AdminUserRow } from "@/api/admin";
import { BaseButton, BaseModal, BaseSpace } from "@/components/common";
import { BaseForm } from "@/components/common/forms/base-form";
import { BaseFormItem } from "@/components/common/forms/components/base-form-item";
import { useFeedback } from "@/hooks/common";

import { useUpdateUserByAdmin } from "../index.hooks";
import * as S from "../index.styles";

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  record: AdminUserRow | null;
  onSuccess: () => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  onClose,
  record,
  onSuccess,
}) => {
  const t = useTranslations("admin");
  const { message } = useFeedback();
  const [form] = Form.useForm();

  const { mutate: updateMutate, isPending } = useUpdateUserByAdmin({
    onSuccess: () => {
      message.success("Cập nhật thông tin người dùng thành công");
      onSuccess();
      handleClose();
    },
    onError: (err) => {
      const serverErrorMsg =
        err?.data && typeof err.data === "object" && "message" in err.data
          ? (err.data as any).message
          : undefined;
      message.error(serverErrorMsg || "Cập nhật thất bại");
    },
  });

  useEffect(() => {
    if (open && record) {
      form.setFieldsValue({
        fullname: record.fullname,
        role: record.role,
        userStatus: record.userStatus,
        isVerified: record.isVerified,
      });
    } else {
      form.resetFields();
    }
  }, [open, record, form]);

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const handleSubmit = (values: any) => {
    if (!record) return;
    updateMutate({
      id: record._id,
      data: {
        fullname: values.fullname,
        role: values.role,
        userStatus: values.userStatus,
        isVerified: values.isVerified,
      },
    });
  };

  if (!record) return null;

  return (
    <BaseModal
      open={open}
      onCancel={handleClose}
      title="Chỉnh sửa thông tin người dùng"
      width={600}
      footer={null}
    >
      <S.ModalSectionTitle>
        Thông tin tài khoản: {record.email}
      </S.ModalSectionTitle>

      <BaseForm form={form} layout="vertical" onFinish={handleSubmit}>
        <BaseFormItem
          name="fullname"
          label="Họ và tên"
          rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
        >
          <Input placeholder="Nhập họ và tên" />
        </BaseFormItem>

        <BaseFormItem
          name="role"
          label="Vai trò (Role)"
          rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
        >
          <Select
            options={[
              { value: "USER", label: "USER" },
              { value: "ADMIN", label: "ADMIN" },
            ]}
          />
        </BaseFormItem>

        <BaseFormItem
          name="userStatus"
          label="Trạng thái tài khoản"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
        >
          <Select
            options={[
              { value: "ACTIVE", label: "Hoạt động (ACTIVE)" },
              { value: "BLOCKED", label: "Đã khóa (BLOCKED)" },
            ]}
          />
        </BaseFormItem>

        <BaseFormItem
          name="isVerified"
          label="Trạng thái xác minh danh tính"
          rules={[
            { required: true, message: "Vui lòng chọn trạng thái xác minh" },
          ]}
        >
          <Select
            options={[
              { value: true, label: "Đã xác minh" },
              { value: false, label: "Chưa xác minh" },
            ]}
          />
        </BaseFormItem>

        <S.ActionButtonContainer>
          <BaseSpace>
            <BaseButton onClick={handleClose} disabled={isPending}>
              {t("verification.modal.cancel") || "Hủy"}
            </BaseButton>
            <BaseButton type="primary" htmlType="submit" loading={isPending}>
              Lưu thay đổi
            </BaseButton>
          </BaseSpace>
        </S.ActionButtonContainer>
      </BaseForm>
    </BaseModal>
  );
};
