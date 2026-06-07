import { ColumnsType } from "antd/es/table";

import { User } from "@/interfaces/auth";

export interface RankingItem {
  thuHang: number;
  nguoiThamGiaId: string;
  nguoiThamGia?: Partial<User> | null;
  bietDanh?: string;
  trangThai?: string;
  [key: string]: any;
}

export interface RankingSessionsProps<T extends RankingItem> {
  data: T[];
  loading?: boolean;
  columns: ColumnsType<T>;
  renderPodiumSubtitle?: (item: T) => React.ReactNode;
}
