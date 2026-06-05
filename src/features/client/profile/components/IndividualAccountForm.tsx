import React from "react";

import { useTranslations } from "next-intl";

import { message } from "antd";
import dayjs from "dayjs";

import {
  BaseButton,
  BaseCol,
  BaseDatePicker,
  BaseForm,
  BaseInput,
  BaseRow,
  BaseSelect,
} from "@/components/common";
import type { User } from "@/interfaces/auth";

import * as S from "../index.styles";

interface IndividualAccountFormProps {
  user: User;
  onSave?: (values: Partial<User>) => void;
}

const IndividualAccountForm: React.FC<IndividualAccountFormProps> = ({
  user,
  onSave,
}) => {
  const t = useTranslations("client.profile");
  const [form] = BaseForm.useForm();

  const handleFinish = (values: any) => {
    const formattedValues = {
      ...values,
      birthday: values.birthday ? values.birthday.format("YYYY-MM-DD") : null,
    };
    if (onSave) {
      onSave(formattedValues);
    } else {
      message.success(t("successSaveInfo"));
    }
  };

  const initialValues = {
    fullname: user.fullname,
    phone: user.phone,
    email: user.email,
    gender: user.gender || undefined,
    birthday: user.birthday ? dayjs(user.birthday) : null,
    address: user.address,
  };

  return (
    <BaseForm
      form={form}
      layout="vertical"
      requiredMark={false}
      initialValues={initialValues}
      onFinish={handleFinish}
    >
      <BaseRow gutter={24}>
        {/* Full Name */}
        <BaseCol xs={24} sm={12}>
          <BaseForm.Item
            name="fullname"
            label={
              <span>
                {t("fullname") || "Họ và tên"}
                <S.RequiredMark>*</S.RequiredMark>
              </span>
            }
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <BaseInput size="large" placeholder="Nhập họ tên" />
          </BaseForm.Item>
        </BaseCol>

        {/* Phone */}
        <BaseCol xs={24} sm={12}>
          <BaseForm.Item
            name="phone"
            label={
              <span>
                {t("phone")}
                <S.RequiredMark>*</S.RequiredMark>
              </span>
            }
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <BaseInput size="large" placeholder="Nhập số điện thoại" disabled />
          </BaseForm.Item>
        </BaseCol>
      </BaseRow>

      <BaseRow gutter={24}>
        {/* Email */}
        <BaseCol xs={24} sm={12}>
          <BaseForm.Item
            name="email"
            label={
              <span>
                {t("email")}
                <S.RequiredMark>*</S.RequiredMark>
              </span>
            }
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
          >
            <BaseInput size="large" placeholder="Nhập email" disabled />
          </BaseForm.Item>
        </BaseCol>

        {/* Gender */}
        <BaseCol xs={24} sm={12}>
          <BaseForm.Item name="gender" label={t("gender") || "Giới tính"}>
            <BaseSelect
              size="large"
              placeholder="Chọn giới tính"
              options={[
                { value: "MALE", label: "Nam" },
                { value: "FEMALE", label: "Nữ" },
                { value: "OTHER", label: "Khác" },
              ]}
            />
          </BaseForm.Item>
        </BaseCol>
      </BaseRow>

      <BaseRow gutter={24}>
        {/* Birthday */}
        <BaseCol xs={24} sm={12}>
          <BaseForm.Item name="birthday" label={t("birthday") || "Ngày sinh"}>
            <BaseDatePicker
              size="large"
              style={{ width: "100%" }}
              placeholder="Chọn ngày sinh"
              format="DD/MM/YYYY"
            />
          </BaseForm.Item>
        </BaseCol>

        {/* Address */}
        <BaseCol xs={24} sm={12}>
          <BaseForm.Item name="address" label={t("addressDetail")}>
            <BaseInput size="large" placeholder="Nhập địa chỉ của bạn" />
          </BaseForm.Item>
        </BaseCol>
      </BaseRow>

      <BaseForm.Item style={{ marginTop: 24, marginBottom: 0 }}>
        <BaseButton type="primary" htmlType="submit" size="large">
          {t("saveInfo")}
        </BaseButton>
      </BaseForm.Item>
    </BaseForm>
  );
};

export default IndividualAccountForm;
