import { ColumnsType } from "antd/es/table";

export interface RankingUser {
  _id: string;
  fullname?: string;
  avatar?: string;
  email?: string;
  phone?: string;
}

export interface RankingItem {
  thuHang: number;
  nguoiThamGiaId: string;
  nguoiThamGia?: RankingUser | null;
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
