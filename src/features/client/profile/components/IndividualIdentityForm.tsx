import React, { useState } from "react";

import { useTranslations } from "next-intl";

import { InboxOutlined } from "@ant-design/icons";
import { message } from "antd";

import {
  BaseButton,
  BaseCheckbox,
  BaseForm,
  BaseUpload,
} from "@/components/common";

import * as S from "../index.styles";

const { Dragger } = BaseUpload;

const IndividualIdentityForm: React.FC = () => {
  const t = useTranslations("client.profile");
  const [form] = BaseForm.useForm();
  const [consentChecked, setConsentChecked] = useState(false);

  const handleFinish = (values: any) => {
    if (!consentChecked) {
      message.error(
        "Bạn cần đồng ý với điều khoản thu thập thông tin để tiếp tục."
      );
      return;
    }
    console.log("Saving identity verification files:", values);
    message.success(t("successSaveInfo"));
  };

  // [Important: Enable when API is ready]
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  return (
    <BaseForm form={form} layout="vertical" onFinish={handleFinish}>
      <S.UploadContainer style={{ marginBottom: 20 }}>
        <div>
          <S.UploadTitle>
            {t("verifyIdentity")}
            <S.RequiredMark>*</S.RequiredMark>
          </S.UploadTitle>
          <S.UploadSubTitle>{t("uploadLimits")}</S.UploadSubTitle>
        </div>

        <S.IdentityGrid>
          {/* Front Image Uploader */}
          <BaseForm.Item
            name="frontImage"
            valuePropName="fileList"
            getValueFromEvent={(e: any) => {
              if (Array.isArray(e)) return e;
              return e && e.fileList;
            }}
            rules={[
              { required: true, message: "Vui lòng tải lên ảnh mặt trước" },
            ]}
          >
            <S.DraggerWrapper>
              <Dragger
                name="front"
                multiple={false}
                maxCount={1}
                customRequest={dummyRequest}
                accept="image/*"
              >
                <S.DraggerContent>
                  <p className="upload-icon">
                    <InboxOutlined />
                  </p>
                  <p className="upload-text">{t("uploadIdFront")}</p>
                  <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>
                    {t("uploadInstructions")}
                  </p>
                </S.DraggerContent>
              </Dragger>
            </S.DraggerWrapper>
          </BaseForm.Item>

          {/* Back Image Uploader */}
          <BaseForm.Item
            name="backImage"
            valuePropName="fileList"
            getValueFromEvent={(e: any) => {
              if (Array.isArray(e)) return e;
              return e && e.fileList;
            }}
            rules={[
              { required: true, message: "Vui lòng tải lên ảnh mặt sau" },
            ]}
          >
            <S.DraggerWrapper>
              <Dragger
                name="back"
                multiple={false}
                maxCount={1}
                customRequest={dummyRequest}
                accept="image/*"
              >
                <S.DraggerContent>
                  <p className="upload-icon">
                    <InboxOutlined />
                  </p>
                  <p className="upload-text">{t("uploadIdBack")}</p>
                  <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>
                    {t("uploadInstructions")}
                  </p>
                </S.DraggerContent>
              </Dragger>
            </S.DraggerWrapper>
          </BaseForm.Item>
        </S.IdentityGrid>
      </S.UploadContainer>

      {/* Consent Checkbox */}
      <BaseForm.Item style={{ marginBottom: 24 }}>
        <BaseCheckbox
          checked={consentChecked}
          onChange={(e) => setConsentChecked(e.target.checked)}
        >
          <span style={{ fontSize: 14, color: "#374151" }}>
            {t("idConsent")}
          </span>
        </BaseCheckbox>
      </BaseForm.Item>

      <BaseForm.Item style={{ marginBottom: 0 }}>
        <BaseButton
          type="primary"
          htmlType="submit"
          size="large"
          disabled={!consentChecked}
        >
          {t("saveInfo")}
        </BaseButton>
      </BaseForm.Item>
    </BaseForm>
  );
};

export default IndividualIdentityForm;
