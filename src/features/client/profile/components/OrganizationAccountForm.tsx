import React from "react";

import { useTranslations } from "next-intl";

import {
  BankOutlined,
  CreditCardOutlined,
  EnvironmentOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { UploadProps, message } from "antd";
import dayjs from "dayjs";

import {
  BaseButton,
  BaseCol,
  BaseDatePicker,
  BaseForm,
  BaseInput,
  BaseRow,
  BaseSelect,
  BaseUpload,
} from "@/components/common";
import { useProvinceWard, useUpload } from "@/hooks/common";
import type { User } from "@/interfaces/auth";

import { UpdateOrganizationPayload } from "../index.hooks";
import * as S from "../index.styles";

const { Dragger } = BaseUpload;

interface OrganizationAccountFormProps {
  user: User;
  onSave?: (values: UpdateOrganizationPayload) => void;
}

const OrganizationAccountForm: React.FC<OrganizationAccountFormProps> = ({
  user,
  onSave,
}) => {
  const t = useTranslations("client.profile");
  const [form] = BaseForm.useForm();

  const provinceCode = BaseForm.useWatch("province", form);
  const { provincesData, wardsData, isLoadingProvinces, isLoadingWards } =
    useProvinceWard(provinceCode);

  const { uploadPublic } = useUpload();

  const handleFinish = (values: any) => {
    const licenseUrl =
      values.licenseImage?.[0]?.response || values.licenseImage?.[0]?.url || "";

    const userPayload = {
      soCccd: values.orgRegNo,
      ngayCapCccd: values.orgRegDate
        ? values.orgRegDate.format("YYYY-MM-DD")
        : null,
      noiCapCccd: values.orgRegPlace,
      soTaiKhoan: values.bankAccountNo,
      tenNganHang: values.bankName,
      chiNhanhNganHang: values.bankBranch,
      tenTaiKhoan: values.bankAccountHolder,
    };

    const orgPayload = {
      tenToChuc: values.orgName,
      maSoThue: values.taxCode,
      soDienThoai: values.companyPhone,
      email: values.companyEmail,
      maTinhTp: values.province,
      tenTinhTp: provincesData.find((p) => p.code === values.province)?.name,
      maXaPhuong: values.ward,
      tenXaPhuong: wardsData.find((w) => w.code === values.ward)?.name,
      diaChi: values.address,
      licenseImage: licenseUrl,
    };

    if (onSave) {
      onSave({ userPayload, orgPayload });
    } else {
      message.success(t("successSaveInfo"));
    }
  };

  const handleUploadLicense = async (
    options: Parameters<Required<UploadProps>["customRequest"]>[0]
  ) => {
    const { file, onSuccess, onError } = options;
    try {
      const response = await uploadPublic.mutateAsync({ file: file as File });
      onSuccess?.(response.data);
    } catch (err) {
      onError?.(err as Error);
    }
  };

  const initialValues = {
    orgName: user.toChucProfile?.tenToChuc || user.fullname || "",
    orgRegNo: user.soCccd || "",
    orgRegDate: user.ngayCapCccd ? dayjs(user.ngayCapCccd) : null,
    orgRegPlace: user.noiCapCccd || "",
    taxCode: user.toChucProfile?.maSoThue || "",
    companyPhone: user.toChucProfile?.soDienThoai || user.phone || "",
    companyEmail: user.toChucProfile?.email || user.email || "",
    province: user.toChucProfile?.maTinhTp || undefined,
    ward: user.toChucProfile?.maXaPhuong || undefined,
    address: user.toChucProfile?.diaChi || "",
    bankAccountNo: user.soTaiKhoan || "",
    bankName: user.tenNganHang || "",
    bankBranch: user.chiNhanhNganHang || "",
    bankAccountHolder:
      user.tenTaiKhoan || (user.fullname ? user.fullname.toUpperCase() : ""),
    licenseImage: user.toChucProfile?.diaChi
      ? [
          {
            uid: "-1",
            name: "license.png",
            status: "done",
            url: "https://iili.io/CfJ0CTQ.png",
          },
        ]
      : [],
  };

  return (
    <BaseForm
      form={form}
      layout="vertical"
      requiredMark={false}
      initialValues={initialValues}
      onFinish={handleFinish}
    >
      {/* 1. Thông tin tổ chức */}
      <S.FormSectionTitle>
        <BankOutlined />
        <span>{t("orgDetails")}</span>
      </S.FormSectionTitle>

      <BaseRow gutter={24}>
        <BaseCol xs={24} sm={12}>
          <BaseForm.Item
            name="orgName"
            label={
              <span>
                {t("orgName")}
                <S.RequiredMark>*</S.RequiredMark>
              </span>
            }
            rules={[{ required: true, message: "Vui lòng nhập tên tổ chức" }]}
          >
            <BaseInput size="large" placeholder="Nhập tên tổ chức" />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={12}>
          <BaseForm.Item
            name="orgRegNo"
            label={
              <span>
                {t("orgRegNo")}
                <S.RequiredMark>*</S.RequiredMark>
              </span>
            }
            rules={[{ required: true, message: "Vui lòng nhập số đăng ký" }]}
          >
            <BaseInput
              size="large"
              placeholder="Nhập số đăng ký doanh nghiệp"
            />
          </BaseForm.Item>
        </BaseCol>
      </BaseRow>

      <BaseRow gutter={24}>
        <BaseCol xs={24} sm={12}>
          <BaseForm.Item name="orgRegDate" label={t("orgRegDate")}>
            <BaseDatePicker
              size="large"
              style={{ width: "100%" }}
              placeholder="Chọn ngày cấp"
              format="DD/MM/YYYY"
            />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={12}>
          <BaseForm.Item name="orgRegPlace" label={t("orgRegPlace")}>
            <BaseInput size="large" placeholder="Nhập nơi cấp số ĐKKD" />
          </BaseForm.Item>
        </BaseCol>
      </BaseRow>

      {/* Upload Organization Certificate */}
      <BaseForm.Item
        name="licenseImage"
        label={
          <S.UploadContainer style={{ marginBottom: 4 }}>
            <div>
              <S.UploadTitle>
                {t("orgLicenseImage")}
                <S.RequiredMark>*</S.RequiredMark>
              </S.UploadTitle>
              <S.UploadSubTitle>{t("uploadLimits")}</S.UploadSubTitle>
            </div>
          </S.UploadContainer>
        }
        valuePropName="fileList"
        getValueFromEvent={(e: any) => {
          if (Array.isArray(e)) return e;
          return e && e.fileList;
        }}
        rules={[
          { required: true, message: "Vui lòng tải lên ảnh đăng ký tổ chức" },
        ]}
      >
        <S.DraggerWrapper>
          <Dragger
            name="license"
            multiple={false}
            maxCount={1}
            customRequest={handleUploadLicense}
            accept="image/*"
          >
            <S.DraggerContent>
              <p className="upload-icon">
                <InboxOutlined />
              </p>
              <p className="upload-text">{t("uploadLicense")}</p>
              <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>
                {t("uploadInstructions")}
              </p>
            </S.DraggerContent>
          </Dragger>
        </S.DraggerWrapper>
      </BaseForm.Item>

      <BaseRow gutter={24}>
        <BaseCol xs={24} sm={8}>
          <BaseForm.Item
            name="taxCode"
            label={
              <span>
                {t("taxCode")}
                <S.RequiredMark>*</S.RequiredMark>
              </span>
            }
            rules={[{ required: true, message: "Vui lòng nhập mã số thuế" }]}
          >
            <BaseInput size="large" placeholder="Nhập mã số thuế" />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={8}>
          <BaseForm.Item name="companyPhone" label={t("companyPhone")}>
            <BaseInput size="large" placeholder="Nhập số điện thoại công ty" />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={8}>
          <BaseForm.Item name="companyEmail" label={t("companyEmail")}>
            <BaseInput size="large" placeholder="Nhập email công ty" />
          </BaseForm.Item>
        </BaseCol>
      </BaseRow>

      {/* 2. Địa chỉ tổ chức */}
      <S.FormSectionTitle>
        <EnvironmentOutlined />
        <span>{t("orgAddress")}</span>
      </S.FormSectionTitle>

      <BaseRow gutter={24}>
        <BaseCol xs={24} sm={12}>
          <BaseForm.Item
            name="province"
            label={
              <span>
                {t("province")}
                <S.RequiredMark>*</S.RequiredMark>
              </span>
            }
            rules={[
              { required: true, message: "Vui lòng chọn Tỉnh/Thành phố" },
            ]}
          >
            <BaseSelect
              size="large"
              placeholder="Chọn Tỉnh/Thành phố"
              loading={isLoadingProvinces}
              options={provincesData.map((p) => ({
                value: p.code,
                label: p.name,
              }))}
              onChange={() => {
                form.setFieldValue("ward", undefined);
              }}
            />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={12}>
          <BaseForm.Item
            name="ward"
            label={
              <span>
                {t("ward")}
                <S.RequiredMark>*</S.RequiredMark>
              </span>
            }
            rules={[{ required: true, message: "Vui lòng chọn Phường/xã" }]}
          >
            <BaseSelect
              size="large"
              placeholder="Chọn Phường/xã"
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
        name="address"
        label={
          <span>
            {t("addressDetail")}
            <S.RequiredMark>*</S.RequiredMark>
          </span>
        }
        rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
      >
        <BaseInput size="large" placeholder="Nhập địa chỉ" />
      </BaseForm.Item>

      {/* 3. Thông tin tài khoản ngân hàng */}
      <S.FormSectionTitle>
        <CreditCardOutlined />
        <span>{t("bankDetails")}</span>
      </S.FormSectionTitle>

      <BaseRow gutter={24}>
        <BaseCol xs={24} sm={12}>
          <BaseForm.Item
            name="bankAccountNo"
            label={
              <span>
                {t("bankAccountNo")}
                <S.RequiredMark>*</S.RequiredMark>
              </span>
            }
            rules={[{ required: true, message: "Vui lòng nhập số tài khoản" }]}
          >
            <BaseInput size="large" placeholder="Nhập số tài khoản" />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={12}>
          <BaseForm.Item
            name="bankName"
            label={
              <span>
                {t("bankName")}
                <S.RequiredMark>*</S.RequiredMark>
              </span>
            }
            rules={[{ required: true, message: "Vui lòng nhập tên ngân hàng" }]}
          >
            <BaseInput size="large" placeholder="Nhập tên ngân hàng" />
          </BaseForm.Item>
        </BaseCol>
      </BaseRow>

      <BaseRow gutter={24}>
        <BaseCol xs={24} sm={12}>
          <BaseForm.Item
            name="bankBranch"
            label={
              <span>
                {t("bankBranch")}
                <S.RequiredMark>*</S.RequiredMark>
              </span>
            }
            rules={[{ required: true, message: "Vui lòng nhập chi nhánh" }]}
          >
            <BaseInput size="large" placeholder="Nhập chi nhánh ngân hàng" />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={12}>
          <BaseForm.Item
            name="bankAccountHolder"
            label={
              <span>
                {t("bankAccountHolder")}
                <S.RequiredMark>*</S.RequiredMark>
              </span>
            }
            rules={[
              { required: true, message: "Vui lòng nhập tên chủ tài khoản" },
            ]}
          >
            <BaseInput size="large" placeholder="Nhập tên chủ tài khoản" />
          </BaseForm.Item>
        </BaseCol>
      </BaseRow>

      <BaseForm.Item style={{ marginTop: 24, marginBottom: 0 }}>
        <BaseButton type="primary" htmlType="submit" size="large">
          Lưu thông tin
        </BaseButton>
      </BaseForm.Item>
    </BaseForm>
  );
};

export default OrganizationAccountForm;
