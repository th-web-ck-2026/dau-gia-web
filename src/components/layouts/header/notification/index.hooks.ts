import { InfiniteData, useQueryClient } from "@tanstack/react-query";

import {
  NotificationItem,
  getMyNotifications,
  markAllAsRead,
  markAsRead,
} from "@/api/notifications";
import { useAppInfiniteQuery, useAppMutation } from "@/hooks/common";
import { ResponseData } from "@/interfaces/common";
import { PageableResponse } from "@/interfaces/sessions";

type GetNotificationsResponse = ResponseData<
  PageableResponse<NotificationItem> & { totalUnread: number }
>;

export const useGetNotifications = () => {
  return useAppInfiniteQuery<
    GetNotificationsResponse,
    Error,
    InfiniteData<GetNotificationsResponse>
  >({
    queryKey: ["notifications"],
    queryFn: ({ pageParam = 1 }) =>
      getMyNotifications({ page: pageParam as number, limit: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const data = lastPage?.data;
      if (!data) return undefined;
      const { page, total, limit } = data;
      const totalPages = Math.ceil(total / limit);
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useAppMutation((id: string) => markAsRead(id), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();
  return useAppMutation(() => markAllAsRead(), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
