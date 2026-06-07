"use client";

import React, { useCallback, useRef, useState } from "react";

import { useTranslations } from "next-intl";

import { AdminXacMinhUserData } from "@/api/admin";
import { BaseInput, BasePagination, BaseTable } from "@/components/common";
import { SortOrder, TrangThaiXacMinhUser } from "@/constants";

import { VerifyUserModal } from "./components/VerifyUserModal";
import { useGetAdminXacMinhUsers } from "./index.hooks";
import * as S from "./index.styles";
import { getColumns } from "./index.utils";

const AdminXacMinhDashboard: React.FC = () => {
  const t = useTranslations("admin");

  const [searchText, setSearchText] = useState("");
  const [statusTab, setStatusTab] = useState<TrangThaiXacMinhUser | "ALL">(
    "ALL"
  );
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedRecord, setSelectedRecord] =
    useState<AdminXacMinhUserData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const condition: Record<string, unknown> =
    statusTab !== "ALL" ? { trangThai: statusTab } : {};

  const queryParams = {
    page,
    limit,
    condition,
    order: { createdAt: SortOrder.DESC },
  };

  const { data, isLoading, refetch } = useGetAdminXacMinhUsers(queryParams);

  const handleReview = useCallback((record: AdminXacMinhUserData) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  }, []);

  const handleModalSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleSearch = useCallback((value: string) => {
    setSearchText(value);
    setPage(1);
  }, []);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearchDebounced = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      handleSearch(e.target.value);
    }, 400);
  };

  const handleTabChange = useCallback((tab: TrangThaiXacMinhUser | "ALL") => {
    setStatusTab(tab);
    setPage(1);
  }, []);

  const columns = getColumns(t, handleReview);

  const rawList = data?.data?.result || [];
  const filteredList = rawList.filter((item) => {
    if (!searchText) return true;
    const fullname = item.user?.fullname?.toLowerCase() || "";
    const email = item.user?.email?.toLowerCase() || "";
    const phone = item.user?.phone || "";
    const searchLower = searchText.toLowerCase();
    return (
      fullname.includes(searchLower) ||
      email.includes(searchLower) ||
      phone.includes(searchLower)
    );
  });

  const total = data?.data?.total || 0;

  return (
    <S.ContentRoot>
      <S.DashboardHeader>
        <S.DashboardTitle>{t("verification.title")}</S.DashboardTitle>
      </S.DashboardHeader>

      <S.FilterContainer>
        <BaseInput
          placeholder={t("verification.searchPlaceholder")}
          onChange={handleSearchDebounced}
          style={{ width: 320 }}
          allowClear
        />
      </S.FilterContainer>

      <S.TabContainer>
        <S.TabButton
          $active={statusTab === "ALL"}
          onClick={() => handleTabChange("ALL")}
        >
          {t("verification.status.all")}
        </S.TabButton>
        <S.TabButton
          $active={statusTab === TrangThaiXacMinhUser.CHO_DUYET}
          onClick={() => handleTabChange(TrangThaiXacMinhUser.CHO_DUYET)}
        >
          {t("verification.status.pending")}
        </S.TabButton>
        <S.TabButton
          $active={statusTab === TrangThaiXacMinhUser.DUYET}
          onClick={() => handleTabChange(TrangThaiXacMinhUser.DUYET)}
        >
          {t("verification.status.approved")}
        </S.TabButton>
        <S.TabButton
          $active={statusTab === TrangThaiXacMinhUser.TU_CHOI}
          onClick={() => handleTabChange(TrangThaiXacMinhUser.TU_CHOI)}
        >
          {t("verification.status.rejected")}
        </S.TabButton>
      </S.TabContainer>

      <S.TableCard>
        <BaseTable
          loading={isLoading}
          dataSource={filteredList}
          columns={columns}
          rowKey={(record) => record._id}
          pagination={false}
        />
        <S.PaginationWrapper>
          <BasePagination
            current={page}
            pageSize={limit}
            total={total}
            showSizeChanger
            onChange={(p, l) => {
              setPage(p);
              setLimit(l);
            }}
          />
        </S.PaginationWrapper>
      </S.TableCard>

      <VerifyUserModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRecord(null);
        }}
        record={selectedRecord}
        onSuccess={handleModalSuccess}
      />
    </S.ContentRoot>
  );
};

export default AdminXacMinhDashboard;
