import { getProvinces, getWards } from "@/api/province-ward";

import { useAppQuery } from "./useAppQuery";

export const useProvinceWard = (provinceCode?: string) => {
  const provincesQuery = useAppQuery({
    queryKey: ["provinces"],
    queryFn: getProvinces,
  });

  const wardsQuery = useAppQuery({
    queryKey: ["wards", provinceCode],
    queryFn: () => getWards(provinceCode!),
    enabled: !!provinceCode,
  });

  return {
    provincesData: provincesQuery.data?.data || [],
    isLoadingProvinces: provincesQuery.isLoading,
    wardsData: wardsQuery.data?.data || [],
    isLoadingWards: wardsQuery.isLoading,
  };
};
