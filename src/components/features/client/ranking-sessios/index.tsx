"use client";

import React from "react";

import { useTranslations } from "next-intl";

import { CrownOutlined, UserOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

import { BaseAvatar, BaseTable } from "@/components/common";

import * as S from "./index.styles";
import { RankingItem, RankingSessionsProps } from "./types";

const getUniqueKey = (item: RankingItem): string => {
  if (item.nguoiThamGiaId === "ANONYMOUS") {
    return item.bietDanh ?? `anon-rank-${item.thuHang}`;
  }
  return (
    item.nguoiThamGiaId || item.bidId || item.deXuatId || `rank-${item.thuHang}`
  );
};

const MotionRow = (props: any) => {
  const rowKey = props["data-row-key"];
  return (
    <motion.tr
      {...props}
      layout
      layoutId={String(rowKey)}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
    />
  );
};

export const RankingSessions = <T extends RankingItem>({
  data,
  loading = false,
  columns,
  renderPodiumSubtitle,
}: RankingSessionsProps<T>) => {
  const t = useTranslations("common");
  const topThree = data.slice(0, 3);

  const getDisplayName = (item: T) => {
    if (item.nguoiThamGiaId === "ANONYMOUS") {
      return item.bietDanh || t("anonymousParticipant");
    }
    return item.nguoiThamGia?.fullname || item.bietDanh || item.nguoiThamGiaId;
  };

  return (
    <S.RankingContainer>
      {topThree.length > 0 && (
        <S.PodiumContainer>
          {topThree.map((item) => {
            const rank = item.thuHang;
            const displayName = getDisplayName(item);
            const avatarUrl = item.nguoiThamGia?.avatar;
            const uniqueKey = getUniqueKey(item);

            return (
              <S.PodiumItem key={uniqueKey} $rank={rank}>
                <S.AvatarWrapper $rank={rank}>
                  {rank === 1 && (
                    <S.CrownWrapper>
                      <CrownOutlined />
                    </S.CrownWrapper>
                  )}
                  <BaseAvatar src={avatarUrl} icon={<UserOutlined />} />
                  <S.RankBadge $rank={rank}>{rank}</S.RankBadge>
                </S.AvatarWrapper>
                <S.PodiumInfo>
                  <S.PodiumName title={displayName}>{displayName}</S.PodiumName>
                  {renderPodiumSubtitle && (
                    <S.PodiumSubtitle>
                      {renderPodiumSubtitle(item)}
                    </S.PodiumSubtitle>
                  )}
                </S.PodiumInfo>
              </S.PodiumItem>
            );
          })}
        </S.PodiumContainer>
      )}

      <S.TableSection>
        <BaseTable
          rowKey={(record) => getUniqueKey(record)}
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={false}
          scroll={{ x: "max-content" }}
          components={{
            body: {
              row: MotionRow,
            },
          }}
        />
      </S.TableSection>
    </S.RankingContainer>
  );
};
export default RankingSessions;
