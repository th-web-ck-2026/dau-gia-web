"use client";

import React from "react";

import { useRouter } from "next/navigation";

import {
  ArrowLeftOutlined,
  TeamOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

import { getTenderDetail, getTenderRanking } from "@/api/tender";
import {
  BaseButton,
  BaseCard,
  BaseSpin,
  BaseTable,
  BaseTag,
  BaseTypography,
} from "@/components/common";
import { useAppQuery } from "@/hooks/common";

const { Title, Paragraph } = BaseTypography;

interface Props {
  id: string;
}

export default function HostRankingFeature({ id }: Props) {
  const router = useRouter();

  // Load Tender Details
  const { data: sessionRes, isLoading: isDetailLoading } = useAppQuery({
    queryKey: ["tenderDetailRank", id],
    queryFn: () => getTenderDetail(id),
  });

  // Load Rankings
  const { data: rankingRes, isLoading: isRankLoading } = useAppQuery({
    queryKey: ["tenderRanking", id],
    queryFn: () => getTenderRanking(id),
  });

  const columns = [
    {
      title: "Thứ hạng",
      dataIndex: "thuHang",
      key: "thuHang",
      width: 100,
      render: (rank: number) => {
        if (rank === 1)
          return (
            <TrophyOutlined style={{ color: "#eab308", fontSize: "1.25rem" }} />
          );
        return rank;
      },
    },
    {
      title: "Nhà thầu",
      dataIndex: "bietDanh",
      key: "bietDanh",
      render: (name: string) => <span style={{ fontWeight: 600 }}>{name}</span>,
    },
    {
      title: "Điểm kỹ thuật",
      dataIndex: "diemKyThuat",
      key: "diemKyThuat",
      render: (val?: number) => val?.toFixed(2) || "---",
    },
    {
      title: "Điểm giá",
      dataIndex: "diemGia",
      key: "diemGia",
      render: (val?: number) => val?.toFixed(2) || "---",
    },
    {
      title: "Điểm tổng hợp",
      dataIndex: "diemTongHop",
      key: "diemTongHop",
      render: (val?: number) => (
        <span style={{ fontWeight: 700, color: "#2563eb" }}>
          {val?.toFixed(2) || "---"}
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (val: string) => {
        if (val === "HOP_LE" || val === "DAN_DAU")
          return <BaseTag color="green">Hợp lệ</BaseTag>;
        if (val === "THANG") return <BaseTag color="gold">Thắng thầu</BaseTag>;
        if (val === "BI_TU_CHOI")
          return <BaseTag color="red">Bị từ chối</BaseTag>;
        return <BaseTag color="default">{val}</BaseTag>;
      },
    },
  ];

  const isLoading = isDetailLoading || isRankLoading;

  return (
    <div
      style={{ maxWidth: 1280, margin: "0 auto", padding: "2.25rem 1.5rem" }}
    >
      <div style={{ marginBottom: "1.5rem" }}>
        <BaseButton icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
          Quay lại quản lý Host
        </BaseButton>
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <BaseSpin size="large" />
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div>
            <Title level={2}>Bảng xếp hạng điểm thầu chi tiết</Title>
            <Paragraph style={{ color: "#6b7280" }}>
              Phiên thầu: <strong>{sessionRes?.data?.tieuDe}</strong>
              <br />
              Trọng số chấm điểm:{" "}
              {((sessionRes?.data?.trongSoKyThuat ?? 0) * 100).toFixed(0)}% kỹ
              thuật / {((sessionRes?.data?.trongSoGia ?? 0) * 100).toFixed(0)}%
              thương mại
            </Paragraph>
          </div>

          <BaseCard
            title={
              <span>
                <TeamOutlined style={{ marginRight: "0.5rem" }} />
                Danh sách xếp hạng hồ sơ thầu nộp vào
              </span>
            }
          >
            <BaseTable
              columns={columns}
              dataSource={rankingRes?.data?.danhSach || []}
              rowKey="deXuatId"
              pagination={false}
              bordered
            />
          </BaseCard>
        </div>
      )}
    </div>
  );
}
