"use client";

import React from "react";

import {
  DollarCircleOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatCurrency } from "@/constants/common";

import { useGetAdminStats } from "./index.hooks";
import * as S from "./index.styles";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const AdminThongKeDashboard: React.FC = () => {
  const { data, isLoading } = useGetAdminStats();

  if (isLoading || !data?.data) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "100px 0",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  const stats = data.data;

  // Pie chart data: User type distribution
  const userTypeData = [
    { name: "Cá nhân", value: stats.users.byType.CA_NHAN || 0 },
    { name: "Tổ chức", value: stats.users.byType.TO_CHUC || 0 },
  ];

  // Bar chart data: Comparison of Auction vs Tender states
  const comparisonData = [
    {
      name: "Nháp (Draft)",
      "Đấu giá": stats.auctions.draft || 0,
      "Đấu thầu": stats.tenders.draft || 0,
    },
    {
      name: "Mở (Open)",
      "Đấu giá": stats.auctions.open || 0,
      "Đấu thầu": stats.tenders.open || 0,
    },
    {
      name: "Đóng (Closed)",
      "Đấu giá": stats.auctions.closed || 0,
      "Đấu thầu": stats.tenders.closed || 0,
    },
    {
      name: "Thành công",
      "Đấu giá": stats.auctions.successful || 0,
      "Đấu thầu": stats.tenders.successful || 0,
    },
  ];

  return (
    <S.ContentRoot>
      <S.DashboardHeader>
        <S.DashboardTitle>Thống kê hệ thống</S.DashboardTitle>
      </S.DashboardHeader>

      <S.StatsGrid>
        {/* Users Card */}
        <S.MetricCard>
          <S.MetricHeader>
            <S.MetricTitle>Người dùng</S.MetricTitle>
            <S.MetricIconWrapper $color="#3b82f6" $bg="rgba(59, 130, 246, 0.1)">
              <UserOutlined />
            </S.MetricIconWrapper>
          </S.MetricHeader>
          <S.MetricValue>{stats.users.total}</S.MetricValue>
          <S.MetricSubText>
            <S.MetricSubItem>
              <span>Đang hoạt động:</span>
              <span style={{ fontWeight: 600, color: "#10b981" }}>
                {stats.users.active}
              </span>
            </S.MetricSubItem>
            <S.MetricSubItem>
              <span>Bị khóa:</span>
              <span style={{ fontWeight: 600, color: "#ef4444" }}>
                {stats.users.blocked}
              </span>
            </S.MetricSubItem>
            <S.MetricSubItem>
              <span>Đã xác minh:</span>
              <span style={{ fontWeight: 600, color: "#3b82f6" }}>
                {stats.users.verified}
              </span>
            </S.MetricSubItem>
          </S.MetricSubText>
        </S.MetricCard>

        {/* Auctions Card */}
        <S.MetricCard>
          <S.MetricHeader>
            <S.MetricTitle>Phiên Đấu Giá</S.MetricTitle>
            <S.MetricIconWrapper $color="#10b981" $bg="rgba(16, 185, 129, 0.1)">
              <DollarCircleOutlined />
            </S.MetricIconWrapper>
          </S.MetricHeader>
          <S.MetricValue>{stats.auctions.total}</S.MetricValue>
          <S.MetricSubText>
            <S.MetricSubItem>
              <span>Thành công:</span>
              <span style={{ fontWeight: 600, color: "#10b981" }}>
                {stats.auctions.successful}
              </span>
            </S.MetricSubItem>
            <S.MetricSubItem>
              <span>Tổng lượt đặt giá:</span>
              <span style={{ fontWeight: 600 }}>
                {stats.auctions.totalBids}
              </span>
            </S.MetricSubItem>
            <S.MetricSubItem>
              <span>Giá trị thắng cuộc:</span>
              <span style={{ fontWeight: 600, color: "#f59e0b" }}>
                {formatCurrency(stats.auctions.totalWinningValue, "đ")}
              </span>
            </S.MetricSubItem>
          </S.MetricSubText>
        </S.MetricCard>

        {/* Tenders Card */}
        <S.MetricCard>
          <S.MetricHeader>
            <S.MetricTitle>Phiên Đấu Thầu</S.MetricTitle>
            <S.MetricIconWrapper $color="#f59e0b" $bg="rgba(245, 158, 11, 0.1)">
              <FileTextOutlined />
            </S.MetricIconWrapper>
          </S.MetricHeader>
          <S.MetricValue>{stats.tenders.total}</S.MetricValue>
          <S.MetricSubText>
            <S.MetricSubItem>
              <span>Thành công:</span>
              <span style={{ fontWeight: 600, color: "#10b981" }}>
                {stats.tenders.successful}
              </span>
            </S.MetricSubItem>
            <S.MetricSubItem>
              <span>Hồ sơ đã nộp:</span>
              <span style={{ fontWeight: 600 }}>
                {stats.tenders.totalSubmissions}
              </span>
            </S.MetricSubItem>
            <S.MetricSubItem>
              <span>Đang mở thầu:</span>
              <span style={{ fontWeight: 600, color: "#3b82f6" }}>
                {stats.tenders.open}
              </span>
            </S.MetricSubItem>
          </S.MetricSubText>
        </S.MetricCard>

        {/* Verifications Card */}
        <S.MetricCard>
          <S.MetricHeader>
            <S.MetricTitle>Yêu cầu Xác Minh</S.MetricTitle>
            <S.MetricIconWrapper $color="#8b5cf6" $bg="rgba(139, 92, 246, 0.1)">
              <SafetyCertificateOutlined />
            </S.MetricIconWrapper>
          </S.MetricHeader>
          <S.MetricValue>{stats.verifications.total}</S.MetricValue>
          <S.MetricSubText>
            <S.MetricSubItem>
              <span>Đang chờ duyệt:</span>
              <span style={{ fontWeight: 600, color: "#f59e0b" }}>
                {stats.verifications.pending}
              </span>
            </S.MetricSubItem>
            <S.MetricSubItem>
              <span>Đã duyệt:</span>
              <span style={{ fontWeight: 600, color: "#10b981" }}>
                {stats.verifications.approved}
              </span>
            </S.MetricSubItem>
            <S.MetricSubItem>
              <span>Từ chối:</span>
              <span style={{ fontWeight: 600, color: "#ef4444" }}>
                {stats.verifications.rejected}
              </span>
            </S.MetricSubItem>
          </S.MetricSubText>
        </S.MetricCard>
      </S.StatsGrid>

      <S.ChartsGrid>
        {/* User Type Distribution Pie Chart */}
        <S.ChartCard>
          <S.ChartTitle>Cơ cấu loại tài khoản</S.ChartTitle>
          <div
            style={{
              width: "100%",
              height: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} tài khoản`, "Số lượng"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <S.LegendList>
            {userTypeData.map((entry, index) => (
              <S.LegendItem key={`legend-${index}`}>
                <S.LegendColor $color={COLORS[index % COLORS.length]} />
                <span>
                  {entry.name}: {entry.value} (
                  {stats.users.total
                    ? ((entry.value / stats.users.total) * 100).toFixed(1)
                    : 0}
                  %)
                </span>
              </S.LegendItem>
            ))}
          </S.LegendList>
        </S.ChartCard>

        {/* Auction vs Tender Bar Chart */}
        <S.ChartCard>
          <S.ChartTitle>So sánh Đấu Giá vs Đấu Thầu</S.ChartTitle>
          <div style={{ width: "100%", height: 340 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparisonData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="Đấu giá" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Đấu thầu" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </S.ChartCard>
      </S.ChartsGrid>
    </S.ContentRoot>
  );
};

export default AdminThongKeDashboard;
