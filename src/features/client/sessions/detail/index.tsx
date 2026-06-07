"use client";

import React, { useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";

import {
  getAuctionSessionDetail,
  getTenderSessionDetail,
} from "@/api/sessions";
import ClientBreadCrumb from "@/components/features/client/bread-crumb";
import SessionStatus from "@/components/features/client/session-status";
import { LoaiPhien, TrangThaiPhien } from "@/constants/scoring";
import { useAuth } from "@/hooks/common";

import { AuctionPanel } from "./components/AuctionPanel";
import SessionDetailSkeleton from "./components/SessionDetailSkeleton";
import { TenderPanel } from "./components/TenderPanel";
import {
  usePlaceBid,
  useSessionBids,
  useSessionRanking,
  useSessionStatus,
  useSubmitProposal,
  useTenderSubmissions,
} from "./index.hooks";
import * as S from "./index.styles";

interface SessionDetailProps {
  id: string;
}

const SessionDetail: React.FC<SessionDetailProps> = ({ id }) => {
  const router = useRouter();
  const t = useTranslations("sessionDetail");
  const tStatus = useTranslations("sessionStatus");
  const { user, isAuthenticated } = useAuth();

  const [sessionType, setSessionType] = useState<LoaiPhien | null>(null);
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let active = true;
    const fetchSession = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAuctionSessionDetail(id);
        if (active) {
          setSessionData(res.data);
          setSessionType(LoaiPhien.DAU_GIA);
        }
      } catch {
        try {
          const res = await getTenderSessionDetail(id);
          if (active) {
            setSessionData(res.data);
            setSessionType(LoaiPhien.DAU_THAU);
          }
        } catch (err2) {
          if (active) {
            setError(err2);
          }
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    fetchSession();
    return () => {
      active = false;
    };
  }, [id]);

  const { data: statusRes, refetch: refetchStatus } = useSessionStatus(id, {
    enabled:
      sessionType === LoaiPhien.DAU_GIA &&
      sessionData?.trangThai === TrangThaiPhien.MO,
    refetchInterval: 4000,
  });

  const {
    data: rankingRes,
    isLoading: rankingLoading,
    refetch: refetchRanking,
  } = useSessionRanking(id, sessionType || LoaiPhien.DAU_GIA, {
    enabled: !!sessionType,
    refetchInterval:
      sessionData?.trangThai === TrangThaiPhien.MO ? 4000 : undefined,
  });

  const placeBidMutation = usePlaceBid(id);
  const submitProposalMutation = useSubmitProposal(id);

  const { data: bidsRes, refetch: refetchBids } = useSessionBids(id, {
    enabled: sessionType === LoaiPhien.DAU_GIA && isAuthenticated,
  });

  const { data: submissionsRes, refetch: refetchSubmissions } =
    useTenderSubmissions(id, {
      enabled: sessionType === LoaiPhien.DAU_THAU && isAuthenticated,
    });

  if (loading) {
    return (
      <S.ContentRoot>
        <S.ContentWrapper>
          {/* Breadcrumb placeholder */}
          <div style={{ height: 22 }} />
          <SessionDetailSkeleton />
        </S.ContentWrapper>
      </S.ContentRoot>
    );
  }

  if (error || !sessionData || !sessionType) {
    return (
      <S.ContentRoot>
        <S.ContentWrapper>
          <Result
            status="404"
            title="404"
            subTitle="Phiên đấu thầu hoặc đấu giá không tồn tại hoặc đã bị gỡ bỏ."
            extra={
              <Button type="primary" onClick={() => router.push("/sessions")}>
                Quay về danh sách
              </Button>
            }
          />
        </S.ContentWrapper>
      </S.ContentRoot>
    );
  }

  const breadcrumbItems = [
    {
      title: t("breadcrumbSessions"),
      href: "/sessions",
    },
    {
      title:
        sessionType === LoaiPhien.DAU_GIA
          ? t("breadcrumbAuction")
          : t("breadcrumbTender"),
      href: `/sessions?tab=${sessionType}`,
    },
    {
      title: sessionData.tieuDe || "",
    },
  ];

  const currentStatus = statusRes?.data?.trangThai ?? sessionData.trangThai;
  const isAuction = sessionType === LoaiPhien.DAU_GIA;

  const currentPrice =
    statusRes?.data?.giaHienTai ??
    sessionData.giaCaoNhat ??
    sessionData.giaKhoiDiem ??
    0;
  const totalBids = statusRes?.data?.tongSoLuotDat ?? 0;
  const leadingUserNickname = statusRes?.data?.bietDanhNguoiDanDau ?? "Chưa có";
  const minRequiredBid =
    statusRes?.data?.giaHopLeKeTiep ??
    (sessionData.deXuatThangId || totalBids > 0
      ? currentPrice + sessionData.buocGia
      : currentPrice);

  const hasSubmittedTender =
    !isAuction &&
    isAuthenticated &&
    (rankingRes?.data?.danhSach?.some(
      (item: {
        nguoiThamGiaId?: string;
        nguoiThamGia?: { _id?: string } | null;
      }) =>
        item.nguoiThamGiaId === user?._id ||
        item.nguoiThamGia?._id === user?._id
    ) ||
      submissionsRes?.data?.some(
        (sub: {
          nguoiThamGiaId?: string;
          nguoiThamGia?: { _id?: string } | null;
        }) =>
          sub.nguoiThamGiaId === user?._id ||
          sub.nguoiThamGia?._id === user?._id
      ));

  return (
    <S.DetailsContainer>
      <ClientBreadCrumb items={breadcrumbItems} />

      <S.ContentRoot>
        <S.ContentWrapper>
          <S.HeaderSection>
            <S.TitleRow>
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => router.back()}
                type="text"
              />
              <S.Title>
                {isAuction ? t("auctionDetailTitle") : t("tenderDetailTitle")}
              </S.Title>
              <SessionStatus status={currentStatus} />
            </S.TitleRow>
          </S.HeaderSection>

          {isAuction ? (
            <AuctionPanel
              sessionData={sessionData}
              statusRes={statusRes}
              rankingRes={rankingRes}
              rankingLoading={rankingLoading}
              isAuthenticated={isAuthenticated}
              user={user}
              currentStatus={currentStatus}
              currentPrice={currentPrice}
              totalBids={totalBids}
              leadingUserNickname={leadingUserNickname}
              minRequiredBid={minRequiredBid}
              placeBidMutation={placeBidMutation}
              refetchStatus={refetchStatus}
              refetchRanking={refetchRanking}
              bidHistory={bidsRes?.data || []}
              refetchBids={refetchBids}
              t={t}
              tStatus={tStatus}
            />
          ) : (
            <TenderPanel
              sessionData={sessionData}
              rankingRes={rankingRes}
              rankingLoading={rankingLoading}
              isAuthenticated={isAuthenticated}
              user={user}
              currentStatus={currentStatus}
              hasSubmittedTender={hasSubmittedTender}
              submitProposalMutation={submitProposalMutation}
              refetchRanking={refetchRanking}
              tenderSubmissions={submissionsRes?.data || []}
              refetchSubmissions={refetchSubmissions}
              t={t}
              tStatus={tStatus}
            />
          )}
        </S.ContentWrapper>
      </S.ContentRoot>
    </S.DetailsContainer>
  );
};

export default SessionDetail;
