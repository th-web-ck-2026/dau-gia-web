import React from "react";

import { Modal, ModalProps } from "antd";

import { MODAL_SIZES } from "@/styles/theme.constants";
import { WidthCategory } from "@/styles/theme.types";

interface BaseModalProps extends ModalProps {
  size?: "small" | "medium" | "large";
}

export const BaseModal: React.FC<BaseModalProps> = ({
  size = "medium",
  children,
  ...props
}) => {
  const modalSize = MODAL_SIZES[WidthCategory[size]];

  return (
    <Modal getContainer={false} width={modalSize} {...props}>
      {children}
    </Modal>
  );
};
