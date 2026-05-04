// Here export const ra các Hook call api sử dụng tanstack query ( đã custom ở hooks )
import { getDemoData } from "@/api/demo";
import { useAppQuery } from "@/hooks/common";

export const useDemoData = () =>
  useAppQuery({
    queryKey: ["demo-data"],
    queryFn: getDemoData,
  });
