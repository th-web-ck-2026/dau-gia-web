import type {
  ArgsProps,
  IconType,
  NotificationInstance,
} from "antd/es/notification/interface";

type NotificationType = Pick<NotificationInstance, IconType>;

type NotificationOpener = (props: Omit<ArgsProps, "type">) => void;

const open = (
  type: IconType,
  notification: NotificationType
): NotificationOpener => {
  return (props) => notification[type](props);
};

export const notificationController = (
  notification: NotificationType
): Record<IconType, NotificationOpener> => ({
  success: open("success", notification),
  info: open("info", notification),
  warning: open("warning", notification),
  error: open("error", notification),
});
