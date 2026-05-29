"use client";

import {
  getAuctionSessions,
  getKeyAssets,
  getTenderSessions,
} from "@/api/home";
import { useAppQuery } from "@/hooks/common";
import { TrangThaiPhien } from "@/interfaces/home";

const useHomeHooks = () => {
  const {
    data: auctionsData,
    isLoading: isAuctionsLoading,
    isError: isAuctionsError,
  } = useAppQuery({
    queryKey: ["auction-sessions-home"],
    queryFn: () =>
      getAuctionSessions({ trangThai: TrangThaiPhien.MO, limit: 4 }),
  });

  const {
    data: tendersData,
    isLoading: isTendersLoading,
    isError: isTendersError,
  } = useAppQuery({
    queryKey: ["tender-sessions-home"],
    queryFn: () =>
      getTenderSessions({ trangThai: TrangThaiPhien.MO, limit: 3 }),
  });

  const {
    data: keyAssetsData,
    isLoading: isKeyAssetsLoading,
    isError: isKeyAssetsError,
  } = useAppQuery({
    queryKey: ["key-assets-home"],
    queryFn: () => getKeyAssets({ limit: 3 }),
  });

  const auctions = auctionsData?.data?.result ?? [];
  const tenders = tendersData?.data?.result ?? [];
  const keyAssets = keyAssetsData?.data?.result ?? [];

  return {
    auctions,
    isAuctionsLoading,
    isAuctionsError,
    tenders,
    isTendersLoading,
    isTendersError,
    keyAssets,
    isKeyAssetsLoading,
    isKeyAssetsError,
  };
};

export default useHomeHooks;
