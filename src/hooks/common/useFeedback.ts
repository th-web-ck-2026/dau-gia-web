import { App } from "antd";

import { ModalType, modalController } from "@/controllers/modal";
import { notificationController } from "@/controllers/notification";

export const useFeedback = (): Omit<ReturnType<typeof App.useApp>, "modal"> & {
  modal: ModalType;
} => {
  const { message, notification, modal } = App.useApp();

  return {
    message,
    notification: {
      ...notificationController(notification),
      destroy: notification.destroy,
      open: notification.open,
    },
    modal: {
      ...modalController(modal),
    },
  };
};
