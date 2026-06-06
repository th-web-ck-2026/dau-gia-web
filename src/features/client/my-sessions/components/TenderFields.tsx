import React from "react";

import { BaseCol, BaseForm, BaseInput, BaseRow } from "@/components/common";

import { CriteriaFormList } from "./CriteriaFormList";

interface TenderFieldsProps {
  t: (key: string) => string;
}

export const TenderFields: React.FC<TenderFieldsProps> = ({ t }) => {
  return (
    <>
      <BaseRow gutter={16}>
        <BaseCol span={24}>
          <BaseForm.Item
            name="diemKyThuatToiThieu"
            label={t("formMinTechnicalScore")}
            initialValue={50}
            rules={[{ required: true, message: t("validationRequired") }]}
          >
            <BaseInput
              type="number"
              min={0}
              max={100}
              style={{ width: "100%" }}
            />
          </BaseForm.Item>
        </BaseCol>
      </BaseRow>
      <CriteriaFormList t={t} />
    </>
  );
};
