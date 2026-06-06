import React, { useState } from "react";

import { useTranslations } from "next-intl";

import {
  CheckCircleFilled,
  ClockCircleFilled,
  DeleteOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { Image, Spin } from "antd";
import type { UploadFile, UploadProps } from "antd";

import {
  BaseButton,
  BaseCheckbox,
  BaseForm,
  BaseUpload,
} from "@/components/common";
import { TrangThaiXacMinhUser } from "@/constants";
import { useFeedback, useUpload } from "@/hooks/common";

import { useCreateXacMinhUserMe, useXacMinhUserMe } from "../index.hooks";
import * as S from "../index.styles";

const { Dragger } = BaseUpload;

interface FormValues {
  frontImage?: UploadFile[];
  backImage?: UploadFile[];
  portraitImage?: UploadFile[];
}

const IndividualIdentityForm: React.FC = () => {
  const t = useTranslations("client.profile");
  const tv = useTranslations("validation");
  const { message } = useFeedback();
  const [form] = BaseForm.useForm();
  const { uploadPublic: uploadFront } = useUpload();
  const { uploadPublic: uploadBack } = useUpload();
  const { uploadPublic: uploadPortrait } = useUpload();

  const [consentChecked, setConsentChecked] = useState(false);
  const [isResubmitting, setIsResubmitting] = useState(false);

  const [previewFrontVisible, setPreviewFrontVisible] = useState(false);
  const [previewBackVisible, setPreviewBackVisible] = useState(false);
  const [previewPortraitVisible, setPreviewPortraitVisible] = useState(false);

  const [previewFrontSrc, setPreviewFrontSrc] = useState("");
  const [previewBackSrc, setPreviewBackSrc] = useState("");
  const [previewPortraitSrc, setPreviewPortraitSrc] = useState("");

  const { data: xacMinhData, isLoading, refetch } = useXacMinhUserMe();
  const { mutateAsync: createXacMinhRequest, isPending: isSaving } =
    useCreateXacMinhUserMe({
      onSuccess: () => {
        message.success(t("successSaveInfo"));
        refetch();
        setIsResubmitting(false);
        form.resetFields();
        setConsentChecked(false);
      },
    });

  const frontImageList = BaseForm.useWatch("frontImage", form) as
    | UploadFile[]
    | undefined;
  const backImageList = BaseForm.useWatch("backImage", form) as
    | UploadFile[]
    | undefined;
  const portraitImageList = BaseForm.useWatch("portraitImage", form) as
    | UploadFile[]
    | undefined;

  const frontFile = frontImageList?.[0];
  const backFile = backImageList?.[0];
  const portraitFile = portraitImageList?.[0];

  const getImageUrl = (file?: UploadFile) => {
    if (!file) return "";
    return (
      file.url ||
      (file.response as string) ||
      (file.originFileObj ? URL.createObjectURL(file.originFileObj) : "")
    );
  };

  const handleUploadFront = async (
    options: Parameters<Required<UploadProps>["customRequest"]>[0]
  ) => {
    const { file, onSuccess, onError } = options;
    try {
      const response = await uploadFront.mutateAsync({ file: file as File });
      onSuccess?.(response.data);
    } catch (err) {
      onError?.(err as Error);
    }
  };

  const handleUploadBack = async (
    options: Parameters<Required<UploadProps>["customRequest"]>[0]
  ) => {
    const { file, onSuccess, onError } = options;
    try {
      const response = await uploadBack.mutateAsync({ file: file as File });
      onSuccess?.(response.data);
    } catch (err) {
      onError?.(err as Error);
    }
  };

  const handleUploadPortrait = async (
    options: Parameters<Required<UploadProps>["customRequest"]>[0]
  ) => {
    const { file, onSuccess, onError } = options;
    try {
      const response = await uploadPortrait.mutateAsync({ file: file as File });
      onSuccess?.(response.data);
    } catch (err) {
      onError?.(err as Error);
    }
  };

  const handleFinish = async (values: FormValues) => {
    if (!consentChecked) {
      message.error(t("consentRequired"));
      return;
    }

    const frontUrl =
      values.frontImage?.[0]?.response || values.frontImage?.[0]?.url || "";
    const backUrl =
      values.backImage?.[0]?.response || values.backImage?.[0]?.url || "";
    const portraitUrl =
      values.portraitImage?.[0]?.response ||
      values.portraitImage?.[0]?.url ||
      "";

    if (!frontUrl) {
      message.error(t("frontIdRequired"));
      return;
    }
    if (!backUrl) {
      message.error(t("backIdRequired"));
      return;
    }
    if (!portraitUrl) {
      message.error(t("portraitRequired"));
      return;
    }

    try {
      await createXacMinhRequest({
        anhCccdTruoc: frontUrl,
        anhCccdSau: backUrl,
        anhChanDung: portraitUrl,
      });
    } catch (err) {
      console.error(err);
      message.error(t("errorUpdateAvatar"));
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (xacMinhData && !isResubmitting) {
    const status = xacMinhData.trangThai;
    const isPendingStatus = status === TrangThaiXacMinhUser.CHO_DUYET;
    const isApprovedStatus = status === TrangThaiXacMinhUser.DUYET;
    const isRejectedStatus = status === TrangThaiXacMinhUser.TU_CHOI;

    return (
      <S.StatusContainer>
        {isPendingStatus && (
          <>
            <S.StatusIconWrapper $status="pending">
              <ClockCircleFilled />
            </S.StatusIconWrapper>
            <S.StatusTitle>
              {t("verificationStatus")}: {t("statusPending")}
            </S.StatusTitle>
            <S.StatusDescription>
              {t("verificationPending")}
            </S.StatusDescription>
          </>
        )}

        {isApprovedStatus && (
          <>
            <S.StatusIconWrapper $status="approved">
              <CheckCircleFilled />
            </S.StatusIconWrapper>
            <S.StatusTitle>
              {t("verificationStatus")}: {t("statusApproved")}
            </S.StatusTitle>
            <S.StatusDescription>
              {t("verificationApproved")}
            </S.StatusDescription>
          </>
        )}

        {isRejectedStatus && (
          <>
            <S.StatusIconWrapper $status="rejected">
              <ExclamationCircleFilled />
            </S.StatusIconWrapper>
            <S.StatusTitle>
              {t("verificationStatus")}: {t("statusRejected")}
            </S.StatusTitle>
            <S.StatusDescription>
              {t("verificationRejected")}
            </S.StatusDescription>
            {xacMinhData.lyDoTuChoi && (
              <S.RejectReasonBox>
                <strong>{t("rejectReason")}: </strong>
                {xacMinhData.lyDoTuChoi}
              </S.RejectReasonBox>
            )}
          </>
        )}

        <S.StatusDetails>
          <S.StatusDetailItem>
            <span>{t("submittedAt")}</span>
            <span>
              {new Date(xacMinhData.createdAt).toLocaleString("vi-VN")}
            </span>
          </S.StatusDetailItem>
          {xacMinhData.ngayXacMinh && (
            <S.StatusDetailItem>
              <span>{t("processedAt")}</span>
              <span>
                {new Date(xacMinhData.ngayXacMinh).toLocaleString("vi-VN")}
              </span>
            </S.StatusDetailItem>
          )}
        </S.StatusDetails>

        <S.IdentityGrid style={{ width: "100%", maxWidth: 800 }}>
          <div>
            <p
              style={{
                fontWeight: 600,
                marginBottom: 8,
                fontSize: 13,
                textAlign: "center",
              }}
            >
              {t("uploadIdFront")}
            </p>
            <S.PreviewContainer>
              <img
                src={xacMinhData.anhCccdTruoc}
                alt="front ID"
                onClick={() => {
                  setPreviewFrontSrc(xacMinhData.anhCccdTruoc);
                  setPreviewFrontVisible(true);
                }}
                style={{ cursor: "pointer" }}
              />
            </S.PreviewContainer>
          </div>
          <div>
            <p
              style={{
                fontWeight: 600,
                marginBottom: 8,
                fontSize: 13,
                textAlign: "center",
              }}
            >
              {t("uploadIdBack")}
            </p>
            <S.PreviewContainer>
              <img
                src={xacMinhData.anhCccdSau}
                alt="back ID"
                onClick={() => {
                  setPreviewBackSrc(xacMinhData.anhCccdSau);
                  setPreviewBackVisible(true);
                }}
                style={{ cursor: "pointer" }}
              />
            </S.PreviewContainer>
          </div>
          <div>
            <p
              style={{
                fontWeight: 600,
                marginBottom: 8,
                fontSize: 13,
                textAlign: "center",
              }}
            >
              {t("uploadPortrait")}
            </p>
            <S.PreviewContainer>
              <img
                src={xacMinhData.anhChanDung}
                alt="portrait"
                onClick={() => {
                  setPreviewPortraitSrc(xacMinhData.anhChanDung);
                  setPreviewPortraitVisible(true);
                }}
                style={{ cursor: "pointer" }}
              />
            </S.PreviewContainer>
          </div>
        </S.IdentityGrid>

        {isRejectedStatus && (
          <BaseButton type="primary" onClick={() => setIsResubmitting(true)}>
            {t("reSubmit")}
          </BaseButton>
        )}

        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewFrontVisible,
            src: previewFrontSrc,
            onVisibleChange: (visible) => setPreviewFrontVisible(visible),
          }}
        />
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewBackVisible,
            src: previewBackSrc,
            onVisibleChange: (visible) => setPreviewBackVisible(visible),
          }}
        />
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewPortraitVisible,
            src: previewPortraitSrc,
            onVisibleChange: (visible) => setPreviewPortraitVisible(visible),
          }}
        />
      </S.StatusContainer>
    );
  }

  return (
    <BaseForm form={form} layout="vertical" onFinish={handleFinish}>
      <S.UploadContainer style={{ marginBottom: 20 }}>
        <div>
          <S.UploadTitle>{t("verifyIdentity")}</S.UploadTitle>
          <S.UploadSubTitle>{t("uploadLimits")}</S.UploadSubTitle>
        </div>

        <S.IdentityGrid>
          <S.DraggerWrapper>
            <BaseForm.Item
              name="frontImage"
              valuePropName="fileList"
              getValueFromEvent={(e: any) => {
                if (Array.isArray(e)) return e;
                return e && e.fileList;
              }}
              rules={[
                {
                  required: true,
                  message: tv("required", { field: t("uploadIdFront") }),
                },
              ]}
            >
              <Dragger
                name="front"
                multiple={false}
                maxCount={1}
                customRequest={handleUploadFront}
                accept="image/*"
                showUploadList={false}
              >
                {getImageUrl(frontFile) ? (
                  <S.PreviewContainer onClick={(e) => e.stopPropagation()}>
                    <img src={getImageUrl(frontFile)} alt="front" />
                    <S.PreviewOverlay className="preview-overlay">
                      <div style={{ display: "flex", gap: 16 }}>
                        <EyeOutlined
                          style={{
                            fontSize: 20,
                            color: "#fff",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewFrontSrc(getImageUrl(frontFile));
                            setPreviewFrontVisible(true);
                          }}
                        />
                        <DeleteOutlined
                          style={{
                            fontSize: 20,
                            color: "#fff",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            form.setFieldValue("frontImage", []);
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
                    <p className="upload-text">{t("uploadIdFront")}</p>
                    <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>
                      {t("uploadInstructions")}
                    </p>
                  </S.DraggerContent>
                )}
              </Dragger>
            </BaseForm.Item>
          </S.DraggerWrapper>

          <S.DraggerWrapper>
            <BaseForm.Item
              name="backImage"
              valuePropName="fileList"
              getValueFromEvent={(e: any) => {
                if (Array.isArray(e)) return e;
                return e && e.fileList;
              }}
              rules={[
                {
                  required: true,
                  message: tv("required", { field: t("uploadIdBack") }),
                },
              ]}
            >
              <Dragger
                name="back"
                multiple={false}
                maxCount={1}
                customRequest={handleUploadBack}
                accept="image/*"
                showUploadList={false}
              >
                {getImageUrl(backFile) ? (
                  <S.PreviewContainer onClick={(e) => e.stopPropagation()}>
                    <img src={getImageUrl(backFile)} alt="back" />
                    <S.PreviewOverlay className="preview-overlay">
                      <div style={{ display: "flex", gap: 16 }}>
                        <EyeOutlined
                          style={{
                            fontSize: 20,
                            color: "#fff",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewBackSrc(getImageUrl(backFile));
                            setPreviewBackVisible(true);
                          }}
                        />
                        <DeleteOutlined
                          style={{
                            fontSize: 20,
                            color: "#fff",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            form.setFieldValue("backImage", []);
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
                    <p className="upload-text">{t("uploadIdBack")}</p>
                    <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>
                      {t("uploadInstructions")}
                    </p>
                  </S.DraggerContent>
                )}
              </Dragger>
            </BaseForm.Item>
          </S.DraggerWrapper>

          <S.DraggerWrapper>
            <BaseForm.Item
              name="portraitImage"
              valuePropName="fileList"
              getValueFromEvent={(e: any) => {
                if (Array.isArray(e)) return e;
                return e && e.fileList;
              }}
              rules={[
                {
                  required: true,
                  message: tv("required", { field: t("uploadPortrait") }),
                },
              ]}
            >
              <Dragger
                name="portrait"
                multiple={false}
                maxCount={1}
                customRequest={handleUploadPortrait}
                accept="image/*"
                showUploadList={false}
              >
                {getImageUrl(portraitFile) ? (
                  <S.PreviewContainer onClick={(e) => e.stopPropagation()}>
                    <img src={getImageUrl(portraitFile)} alt="portrait" />
                    <S.PreviewOverlay className="preview-overlay">
                      <div style={{ display: "flex", gap: 16 }}>
                        <EyeOutlined
                          style={{
                            fontSize: 20,
                            color: "#fff",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewPortraitSrc(getImageUrl(portraitFile));
                            setPreviewPortraitVisible(true);
                          }}
                        />
                        <DeleteOutlined
                          style={{
                            fontSize: 20,
                            color: "#fff",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            form.setFieldValue("portraitImage", []);
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
                    <p className="upload-text">{t("uploadPortrait")}</p>
                    <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>
                      {t("uploadInstructions")}
                    </p>
                  </S.DraggerContent>
                )}
              </Dragger>
            </BaseForm.Item>
          </S.DraggerWrapper>
        </S.IdentityGrid>
      </S.UploadContainer>

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
        <div style={{ display: "flex", gap: 12 }}>
          <BaseButton
            type="primary"
            htmlType="submit"
            disabled={!consentChecked}
            loading={isSaving}
          >
            {t("saveInfo")}
          </BaseButton>
          {isResubmitting && (
            <BaseButton
              onClick={() => setIsResubmitting(false)}
              disabled={isSaving}
            >
              Hủy
            </BaseButton>
          )}
        </div>
      </BaseForm.Item>

      <Image
        wrapperStyle={{ display: "none" }}
        preview={{
          visible: previewFrontVisible,
          src: previewFrontSrc,
          onVisibleChange: (visible) => setPreviewFrontVisible(visible),
        }}
      />
      <Image
        wrapperStyle={{ display: "none" }}
        preview={{
          visible: previewBackVisible,
          src: previewBackSrc,
          onVisibleChange: (visible) => setPreviewBackVisible(visible),
        }}
      />
      <Image
        wrapperStyle={{ display: "none" }}
        preview={{
          visible: previewPortraitVisible,
          src: previewPortraitSrc,
          onVisibleChange: (visible) => setPreviewPortraitVisible(visible),
        }}
      />
    </BaseForm>
  );
};

export default IndividualIdentityForm;
