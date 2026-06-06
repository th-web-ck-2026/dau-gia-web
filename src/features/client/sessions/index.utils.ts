"use client";

import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { BreadcrumbProps } from "antd";

import { SessionQueryParams } from "@/api/sessions";
import { SortOrder, TrangThaiPhien } from "@/constants";
import { LoaiPhien } from "@/constants/scoring";

import { useGetSessionsAuction, useGetSessionsTender } from "./index.hooks";

const LIMIT = 6;

const useClientSessions = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tHeader = useTranslations("header");
  const tHome = useTranslations("client.home");
  const tSessions = useTranslations("sessions");
  const tStatus = useTranslations("sessionStatus");

  const rawTab = searchParams.get("tab");
  const activeTab =
    rawTab === LoaiPhien.DAU_THAU ? LoaiPhien.DAU_THAU : LoaiPhien.DAU_GIA;

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const rawStatus = searchParams.get("status");
  const initialStatus =
    rawStatus === TrangThaiPhien.MO
      ? TrangThaiPhien.MO
      : rawStatus === TrangThaiPhien.CONG_BO
        ? TrangThaiPhien.CONG_BO
        : rawStatus === TrangThaiPhien.DONG
          ? TrangThaiPhien.DONG
          : undefined;

  const [trangThai, setTrangThai] = useState<TrangThaiPhien | undefined>(
    initialStatus
  );

  const [priceRange, setPriceRange] = useState<[number, number] | undefined>(
    undefined
  );
  const [debouncedPriceRange, setDebouncedPriceRange] = useState<
    [number, number] | undefined
  >(undefined);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 350);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPriceRange(priceRange);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [priceRange]);

  const items: BreadcrumbProps["items"] = [
    {
      title: tHeader("sessions"),
      href: "/sessions",
    },
    {
      title:
        activeTab === LoaiPhien.DAU_GIA
          ? tSessions("tabAuction")
          : tSessions("tabTender"),
    },
  ];

  const buildCondition = () => {
    const cond: Record<string, unknown> = {};

    if (trangThai) {
      cond.trangThai = trangThai;
    } else {
      cond.trangThai = {
        $in: [TrangThaiPhien.CONG_BO, TrangThaiPhien.MO, TrangThaiPhien.DONG],
      };
    }

    if (debouncedSearch) {
      cond.tieuDe = { $ilike: `%${debouncedSearch}%` };
    }

    if (activeTab === LoaiPhien.DAU_GIA && debouncedPriceRange) {
      cond.giaKhoiDiem = { $between: debouncedPriceRange };
    }

    return cond;
  };

  const auctionQuery = useGetSessionsAuction(
    {
      page,
      limit: LIMIT,
      condition: buildCondition() as unknown as SessionQueryParams["condition"],
      order: { createdAt: SortOrder.DESC },
    },
    { enabled: activeTab === LoaiPhien.DAU_GIA }
  );

  const tenderQuery = useGetSessionsTender(
    {
      page,
      limit: LIMIT,
      condition: buildCondition() as unknown as SessionQueryParams["condition"],
      order: { createdAt: SortOrder.DESC },
    },
    { enabled: activeTab === LoaiPhien.DAU_THAU }
  );

  const handleTabChange = (tab: LoaiPhien) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (p: number) => {
    setPage(p);
  };

  const handleResetFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setTrangThai(undefined);
    setPriceRange(undefined);
    setDebouncedPriceRange(undefined);
    setPage(1);
  };

  const isAuction = activeTab === LoaiPhien.DAU_GIA;
  const currentQuery = isAuction ? auctionQuery : tenderQuery;

  const sessions = currentQuery.data?.data?.result || [];
  const total = currentQuery.data?.data?.total || 0;
  const isLoading = currentQuery.isLoading;
  const isError = currentQuery.isError;

  return {
    activeTab,
    items,
    tSessions,
    tHome,
    tStatus,
    search,
    setSearch,
    trangThai,
    setTrangThai,
    priceRange,
    setPriceRange,
    page,
    limit: LIMIT,
    sessions,
    total,
    isLoading,
    isError,
    handleTabChange,
    handlePageChange,
    handleResetFilters,
  };
};

export default useClientSessions;
export type UseClientSessionsResult = ReturnType<typeof useClientSessions>;
