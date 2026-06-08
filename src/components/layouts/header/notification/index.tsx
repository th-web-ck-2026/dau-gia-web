"use client";

import React, { useState } from "react";

import { useTranslations } from "next-intl";

import { BellOutlined } from "@ant-design/icons";
import { Badge, Popover, Spin } from "antd";
import dayjs from "dayjs";

import { NotificationItem } from "@/api/notifications";
import { useAuth } from "@/hooks/common";
import { useRouter } from "@/i18n/routing";

import {
  useGetNotifications,
  useMarkAllAsRead,
  useMarkAsRead,
} from "./index.hooks";
import * as S from "./index.styles";

export const NotificationBell = () => {
  const t = useTranslations("notification");
  const { user } = useAuth();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetNotifications();

  const markAsReadMutation = useMarkAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();

  const notifications = data?.pages.flatMap((page) => page.data.result) || [];
  const totalUnread = data?.pages?.[0]?.data?.totalUnread || 0;

  const handleItemClick = async (item: NotificationItem) => {
    const isUnread = !item.userReadIds?.includes(user?._id || "");
    if (isUnread) {
      await markAsReadMutation.mutateAsync(item._id);
    }

    setVisible(false);

    const targetId =
      item.metadata?.targetId || item.metadata?.extra?.giaoDichId;
    if (targetId) {
      router.push(`/my-transactions/${targetId}`);
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const content = (
    <S.DropdownContainer>
      <S.Header>
        <S.Title level={5}>{t("title")}</S.Title>
        {totalUnread > 0 && (
          <S.ClearAllButton
            onClick={handleMarkAllAsRead}
            loading={markAllAsReadMutation.isPending}
          >
            {t("markAllRead")}
          </S.ClearAllButton>
        )}
      </S.Header>

      <S.ScrollContainer>
        {isLoading ? (
          <div style={{ textAlign: "center", padding: 24 }}>
            <Spin size="small" />
          </div>
        ) : notifications.length === 0 ? (
          <S.EmptyState>{t("empty")}</S.EmptyState>
        ) : (
          <>
            {notifications.map((item: NotificationItem) => {
              const isUnread = !item.userReadIds?.includes(user?._id || "");
              return (
                <S.NotificationItem
                  key={item._id}
                  $isUnread={isUnread}
                  onClick={() => handleItemClick(item)}
                >
                  <S.ItemTitle $isUnread={isUnread}>{item.title}</S.ItemTitle>
                  <S.ItemContent>{item.content}</S.ItemContent>
                  <S.ItemTime>
                    {dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}
                  </S.ItemTime>
                  {isUnread && <S.UnreadDot />}
                </S.NotificationItem>
              );
            })}
          </>
        )}
      </S.ScrollContainer>

      {hasNextPage && (
        <S.LoadMoreWrapper>
          <S.LoadMoreButton
            type="text"
            onClick={() => fetchNextPage()}
            loading={isFetchingNextPage}
          >
            {t("loadMore")}
          </S.LoadMoreButton>
        </S.LoadMoreWrapper>
      )}
    </S.DropdownContainer>
  );

  return (
    <S.NotificationBellWrapper>
      <Popover
        content={content}
        trigger="click"
        open={visible}
        onOpenChange={setVisible}
        placement="bottomRight"
        overlayClassName="notification-popover"
        overlayInnerStyle={{ padding: 0 }}
      >
        <Badge count={totalUnread} size="small" offset={[-2, 2]}>
          <S.BellButton>
            <BellOutlined />
          </S.BellButton>
        </Badge>
      </Popover>
    </S.NotificationBellWrapper>
  );
};
