"use client";

import React from "react";

import { getAuctionDetail } from "@/api/auction";
import { getTenderDetail } from "@/api/tender";
import { BaseResult, BaseSpin } from "@/components/common";
import { useAppQuery } from "@/hooks/common";

import AuctionDetail from "./components/AuctionDetail";
import TenderDetail from "./components/TenderDetail";

interface Props {
  id: string;
}

export default function SessionDetailFeature({ id }: Props) {
  const { data, isLoading, error } = useAppQuery({
    queryKey: ["sessionDetail", id],
    queryFn: async () => {
      try {
        const res = await getTenderDetail(id);
        return { type: "DAU_THAU", session: res.data };
      } catch {
        const res = await getAuctionDetail(id);
        return { type: "DAU_GIA", session: res.data };
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <BaseSpin size="large" tip="Đang tải thông tin phiên..." />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ padding: "4rem 2rem" }}>
        <BaseResult
          status="error"
          title="Không tìm thấy phiên"
          subTitle="Phiên đấu thầu/đấu giá không tồn tại hoặc bạn không có quyền truy cập."
        />
      </div>
    );
  }

  if (data.type === "DAU_GIA") {
    return <AuctionDetail session={data.session as any} />;
  }

  return <TenderDetail session={data.session as any} />;
}
