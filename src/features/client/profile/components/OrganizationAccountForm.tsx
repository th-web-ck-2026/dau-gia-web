import React, { useState } from "react";

import { useTranslations } from "next-intl";

import {
  BankOutlined,
  CreditCardOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { Image, UploadProps } from "antd";
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
import { PHONE_NUMBER_VI_PATTERN } from "@/constants";
import { useFeedback, useProvinceWard, useUpload } from "@/hooks/common";
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
  const tv = useTranslations("validation");
  const { message } = useFeedback();
  const [form] = BaseForm.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const licenseImageList = BaseForm.useWatch("licenseImage", form);
  const licenseFile = licenseImageList?.[0];

  const getImageUrl = (file: any) => {
    if (!file) return "";
    return (
      file.url ||
      file.response ||
      (file.originFileObj ? URL.createObjectURL(file.originFileObj) : "")
    );
  };

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
      tenTaiKhoan: values.bankAccountHolder,
    };

    const orgPayload = {
      tenToChuc: values.orgName,
      soDangKy: values.orgRegNo,
      ngayDangKy: values.orgRegDate
        ? values.orgRegDate.format("YYYY-MM-DD")
        : null,
      maSoThue: values.taxCode,
      soDienThoai: values.companyPhone,
      email: values.companyEmail,
      maTinhTp: values.province,
      tenTinhTp: provincesData.find((p) => p.code === values.province)?.name,
      maXaPhuong: values.ward,
      tenXaPhuong: wardsData.find((w) => w.code === values.ward)?.name,
      diaChi: values.address,
      anhDangKy: licenseUrl,
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
    orgRegNo: user.toChucProfile?.soDangKy || user.soCccd || "",
    orgRegDate: user.toChucProfile?.ngayDangKy
      ? dayjs(user.toChucProfile.ngayDangKy)
      : user.ngayCapCccd
        ? dayjs(user.ngayCapCccd)
        : null,
    orgRegPlace: user.noiCapCccd || "",
    taxCode: user.toChucProfile?.maSoThue || "",
    companyPhone: user.toChucProfile?.soDienThoai || user.phone || "",
    companyEmail: user.toChucProfile?.email || user.email || "",
    province: user.toChucProfile?.maTinhTp || undefined,
    ward: user.toChucProfile?.maXaPhuong || undefined,
    address: user.toChucProfile?.diaChi || "",
    bankAccountNo: user.soTaiKhoan || "",
    bankName: user.tenNganHang || "",
    bankAccountHolder:
      user.tenTaiKhoan || (user.fullname ? user.fullname.toUpperCase() : ""),
    licenseImage: user.toChucProfile?.anhDangKy
      ? [
          {
            uid: "-1",
            name: "license.png",
            status: "done",
            url: user.toChucProfile.anhDangKy,
          },
        ]
      : [],
  };

  return (
    <BaseForm
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
    >
      <S.FormSectionTitle>
        <BankOutlined />
        <span>{t("orgDetails")}</span>
      </S.FormSectionTitle>

      <BaseRow gutter={24}>
        <BaseCol xs={24} sm={12}>
          <BaseForm.Item
            name="orgName"
            label={t("orgName")}
            rules={[
              {
                required: true,
                message: tv("required", { field: t("orgName") }),
              },
            ]}
          >
            <BaseInput placeholder={t("orgName")} />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={12}>
          <BaseForm.Item
            name="orgRegNo"
            label={t("orgRegNo")}
            rules={[
              {
                required: true,
                message: tv("required", { field: t("orgRegNo") }),
              },
            ]}
          >
            <BaseInput placeholder={t("orgRegNo")} />
          </BaseForm.Item>
        </BaseCol>
      </BaseRow>

      <BaseRow gutter={24}>
        <BaseCol xs={24} sm={12}>
          <BaseForm.Item name="orgRegDate" label={t("orgRegDate")}>
            <BaseDatePicker
              style={{ width: "100%" }}
              placeholder={t("orgRegDate")}
              format="DD/MM/YYYY"
            />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={12}>
          <BaseForm.Item name="orgRegPlace" label={t("orgRegPlace")}>
            <BaseInput placeholder={t("orgRegPlace")} />
          </BaseForm.Item>
        </BaseCol>
      </BaseRow>

      <S.DraggerWrapper>
        <BaseForm.Item
          name="licenseImage"
          label={
            <S.UploadContainer style={{ marginBottom: 4 }}>
              <div>
                <S.UploadTitle>{t("orgLicenseImage")}</S.UploadTitle>
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
            {
              required: true,
              message: tv("required", { field: t("orgLicenseImage") }),
            },
          ]}
        >
          <Dragger
            name="license"
            multiple={false}
            maxCount={1}
            customRequest={handleUploadLicense}
            accept="image/*"
            showUploadList={false}
          >
            {getImageUrl(licenseFile) ? (
              <S.PreviewContainer onClick={(e) => e.stopPropagation()}>
                <img src={getImageUrl(licenseFile)} alt="license" />
                <S.PreviewOverlay className="preview-overlay">
                  <div style={{ display: "flex", gap: 16 }}>
                    <EyeOutlined
                      style={{ fontSize: 20, color: "#fff", cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewVisible(true);
                      }}
                    />
                    <DeleteOutlined
                      style={{ fontSize: 20, color: "#fff", cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        form.setFieldValue("licenseImage", []);
                      }}
                    />
                  </div>
                </S.PreviewOverlay>
              </S.PreviewContainer>
            ) : (
              <S.DraggerContent>
                <p className="upload-icon">
                  <InboxOutlined />
                </p>
                <p className="upload-text">{t("uploadLicense")}</p>
                <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>
                  {t("uploadInstructions")}
                </p>
              </S.DraggerContent>
            )}
          </Dragger>
        </BaseForm.Item>
        {getImageUrl(licenseFile) && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewVisible,
              src: getImageUrl(licenseFile),
              onVisibleChange: (visible) => setPreviewVisible(visible),
            }}
          />
        )}
      </S.DraggerWrapper>

      <BaseRow gutter={24}>
        <BaseCol xs={24} sm={8}>
          <BaseForm.Item
            name="taxCode"
            label={t("taxCode")}
            rules={[
              {
                required: true,
                message: tv("required", { field: t("taxCode") }),
              },
            ]}
          >
            <BaseInput placeholder={t("taxCode")} />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={8}>
          <BaseForm.Item
            name="companyPhone"
            label={t("companyPhone")}
            rules={[
              {
                required: true,
                message: tv("required", { field: t("companyPhone") }),
              },
              { pattern: PHONE_NUMBER_VI_PATTERN, message: tv("phoneInvalid") },
            ]}
          >
            <BaseInput placeholder={t("companyPhone")} />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={8}>
          <BaseForm.Item
            name="companyEmail"
            label={t("companyEmail")}
            rules={[
              {
                required: true,
                message: tv("required", { field: t("companyEmail") }),
              },
              { type: "email", message: tv("emailInvalid") },
            ]}
          >
            <BaseInput placeholder={t("companyEmail")} disabled />
          </BaseForm.Item>
        </BaseCol>
      </BaseRow>

      <S.FormSectionTitle>
        <EnvironmentOutlined />
        <span>{t("orgAddress")}</span>
      </S.FormSectionTitle>

      <BaseRow gutter={24}>
        <BaseCol xs={24} sm={12}>
          <BaseForm.Item
            name="province"
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
                form.setFieldValue("ward", undefined);
              }}
            />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={12}>
          <BaseForm.Item
            name="ward"
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
        name="address"
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
        <CreditCardOutlined />
        <span>{t("bankDetails")}</span>
      </S.FormSectionTitle>

      <BaseRow gutter={24}>
        <BaseCol xs={24} sm={8}>
          <BaseForm.Item
            name="bankAccountNo"
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
            name="bankName"
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
            name="bankAccountHolder"
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

export default OrganizationAccountForm;
