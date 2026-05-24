"use client";

import React, { useState } from "react";

import {
  CheckOutlined,
  CloseOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

import { getTenders, publishTender } from "@/api/tender";
import {
  BaseButton,
  BaseCard,
  BaseInput,
  BaseModal,
  BaseSpin,
  BaseTable,
  BaseTag,
  BaseTypography,
} from "@/components/common";
import { useAppQuery, useFeedback } from "@/hooks/common";
import { TrangThaiPhien } from "@/interfaces/tender";

const { Title, Paragraph } = BaseTypography;

export default function AdminModerationFeature() {
  const { message } = useFeedback();
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );
  const [rejectReason, setRejectReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load pending tenders / sessions
  const {
    data: tendersRes,
    isLoading,
    refetch,
  } = useAppQuery({
    queryKey: ["adminPendingSessions"],
    queryFn: () => getTenders(),
  });

  const handleApprove = async (id: string) => {
    try {
      await publishTender(id);
      message.success("Phê duyệt và công bố phiên thành công!");
      refetch();
    } catch {
      message.error("Có lỗi xảy ra khi phê duyệt phiên thầu!");
    }
  };

  const handleRejectClick = (id: string) => {
    setSelectedSessionId(id);
    setRejectReason("");
    setRejectModalOpen(true);
  };

  const handleRejectSubmit = async () => {
    if (!rejectReason) {
      message.error("Vui lòng nhập lý do từ chối!");
      return;
    }

    setIsSubmitting(true);
    // Simulate rejecting
    setTimeout(() => {
      message.success(
        `Đã từ chối phiên thầu ${selectedSessionId} với lý do: ${rejectReason}`
      );
      setRejectModalOpen(false);
      setIsSubmitting(false);
      refetch();
    }, 1000);
  };

  // Filter only those in draft/pending state if applicable
  const pendingData = (tendersRes?.data || []).filter(
    (item) =>
      item.trangThai === TrangThaiPhien.NHAP ||
      item.trangThai === TrangThaiPhien.CONG_BO
  );

  const columns = [
    { title: "Mã phiên", dataIndex: "_id", key: "_id", width: 120 },
    { title: "Tiêu đề gói thầu", dataIndex: "tieuDe", key: "tieuDe" },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "thoiGianBatDau",
      key: "thoiGianBatDau",
      render: (val: string) => new Date(val).toLocaleString(),
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (val: TrangThaiPhien) => <BaseTag color="orange">{val}</BaseTag>,
    },
    {
      title: "Hành động duyệt",
      key: "actions",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <BaseButton
            type="primary"
            size="small"
            icon={<CheckOutlined />}
            onClick={() => handleApprove(record._id)}
          >
            Duyệt
          </BaseButton>
          <BaseButton
            danger
            size="small"
            icon={<CloseOutlined />}
            onClick={() => handleRejectClick(record._id)}
          >
            Từ chối
          </BaseButton>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{ maxWidth: 1280, margin: "0 auto", padding: "2.25rem 1.5rem" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <SafetyCertificateOutlined
          style={{ fontSize: "2rem", color: "#10b981" }}
        />
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Cổng phê duyệt Admin
          </Title>
          <Paragraph style={{ color: "#6b7280", margin: 0 }}>
            Kiểm duyệt hồ sơ pháp lý và điều kiện của các phiên thầu chuẩn bị
            hoạt động
          </Paragraph>
        </div>
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <BaseSpin size="large" />
        </div>
      ) : (
        <BaseCard title="Danh sách các phiên đấu thầu đang chờ phê duyệt">
          <BaseTable
            columns={columns}
            dataSource={pendingData}
            rowKey="_id"
            bordered
            pagination={{ pageSize: 10 }}
          />
        </BaseCard>
      )}

      {/* Reject Reason input modal */}
      <BaseModal
        title="Từ chối phê duyệt phiên thầu"
        open={rejectModalOpen}
        onOk={handleRejectSubmit}
        onCancel={() => setRejectModalOpen(false)}
        confirmLoading={isSubmitting}
      >
        <div style={{ padding: "0.5rem 0" }}>
          <Paragraph>
            Vui lòng ghi rõ lý do từ chối để gửi phản hồi cho Host:
          </Paragraph>
          <BaseInput.TextArea
            rows={4}
            placeholder="Nhập lý do từ chối..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </div>
      </BaseModal>
    </div>
  );
}
