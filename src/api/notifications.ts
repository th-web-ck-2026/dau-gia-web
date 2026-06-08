import { ResponseData } from "@/interfaces/common";
import { PageableResponse } from "@/interfaces/sessions";
import { request } from "@/services/axios";

export interface NotificationItem {
  _id: string;
  userIds: string[];
  type: string;
  title: string;
  content: string;
  userReadIds: string[];
  metadata?: {
    targetId?: string;
    extra?: Record<string, any>;
    phanHe?: string;
    module?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface NotificationQueryParams {
  page?: number;
  limit?: number;
}

export const getMyNotifications = (params?: NotificationQueryParams) =>
  request.get<
    NotificationQueryParams,
    ResponseData<PageableResponse<NotificationItem> & { totalUnread: number }>
  >("/notification/me/page", params);

export const getNotificationDetail = (id: string) =>
  request.get<undefined, ResponseData<NotificationItem>>(
    `/notification/me/${id}`
  );

export const markAllAsRead = () =>
  request.post<undefined, ResponseData<any>>("/notification/read/all");

export const markAsRead = (id: string) =>
  request.post<undefined, ResponseData<any>>(`/notification/read/${id}`);
