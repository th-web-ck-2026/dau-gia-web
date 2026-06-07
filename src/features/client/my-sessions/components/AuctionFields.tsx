import React from "react";

import { BaseCol, BaseForm, BaseInput, BaseRow } from "@/components/common";

interface AuctionFieldsProps {
  t: (key: string) => string;
}

export const AuctionFields: React.FC<AuctionFieldsProps> = ({ t }) => {
  return (
    <BaseRow gutter={16}>
      <BaseCol span={12}>
        <BaseForm.Item
          name="giaKhoiDiem"
          label={t("formStartingPrice")}
          rules={[{ required: true, message: t("validationRequired") }]}
        >
          <BaseInput type="number" suffix="VND" style={{ width: "100%" }} />
        </BaseForm.Item>
      </BaseCol>
      <BaseCol span={12}>
        <BaseForm.Item
          name="buocGia"
          label={t("formPriceStep")}
          rules={[{ required: true, message: t("validationRequired") }]}
        >
          <BaseInput type="number" suffix="VND" style={{ width: "100%" }} />
        </BaseForm.Item>
      </BaseCol>
    </BaseRow>
  );
};
