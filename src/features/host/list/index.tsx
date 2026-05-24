"use client";

import React from "react";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { closeAuction, getAuctions } from "@/api/auction";
import { closeTender, getTenders, publishTender } from "@/api/tender";
import {
  BaseButton,
  BaseCard,
  BaseSpin,
  BaseTable,
  BaseTag,
  BaseTypography,
} from "@/components/common";
import { useAppQuery, useFeedback } from "@/hooks/common";
import { TrangThaiPhien } from "@/interfaces/tender";

import { formatCurrency } from "../../sessions/list/index.utils";

const { Title, Paragraph } = BaseTypography;

export default function HostSessionListFeature() {
  const router = useRouter();
  const locale = useLocale();
  const { message } = useFeedback();

  // Load Host Tenders
  const {
    data: tendersRes,
    isLoading: isTendersLoading,
    refetch: refetchTenders,
  } = useAppQuery({
    queryKey: ["hostTenders"],
    queryFn: () => getTenders(),
  });

  // Load Host Auctions
  const {
    data: auctionsRes,
    isLoading: isAuctionsLoading,
    refetch: refetchAuctions,
  } = useAppQuery({
    queryKey: ["hostAuctions"],
    queryFn: () => getAuctions(),
  });

  const handlePublish = async (id: string) => {
    try {
      await publishTender(id);
      message.success("Đã công bố phiên đấu thầu!");
      refetchTenders();
    } catch {
      message.error("Có lỗi xảy ra khi công bố phiên thầu!");
    }
  };

  const handleClose = async (id: string, isAuction: boolean) => {
    try {
      if (isAuction) {
        await closeAuction(id);
        message.success("Đã đóng phiên đấu giá!");
        refetchAuctions();
      } else {
        await closeTender(id);
        message.success("Đã đóng phiên đấu thầu!");
        refetchTenders();
      }
    } catch {
      message.error("Có lỗi xảy ra khi đóng phiên!");
    }
  };

  const getStatusTag = (statusVal: TrangThaiPhien) => {
    switch (statusVal) {
      case TrangThaiPhien.MO:
        return <BaseTag color="green">Đang mở thầu</BaseTag>;
      case TrangThaiPhien.CONG_BO:
        return <BaseTag color="blue">Đã công bố</BaseTag>;
      case TrangThaiPhien.DONG:
        return <BaseTag color="red">Đã đóng</BaseTag>;
      case TrangThaiPhien.HUY:
        return <BaseTag color="default">Đã hủy</BaseTag>;
      default:
        return <BaseTag color="orange">Bản nháp</BaseTag>;
    }
  };

  const tenderColumns = [
    { title: "Tiêu đề", dataIndex: "tieuDe", key: "tieuDe" },
    {
      title: "Giá trần",
      dataIndex: "giaToiDa",
      key: "giaToiDa",
      render: (val: number) => formatCurrency(val, locale),
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (val: TrangThaiPhien) => getStatusTag(val),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {record.trangThai === TrangThaiPhien.NHAP && (
            <>
              <BaseButton
                size="small"
                icon={<EditOutlined />}
                onClick={() =>
                  router.push(`/${locale}/host/sessions/${record._id}/edit`)
                }
              >
                Sửa
              </BaseButton>
              <BaseButton
                size="small"
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => handlePublish(record._id)}
              >
                Công bố
              </BaseButton>
            </>
          )}
          {record.trangThai === TrangThaiPhien.MO && (
            <BaseButton
              size="small"
              danger
              icon={<CloseCircleOutlined />}
              onClick={() => handleClose(record._id, false)}
            >
              Đóng thầu
            </BaseButton>
          )}
          <BaseButton
            size="small"
            icon={<EyeOutlined />}
            onClick={() =>
              router.push(`/${locale}/host/sessions/${record._id}/ranking`)
            }
          >
            Bảng xếp hạng
          </BaseButton>
        </div>
      ),
    },
  ];

  const auctionColumns = [
    { title: "Tiêu đề", dataIndex: "tieuDe", key: "tieuDe" },
    {
      title: "Giá hiện tại",
      dataIndex: "giaHienTai",
      key: "giaHienTai",
      render: (val: number) => formatCurrency(val, locale),
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (val: TrangThaiPhien) => getStatusTag(val),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {record.trangThai === TrangThaiPhien.MO && (
            <BaseButton
              size="small"
              danger
              icon={<CloseCircleOutlined />}
              onClick={() => handleClose(record._id, true)}
            >
              Đóng phiên
            </BaseButton>
          )}
          <BaseButton
            size="small"
            icon={<EyeOutlined />}
            onClick={() => router.push(`/${locale}/sessions/${record._id}`)}
          >
            Xem live
          </BaseButton>
        </div>
      ),
    },
  ];

  const isLoading = isTendersLoading || isAuctionsLoading;

  return (
    <div
      style={{ maxWidth: 1280, margin: "0 auto", padding: "2.25rem 1.5rem" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Bảng quản lý của Host
          </Title>
          <Paragraph style={{ color: "#6b7280", margin: 0 }}>
            Quản lý, chỉnh sửa, xem xếp hạng và công bố các gói thầu
          </Paragraph>
        </div>
        <BaseButton
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => router.push(`/${locale}/host/sessions/new`)}
        >
          Tạo phiên mới
        </BaseButton>
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <BaseSpin size="large" />
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <BaseCard title="Danh sách các phiên Đấu Thầu (Tendering)">
            <BaseTable
              columns={tenderColumns}
              dataSource={tendersRes?.data || []}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
            />
          </BaseCard>

          <BaseCard title="Danh sách các phiên Đấu Giá (Auctions)">
            <BaseTable
              columns={auctionColumns}
              dataSource={auctionsRes?.data || []}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
            />
          </BaseCard>
        </div>
      )}
    </div>
  );
}
