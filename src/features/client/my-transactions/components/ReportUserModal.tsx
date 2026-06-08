import React, { useState } from "react";

import { useTranslations } from "next-intl";

import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Select, Space, Upload, message } from "antd";

import { createReportUser } from "@/api/transactions";
import { BaseModal } from "@/components/common";
import { useUpload } from "@/hooks/common";

interface ReportUserModalProps {
  open: boolean;
  onClose: () => void;
  targetUserId: string;
  targetUsername: string;
}

export const ReportUserModal: React.FC<ReportUserModalProps> = ({
  open,
  onClose,
  targetUserId,
  targetUsername,
}) => {
  const t = useTranslations("myTransactions");
  const [form] = Form.useForm();
  const { uploadPublic } = useUpload();
  const [imageList, setImageList] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uidToUrl, setUidToUrl] = useState<Record<string, string>>({});

  const reportMutation = useMutation({
    mutationFn: createReportUser,
    onSuccess: () => {
      message.success(t("report.successMessage"));
      form.resetFields();
      setImageList([]);
      onClose();
    },
    onError: () => {
      message.error(t("report.errorMessage"));
    },
  });

  const handleCustomUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    setUploading(true);
    try {
      const res = await uploadPublic.mutateAsync({ file: file as File });
      if (res.success && res.data) {
        const url = res.data as string;
        setUidToUrl((prev) => ({ ...prev, [file.uid]: url }));
        setImageList((prev) => [...prev, url]);
        onSuccess("Ok");
      } else {
        onError(new Error("Upload failed"));
      }
    } catch (err) {
      onError(err);
    } finally {
      setUploading(false);
    }
  };

  const onFinish = (values: any) => {
    reportMutation.mutate({
      nguoiBiToCaoId: targetUserId,
      loai: values.loai,
      tieuDe: values.tieuDe,
      noiDung: values.noiDung,
      danhSachHinhAnh: imageList,
    });
  };

  return (
    <BaseModal
      open={open}
      onCancel={onClose}
      title={t("report.title", { username: targetUsername })}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="loai"
          label={t("report.reasonLabel")}
          rules={[{ required: true, message: t("report.reasonRequired") }]}
        >
          <Select
            options={[
              {
                value: "BO_THAU_DAU_GIA",
                label: t("report.reasons.BO_THAU_DAU_GIA"),
              },
              {
                value: "VI_PHAM_QUY_CHE",
                label: t("report.reasons.VI_PHAM_QUY_CHE"),
              },
              { value: "KHAC", label: t("report.reasons.KHAC") },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="tieuDe"
          label={t("report.titleLabel")}
          rules={[{ required: true, message: t("report.titleRequired") }]}
        >
          <Input placeholder={t("report.titlePlaceholder")} />
        </Form.Item>

        <Form.Item
          name="noiDung"
          label={t("report.contentLabel")}
          rules={[{ required: true, message: t("report.contentRequired") }]}
        >
          <Input.TextArea
            rows={4}
            placeholder={t("report.contentPlaceholder")}
          />
        </Form.Item>

        <Form.Item label={t("report.attachments")}>
          <Upload
            customRequest={handleCustomUpload}
            listType="picture"
            maxCount={3}
            onRemove={(file) => {
              const url = uidToUrl[file.uid];
              if (url) {
                setImageList((prev) => prev.filter((u) => u !== url));
                setUidToUrl((prev) => {
                  const next = { ...prev };
                  delete next[file.uid];
                  return next;
                });
              }
            }}
          >
            <Button icon={<UploadOutlined />} loading={uploading}>
              {t("report.uploadBtn")}
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
          <Space>
            <Button onClick={onClose}>{t("report.cancel")}</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={reportMutation.isPending}
            >
              {t("report.submit")}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </BaseModal>
  );
};
