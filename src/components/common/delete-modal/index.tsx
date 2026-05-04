import React from "react";

import { BaseButton } from "@/components/common/base-button";
import { BaseFlex } from "@/components/common/base-flex";
import { BaseModal } from "@/components/common/base-modal";

interface DeleteModalProps {
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  open: boolean;
  description: string;
  title?: string;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  loading = false,
  onCancel,
  onConfirm,
  open,
  description,
  title = "Xác nhận xóa",
}) => {
  return (
    <BaseModal
      size="small"
      centered
      footer={null}
      open={open}
      onCancel={onCancel}
      closable={!loading}
      maskClosable={!loading}
    >
      <BaseFlex vertical align="center" justify="center" gap={16}>
        <h3>{title}</h3>
        {description && <p>{description}</p>}

        <BaseFlex align="center" justify="center" gap={12}>
          <BaseButton onClick={onCancel} disabled={loading}>
            Hủy
          </BaseButton>
          <BaseButton
            type="primary"
            danger
            onClick={onConfirm}
            loading={loading}
          >
            Xóa
          </BaseButton>
        </BaseFlex>
      </BaseFlex>
    </BaseModal>
  );
};

export default DeleteModal;
