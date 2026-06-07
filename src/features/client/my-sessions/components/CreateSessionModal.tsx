"use client";

import React, { useMemo, useState } from "react";

import { useTranslations } from "next-intl";

import { UploadOutlined } from "@ant-design/icons";
import { UseMutationResult } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";

import {
  BaseButton,
  BaseCol,
  BaseDatePicker,
  BaseForm,
  BaseInput,
  BaseModal,
  BaseRow,
  BaseSelect,
  BaseSwitch,
  BaseUpload,
} from "@/components/common";
import { LoaiPhien, LoaiTieuChi } from "@/constants";
import * as S from "@/features/client/my-sessions/index.styles";
import { useFeedback, useUpload } from "@/hooks/common";
import { ApiError } from "@/interfaces";
import { ResponseData } from "@/interfaces/common";
import {
  AuctionSession,
  CreateAuctionSessionDto,
  CreateTenderSessionDto,
  TenderSession,
} from "@/interfaces/sessions";
import { toSnakeCase } from "@/utils/common";

import { getErrorMessage } from "../index.utils";
import { AuctionFields } from "./AuctionFields";
import { TenderFields } from "./TenderFields";

interface CreateSessionModalProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  createAuction: UseMutationResult<
    ResponseData<AuctionSession>,
    ApiError,
    CreateAuctionSessionDto
  >;
  createTender: UseMutationResult<
    ResponseData<TenderSession>,
    ApiError,
    CreateTenderSessionDto
  >;
  editingSession?: AuctionSession | TenderSession | null;
  updateAuction?: UseMutationResult<
    ResponseData<AuctionSession>,
    ApiError,
    { id: string; data: Partial<CreateAuctionSessionDto> }
  >;
  updateTender?: UseMutationResult<
    ResponseData<TenderSession>,
    ApiError,
    { id: string; data: Partial<CreateTenderSessionDto> }
  >;
}

interface UploadRequestOptions {
  file: File | string | Blob;
  onSuccess: (body: unknown) => void;
  onError: (error: Error) => void;
}

interface FormValues {
  tieuDe: string;
  moTa: string;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
  anDanh?: boolean;
  danhSachHinhAnh?: string[];
  giaKhoiDiem?: string | number;
  buocGia?: string | number;
  diemKyThuatToiThieu?: string | number;
  tieuChi?: Array<{
    tenTieuChi: string;
    maTieuChi: string;
    loai: string;
    trongSo: string | number;
    huongToiUu?: string;
    donVi?: string;
    batBuoc?: boolean;
    giaTriToiThieu?: string | number;
    giaTriToiDa?: string | number;
    cacLuaChon?: Array<{
      nhan: string;
      giaTri: string | number;
    }>;
  }>;
}

const CreateSessionModal: React.FC<CreateSessionModalProps> = ({
  open,
  onCancel,
  onSuccess,
  createAuction,
  createTender,
  editingSession,
  updateAuction,
  updateTender,
}) => {
  const t = useTranslations("mySessionsPage");
  const tCommon = useTranslations("common");
  const [form] = BaseForm.useForm();
  const { uploadPublic } = useUpload();
  const { message } = useFeedback();

  const isTenderSession = editingSession
    ? "diemKyThuatToiThieu" in editingSession
    : false;

  const [sessionType, setSessionType] = useState<LoaiPhien>(
    editingSession
      ? isTenderSession
        ? LoaiPhien.DAU_THAU
        : LoaiPhien.DAU_GIA
      : LoaiPhien.DAU_GIA
  );
  const [imageList, setImageList] = useState<string[]>(
    editingSession?.danhSachHinhAnh || []
  );
  const [uploading, setUploading] = useState<boolean>(false);

  const initialFormValues = useMemo(() => {
    if (!editingSession) {
      return {
        tieuDe: "",
        moTa: "",
        anDanh: false,
        diemKyThuatToiThieu: 50,
      };
    }

    const baseValues: any = {
      tieuDe: editingSession.tieuDe,
      moTa: editingSession.moTa || "",
      thoiGianBatDau: editingSession.thoiGianBatDau
        ? dayjs(editingSession.thoiGianBatDau)
        : null,
      thoiGianKetThuc: editingSession.thoiGianKetThuc
        ? dayjs(editingSession.thoiGianKetThuc)
        : null,
      anDanh: !!editingSession.anDanh,
      danhSachHinhAnh: editingSession.danhSachHinhAnh || [],
    };

    if (isTenderSession) {
      const tender = editingSession as TenderSession;
      baseValues.diemKyThuatToiThieu = tender.diemKyThuatToiThieu;
      if (tender.tieuChi) {
        baseValues.tieuChi = tender.tieuChi.map((c) => ({
          tenTieuChi: c.tenTieuChi,
          maTieuChi: c.maTieuChi,
          loai: c.loai,
          trongSo: c.trongSo,
          huongToiUu: c.huongToiUu,
          batBuoc: !!c.batBuoc,
          donVi: c.donVi,
          giaTriToiThieu: c.giaTriToiThieu,
          giaTriToiDa: c.giaTriToiDa,
          cacLuaChon: c.cacLuaChon
            ? c.cacLuaChon.map((opt: any) => ({
                nhan: opt.nhan,
                giaTri: opt.giaTri,
              }))
            : undefined,
        }));
      }
    } else {
      const auction = editingSession as AuctionSession;
      baseValues.giaKhoiDiem = auction.giaKhoiDiem;
      baseValues.buocGia = auction.buocGia;
    }

    return baseValues;
  }, [editingSession, isTenderSession]);

  const handleUpload = async (options: unknown) => {
    const uploadOpts = options as UploadRequestOptions;
    const { file, onSuccess: uploadSuccess, onError: uploadError } = uploadOpts;
    setUploading(true);
    try {
      const res = await uploadPublic.mutateAsync({ file: file as File });
      if (res.data) {
        const newImages = [...imageList, res.data];
        setImageList(newImages);
        form.setFieldValue("danhSachHinhAnh", newImages);
        uploadSuccess("ok");
        message.success(t("uploadSuccess"));
      }
    } catch (err) {
      uploadError(err as Error);
      message.error(t("uploadError"));
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = imageList.filter((_, i) => i !== index);
    setImageList(newImages);
    form.setFieldValue("danhSachHinhAnh", newImages);
  };

  const handleFinish = async (values: FormValues) => {
    const start = dayjs(values.thoiGianBatDau);
    const end = dayjs(values.thoiGianKetThuc);
    if (!editingSession && start.isBefore(dayjs())) {
      message.error(t("validationStartTimeFuture"));
      return;
    }
    if (end.isBefore(start)) {
      message.error(t("validationEndTimeAfterStart"));
      return;
    }

    const payload = {
      tieuDe: values.tieuDe,
      moTa: values.moTa,
      thoiGianBatDau: start.toISOString(),
      thoiGianKetThuc: end.toISOString(),
      danhSachHinhAnh: imageList,
      anDanh: !!values.anDanh,
    };

    if (sessionType === LoaiPhien.DAU_GIA) {
      const auctionPayload: CreateAuctionSessionDto = {
        ...payload,
        giaKhoiDiem: Number(values.giaKhoiDiem),
        buocGia: Number(values.buocGia),
      };
      try {
        if (editingSession) {
          if (updateAuction) {
            await updateAuction.mutateAsync({
              id: editingSession._id,
              data: auctionPayload,
            });
            message.success(t("updateSuccess"));
          }
        } else {
          await createAuction.mutateAsync(auctionPayload);
          message.success(t("createSuccess"));
        }
        handleClose();
      } catch (err) {
        message.error(
          getErrorMessage(err) ||
            (editingSession ? t("updateAuctionError") : t("createAuctionError"))
        );
      }
    } else {
      const criteria = values.tieuChi || [];
      if (criteria.length === 0) {
        message.error(t("validationTenderCriteriaRequired"));
        return;
      }
      const totalWeight = criteria.reduce(
        (sum: number, c) => sum + Number(c?.trongSo || 0),
        0
      );
      if (totalWeight !== 100) {
        message.error(t("validationWeightSum"));
        return;
      }

      const formattedCriteria = criteria.map((c) => ({
        tenTieuChi: c.tenTieuChi,
        maTieuChi: c.maTieuChi || toSnakeCase(c.tenTieuChi),
        loai: c.loai,
        trongSo: Number(c.trongSo),
        huongToiUu: c.huongToiUu,
        batBuoc: !!c.batBuoc,
        donVi: c.donVi,
        giaTriToiThieu:
          c.loai !== LoaiTieuChi.LUA_CHON && c.giaTriToiThieu
            ? Number(c.giaTriToiThieu)
            : undefined,
        giaTriToiDa:
          c.loai !== LoaiTieuChi.LUA_CHON && c.giaTriToiDa
            ? Number(c.giaTriToiDa)
            : undefined,
        cacLuaChon:
          c.loai === LoaiTieuChi.LUA_CHON && c.cacLuaChon
            ? c.cacLuaChon.map((opt) => ({
                nhan: opt.nhan,
                giaTri: Number(opt.giaTri),
              }))
            : undefined,
      }));

      const tenderPayload: CreateTenderSessionDto = {
        ...payload,
        diemKyThuatToiThieu: Number(values.diemKyThuatToiThieu || 50),
        tieuChi: formattedCriteria,
      };

      try {
        if (editingSession) {
          if (updateTender) {
            await updateTender.mutateAsync({
              id: editingSession._id,
              data: tenderPayload,
            });
            message.success(t("updateSuccess"));
          }
        } else {
          await createTender.mutateAsync(tenderPayload);
          message.success(t("createSuccess"));
        }
        handleClose();
      } catch (err) {
        message.error(
          getErrorMessage(err) ||
            (editingSession ? t("updateTenderError") : t("createTenderError"))
        );
      }
    }
  };

  const handleClose = () => {
    form.resetFields();
    setImageList([]);
    onCancel();
    onSuccess();
  };

  const isPending =
    createAuction.isPending ||
    createTender.isPending ||
    updateAuction?.isPending ||
    updateTender?.isPending;

  return (
    <BaseModal
      open={open}
      title={
        editingSession
          ? sessionType === LoaiPhien.DAU_GIA
            ? t("editAuctionTitle")
            : t("editTenderTitle")
          : sessionType === LoaiPhien.DAU_GIA
            ? t("createAuctionTitle")
            : t("createTenderTitle")
      }
      onCancel={handleClose}
      footer={null}
      width={sessionType === LoaiPhien.DAU_GIA ? 700 : 900}
      destroyOnClose
    >
      <S.TypeSelectorWrapper>
        <S.TypeSelectorLabel>{t("sessionTypeLabel")}</S.TypeSelectorLabel>
        <BaseSelect
          value={sessionType}
          disabled={!!editingSession}
          onChange={(val) => {
            setSessionType(val as LoaiPhien);
            form.resetFields();
            setImageList([]);
          }}
          options={[
            { label: t("tabAuction"), value: LoaiPhien.DAU_GIA },
            { label: t("tabTender"), value: LoaiPhien.DAU_THAU },
          ]}
          style={{ width: 200 }}
        />
      </S.TypeSelectorWrapper>

      <BaseForm
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        initialValues={initialFormValues}
      >
        <BaseRow gutter={16}>
          <BaseCol span={12}>
            <BaseForm.Item
              name="tieuDe"
              label={t("formTitle")}
              rules={[{ required: true, message: t("validationRequired") }]}
            >
              <BaseInput placeholder={t("formTitle")} />
            </BaseForm.Item>
          </BaseCol>
          <BaseCol span={12}>
            <BaseForm.Item
              name="anDanh"
              label={t("formAnonymous")}
              valuePropName="checked"
            >
              <BaseSwitch />
            </BaseForm.Item>
          </BaseCol>
        </BaseRow>

        <BaseForm.Item
          name="moTa"
          label={t("formDesc")}
          rules={[{ required: true, message: t("validationRequired") }]}
        >
          <BaseInput.TextArea rows={3} placeholder={t("formDesc")} />
        </BaseForm.Item>

        <BaseRow gutter={16}>
          <BaseCol span={12}>
            <BaseForm.Item
              name="thoiGianBatDau"
              label={t("formStartTime")}
              rules={[{ required: true, message: t("validationRequired") }]}
            >
              <BaseDatePicker
                showTime
                style={{ width: "100%" }}
                disabledDate={(current: Dayjs) =>
                  current && current.isBefore(dayjs().startOf("day"))
                }
              />
            </BaseForm.Item>
          </BaseCol>
          <BaseCol span={12}>
            <BaseForm.Item
              name="thoiGianKetThuc"
              label={t("formEndTime")}
              rules={[{ required: true, message: t("validationRequired") }]}
            >
              <BaseDatePicker
                showTime
                style={{ width: "100%" }}
                disabledDate={(current: Dayjs) =>
                  current && current.isBefore(dayjs().startOf("day"))
                }
              />
            </BaseForm.Item>
          </BaseCol>
        </BaseRow>

        {sessionType === LoaiPhien.DAU_GIA ? (
          <AuctionFields t={t} />
        ) : (
          <TenderFields t={t} />
        )}

        <BaseForm.Item label={t("formImages")}>
          <BaseUpload
            customRequest={handleUpload}
            showUploadList={false}
            accept="image/*"
            disabled={uploading}
          >
            <BaseButton icon={<UploadOutlined />} loading={uploading}>
              {t("uploadBtn")}
            </BaseButton>
          </BaseUpload>
          <S.UploadPreviewWrapper>
            {imageList.map((url, index) => (
              <S.UploadItem key={url}>
                <S.UploadPreviewImage src={url} alt={`upload-${index}`} />
                <S.DeleteButton onClick={() => removeImage(index)}>
                  X
                </S.DeleteButton>
              </S.UploadItem>
            ))}
          </S.UploadPreviewWrapper>
        </BaseForm.Item>

        <S.ActionButtonContainer
          style={{ justifyContent: "flex-end", marginTop: "2rem" }}
        >
          <BaseButton onClick={handleClose} disabled={isPending}>
            {tCommon("cancel")}
          </BaseButton>
          <BaseButton type="primary" htmlType="submit" loading={isPending}>
            {tCommon("save")}
          </BaseButton>
        </S.ActionButtonContainer>
      </BaseForm>
    </BaseModal>
  );
};

export default CreateSessionModal;
