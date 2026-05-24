import { useState } from "react";

import { useTranslations } from "next-intl";

import { getAuctions } from "@/api/auction";
import { getTenders } from "@/api/tender";
import { useAppQuery } from "@/hooks/common";

export function useSessionList() {
  const t = useTranslations("sessions");
  const [activeTab, setActiveTab] = useState<string>("tender");

  // Filter States
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  // Query parameters mapping
  const params = {
    search: search || undefined,
    trangThai: status || undefined,
    minPrice: minPrice !== null ? minPrice : undefined,
    maxPrice: maxPrice !== null ? maxPrice : undefined,
  };

  // Fetch Tenders Query
  const {
    data: tendersRes,
    isLoading: isTendersLoading,
    refetch: refetchTenders,
  } = useAppQuery({
    queryKey: ["tenders", params],
    queryFn: () => getTenders(params),
    enabled: activeTab === "tender",
  });

  // Fetch Auctions Query
  const {
    data: auctionsRes,
    isLoading: isAuctionsLoading,
    refetch: refetchAuctions,
  } = useAppQuery({
    queryKey: ["auctions", params],
    queryFn: () => getAuctions(params),
    enabled: activeTab === "auction",
  });

  const handleFilter = () => {
    if (activeTab === "tender") {
      refetchTenders();
    } else {
      refetchAuctions();
    }
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    // Reset filters when changing tabs to avoid confusing UX
    setSearch("");
    setStatus("");
    setMinPrice(null);
    setMaxPrice(null);
  };

  return {
    t,
    activeTab,
    handleTabChange,
    search,
    setSearch,
    status,
    setStatus,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    handleFilter,
    tenders: tendersRes?.data || [],
    auctions: auctionsRes?.data || [],
    isLoading: activeTab === "tender" ? isTendersLoading : isAuctionsLoading,
  };
}
