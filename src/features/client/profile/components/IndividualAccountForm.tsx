import React from "react";

import { useTranslations } from "next-intl";

import {
  CreditCardOutlined,
  EnvironmentOutlined,
  SecurityScanOutlined,
  UserOutlined,
} from "@ant-design/icons";
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
import { IDENTITY_CARD_NO_PATTERN, PHONE_NUMBER_VI_PATTERN } from "@/constants";
import { useFeedback, useProvinceWard } from "@/hooks/common";
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
  const tv = useTranslations("validation");
  const { message } = useFeedback();
  const [form] = BaseForm.useForm();

  const provinceCode = BaseForm.useWatch("maTinhTp", form);
  const { provincesData, wardsData, isLoadingProvinces, isLoadingWards } =
    useProvinceWard(provinceCode);

  const handleFinish = (values: any) => {
    const formattedValues = {
      ...values,
      birthday: values.birthday ? values.birthday.format("YYYY-MM-DD") : null,
      ngayCapCccd: values.ngayCapCccd
        ? values.ngayCapCccd.format("YYYY-MM-DD")
        : null,
      tenTinhTp:
        provincesData.find((p) => p.code === values.maTinhTp)?.name || null,
      tenXaPhuong:
        wardsData.find((w) => w.code === values.maXaPhuong)?.name || null,
    };
    if (onSave) {
      onSave(formattedValues);
    } else {
      message.success(t("successSaveInfo"));
    }
  };

  const initialValues = {
    fullname: user.fullname || "",
    phone: user.phone || "",
    email: user.email || "",
    gender: user.gender || undefined,
    birthday: user.birthday ? dayjs(user.birthday) : null,
    maTinhTp: user.maTinhTp || undefined,
    maXaPhuong: user.maXaPhuong || undefined,
    diaChi: user.diaChi || "",
    soCccd: user.soCccd || "",
    ngayCapCccd: user.ngayCapCccd ? dayjs(user.ngayCapCccd) : null,
    noiCapCccd: user.noiCapCccd || "",
    tenNganHang: user.tenNganHang || "",
    soTaiKhoan: user.soTaiKhoan || "",
    tenTaiKhoan: user.tenTaiKhoan || "",
  };

  return (
    <BaseForm
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
    >
      <S.FormSectionTitle>
        <UserOutlined />
        <span>{t("personalDetails")}</span>
      </S.FormSectionTitle>

      <BaseRow gutter={24}>
        <BaseCol xs={24} sm={12}>
          <BaseForm.Item
            name="fullname"
            label={t("fullname")}
            rules={[
              {
                required: true,
                message: tv("required", { field: t("fullname") }),
              },
            ]}
          >
            <BaseInput placeholder={t("enterFullname")} />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={12}>
          <BaseForm.Item
            name="phone"
            label={t("phone")}
            rules={[
              {
                required: true,
                message: tv("required", { field: t("phone") }),
              },
              { pattern: PHONE_NUMBER_VI_PATTERN, message: tv("phoneInvalid") },
            ]}
          >
            <BaseInput placeholder={t("enterPhone")} />
          </BaseForm.Item>
        </BaseCol>
      </BaseRow>

      <BaseRow gutter={24}>
        <BaseCol xs={24} sm={8}>
          <BaseForm.Item
            name="email"
            label={t("email")}
            rules={[
              {
                required: true,
                message: tv("required", { field: t("email") }),
              },
              { type: "email", message: tv("emailInvalid") },
            ]}
          >
            <BaseInput placeholder={t("enterEmail")} disabled />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={8}>
          <BaseForm.Item
            name="gender"
            label={t("gender")}
            rules={[
              {
                required: true,
                message: tv("required", { field: t("gender") }),
              },
            ]}
          >
            <BaseSelect
              placeholder={t("selectGender")}
              options={[
                { value: "MALE", label: t("male") },
                { value: "FEMALE", label: t("female") },
                { value: "OTHER", label: t("other") },
              ]}
            />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={8}>
          <BaseForm.Item
            name="birthday"
            label={t("birthday")}
            rules={[
              {
                required: true,
                message: tv("required", { field: t("birthday") }),
              },
            ]}
          >
            <BaseDatePicker
              style={{ width: "100%" }}
              placeholder={t("selectBirthday")}
              format="DD/MM/YYYY"
            />
          </BaseForm.Item>
        </BaseCol>
      </BaseRow>

      <S.FormSectionTitle>
        <EnvironmentOutlined />
        <span>{t("addressDetail")}</span>
      </S.FormSectionTitle>

      <BaseRow gutter={24}>
        <BaseCol xs={24} sm={12}>
          <BaseForm.Item
            name="maTinhTp"
            label={t("province")}
            rules={[
              {
                required: true,
                message: tv("required", { field: t("province") }),
              },
            ]}
          >
            <BaseSelect
              placeholder={t("selectProvince")}
              loading={isLoadingProvinces}
              options={provincesData.map((p) => ({
                value: p.code,
                label: p.name,
              }))}
              onChange={() => {
                form.setFieldValue("maXaPhuong", undefined);
              }}
            />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={12}>
          <BaseForm.Item
            name="maXaPhuong"
            label={t("ward")}
            rules={[
              { required: true, message: tv("required", { field: t("ward") }) },
            ]}
          >
            <BaseSelect
              placeholder={t("selectWard")}
              loading={isLoadingWards}
              options={wardsData.map((w) => ({
                value: w.code,
                label: w.name,
              }))}
              disabled={!provinceCode}
            />
          </BaseForm.Item>
        </BaseCol>
      </BaseRow>

      <BaseForm.Item
        name="diaChi"
        label={t("addressDetail")}
        rules={[
          {
            required: true,
            message: tv("required", { field: t("addressDetail") }),
          },
        ]}
      >
        <BaseInput placeholder={t("enterAddress")} />
      </BaseForm.Item>

      <S.FormSectionTitle>
        <SecurityScanOutlined />
        <span>{t("identityDetails")}</span>
      </S.FormSectionTitle>

      <BaseRow gutter={24}>
        <BaseCol xs={24} sm={8}>
          <BaseForm.Item
            name="soCccd"
            label={t("idNo")}
            rules={[
              { required: true, message: tv("required", { field: t("idNo") }) },
              {
                pattern: IDENTITY_CARD_NO_PATTERN,
                message: tv("identityCardNoInvalid"),
              },
            ]}
          >
            <BaseInput placeholder={t("enterIdNo")} />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={8}>
          <BaseForm.Item
            name="ngayCapCccd"
            label={t("idIssueDate")}
            rules={[
              {
                required: true,
                message: tv("required", { field: t("idIssueDate") }),
              },
            ]}
          >
            <BaseDatePicker
              style={{ width: "100%" }}
              placeholder={t("idIssueDatePlaceholder")}
              format="DD/MM/YYYY"
            />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={8}>
          <BaseForm.Item
            name="noiCapCccd"
            label={t("idIssuePlace")}
            rules={[
              {
                required: true,
                message: tv("required", { field: t("idIssuePlace") }),
              },
            ]}
          >
            <BaseInput placeholder={t("enterIdIssuePlace")} />
          </BaseForm.Item>
        </BaseCol>
      </BaseRow>

      <S.FormSectionTitle>
        <CreditCardOutlined />
        <span>{t("bankDetails")}</span>
      </S.FormSectionTitle>

      <BaseRow gutter={24}>
        <BaseCol xs={24} sm={8}>
          <BaseForm.Item
            name="soTaiKhoan"
            label={t("bankAccountNo")}
            rules={[
              {
                required: true,
                message: tv("required", { field: t("bankAccountNo") }),
              },
            ]}
          >
            <BaseInput placeholder={t("bankAccountNo")} />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={8}>
          <BaseForm.Item
            name="tenNganHang"
            label={t("bankName")}
            rules={[
              {
                required: true,
                message: tv("required", { field: t("bankName") }),
              },
            ]}
          >
            <BaseInput placeholder={t("bankName")} />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={8}>
          <BaseForm.Item
            name="tenTaiKhoan"
            label={t("bankAccountHolder")}
            rules={[
              {
                required: true,
                message: tv("required", { field: t("bankAccountHolder") }),
              },
            ]}
          >
            <BaseInput placeholder={t("bankAccountHolder")} />
          </BaseForm.Item>
        </BaseCol>
      </BaseRow>

      <BaseForm.Item style={{ marginTop: 24, marginBottom: 0 }}>
        <BaseButton type="primary" htmlType="submit">
          {t("saveInfo")}
        </BaseButton>
      </BaseForm.Item>
    </BaseForm>
  );
};

export default IndividualAccountForm;
