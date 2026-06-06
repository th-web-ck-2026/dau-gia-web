"use client";

import React, { useState } from "react";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import {
  BaseButton,
  BaseInput,
  BasePagination,
  BaseSelect,
  BaseSpace,
  BaseTable,
} from "@/components/common";
import ClientBreadCrumb from "@/components/features/client/bread-crumb";
import { LoaiPhien, TrangThaiPhien } from "@/constants";
import { useAuth, useFeedback } from "@/hooks/common";
import { AuctionSession, TenderSession } from "@/interfaces/sessions";

import CreateSessionModal from "./components/CreateSessionModal";
import SubmissionsDrawer from "./components/SubmissionsDrawer";
import {
  useCreateAuctionSession,
  useCreateTenderSession,
  useGetMyAuctionSessions,
  useGetMyTenderSessions,
  usePublishAuctionSession,
  usePublishTenderSession,
} from "./index.hooks";
import * as S from "./index.styles";
import {
  SelectedSession,
  buildQueryParams,
  getAuctionColumns,
  getErrorMessage,
  getTenderColumns,
} from "./index.utils";

const MySessionsDashboard: React.FC = () => {
  const t = useTranslations("mySessionsPage");
  const tStatus = useTranslations("sessionStatus");
  const { user } = useAuth();
  const { message: feedbackMsg } = useFeedback();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab");
  const activeTab =
    tabParam === "DAU_THAU" ? LoaiPhien.DAU_THAU : LoaiPhien.DAU_GIA;

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<TrangThaiPhien | undefined>(
    undefined
  );
  const [page, setPage] = useState(1);
  const limit = 10;

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [submissionsDrawerOpen, setSubmissionsDrawerOpen] = useState(false);
  const [selectedSession, setSelectedSession] =
    useState<SelectedSession | null>(null);

  const createAuctionMutation = useCreateAuctionSession();
  const createTenderMutation = useCreateTenderSession();
  const publishAuctionMutation = usePublishAuctionSession();
  const publishTenderMutation = usePublishTenderSession();

  const queryParams = buildQueryParams(searchText, statusFilter, page, limit);
  const userId = user?._id || "";

  const {
    data: auctionDataRes,
    isLoading: loadingAuctions,
    refetch: refetchAuctions,
  } = useGetMyAuctionSessions(userId, queryParams, {
    enabled: activeTab === LoaiPhien.DAU_GIA && !!userId,
  });

  const {
    data: tenderDataRes,
    isLoading: loadingTenders,
    refetch: refetchTenders,
  } = useGetMyTenderSessions(userId, queryParams, {
    enabled: activeTab === LoaiPhien.DAU_THAU && !!userId,
  });

  const handlePublish = async (id: string, type: LoaiPhien) => {
    try {
      if (type === LoaiPhien.DAU_GIA) {
        await publishAuctionMutation.mutateAsync(id);
      } else {
        await publishTenderMutation.mutateAsync(id);
      }
      feedbackMsg.success(t("publishSuccess"));
      refetchData();
    } catch (err) {
      feedbackMsg.error(getErrorMessage(err) || t("publishError"));
    }
  };

  const refetchData = () => {
    if (activeTab === LoaiPhien.DAU_GIA) {
      refetchAuctions();
    } else {
      refetchTenders();
    }
  };

  const handleOpenDrawer = (
    record: AuctionSession | TenderSession,
    type: LoaiPhien
  ) => {
    setSelectedSession({
      id: record._id,
      title: record.tieuDe,
      type,
      status: record.trangThai,
      minTechnicalScore:
        "diemKyThuatToiThieu" in record
          ? record.diemKyThuatToiThieu
          : undefined,
    });
    setSubmissionsDrawerOpen(true);
  };

  const handleTabChange = (tab: LoaiPhien) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === LoaiPhien.DAU_THAU) {
      params.set("tab", "DAU_THAU");
    } else {
      params.set("tab", "DAU_GIA");
    }
    setSearchText("");
    setStatusFilter(undefined);
    setPage(1);
    router.push(`${pathname}?${params.toString()}`);
  };

  const isAuctionTab = activeTab === LoaiPhien.DAU_GIA;
  const currentRes = isAuctionTab ? auctionDataRes : tenderDataRes;
  const dataSource = currentRes?.data?.result || [];
  const totalItems = currentRes?.data?.total || 0;
  const isLoading = isAuctionTab ? loadingAuctions : loadingTenders;

  const auctionColumns = getAuctionColumns(t, handlePublish, handleOpenDrawer);
  const tenderColumns = getTenderColumns(t, handlePublish, handleOpenDrawer);

  const breadcrumbItems = [
    {
      title: t("breadcrumbMySessions"),
      href: "/my-sessions",
    },
    {
      title: isAuctionTab ? t("tabAuction") : t("tabTender"),
    },
  ];

  return (
    <S.ContentRoot>
      <ClientBreadCrumb items={breadcrumbItems} />
      <S.ContentWrapper>
        <S.DashboardHeader>
          <S.DashboardTitle>{t("title")}</S.DashboardTitle>
          <BaseSpace>
            <BaseButton
              icon={<ReloadOutlined />}
              onClick={refetchData}
              loading={isLoading}
            >
              {t("refreshBtn")}
            </BaseButton>
            <BaseButton
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateModalOpen(true)}
            >
              {t("createBtn")}
            </BaseButton>
          </BaseSpace>
        </S.DashboardHeader>

        <S.FilterCard>
          <BaseInput
            placeholder={t("searchPlaceholder")}
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setPage(1);
            }}
            style={{ width: 300 }}
            allowClear
          />
          <BaseSelect
            placeholder={t("filterStatusPlaceholder")}
            value={statusFilter}
            onChange={(val) => {
              setStatusFilter(val as TrangThaiPhien | undefined);
              setPage(1);
            }}
            style={{ width: 180 }}
            allowClear
            options={[
              { label: tStatus("NHAP"), value: TrangThaiPhien.NHAP },
              { label: tStatus("CONG_BO"), value: TrangThaiPhien.CONG_BO },
              { label: tStatus("MO"), value: TrangThaiPhien.MO },
              { label: tStatus("DONG"), value: TrangThaiPhien.DONG },
            ]}
          />
        </S.FilterCard>

        <S.TabContainer>
          <S.TabButton
            $active={activeTab === LoaiPhien.DAU_GIA}
            onClick={() => handleTabChange(LoaiPhien.DAU_GIA)}
          >
            {t("tabAuction")}
          </S.TabButton>
          <S.TabButton
            $active={activeTab === LoaiPhien.DAU_THAU}
            onClick={() => handleTabChange(LoaiPhien.DAU_THAU)}
          >
            {t("tabTender")}
          </S.TabButton>
        </S.TabContainer>

        <S.TableCard>
          <BaseTable
            dataSource={dataSource as any}
            columns={isAuctionTab ? auctionColumns : tenderColumns}
            rowKey="_id"
            loading={isLoading}
            pagination={false}
            locale={{ emptyText: t("noData") }}
          />

          {totalItems > limit && (
            <S.PaginationWrapper>
              <BasePagination
                current={page}
                pageSize={limit}
                total={totalItems}
                onChange={(p) => setPage(p)}
                showSizeChanger={false}
              />
            </S.PaginationWrapper>
          )}
        </S.TableCard>

        <CreateSessionModal
          open={createModalOpen}
          onCancel={() => setCreateModalOpen(false)}
          onSuccess={refetchData}
          createAuction={createAuctionMutation}
          createTender={createTenderMutation}
        />

        <SubmissionsDrawer
          open={submissionsDrawerOpen}
          onClose={() => {
            setSubmissionsDrawerOpen(false);
            setSelectedSession(null);
          }}
          session={selectedSession}
          onSuccess={refetchData}
        />
      </S.ContentWrapper>
    </S.ContentRoot>
  );
};

export default MySessionsDashboard;
