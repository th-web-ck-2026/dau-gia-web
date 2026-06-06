import React from "react";

import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import {
  BaseButton,
  BaseCol,
  BaseForm,
  BaseInput,
  BaseRow,
  BaseSelect,
  BaseSwitch,
} from "@/components/common";
import { HuongToiUu, LoaiTieuChi } from "@/constants";
import * as S from "@/features/client/my-sessions/index.styles";

interface CriteriaFormListProps {
  t: (key: string) => string;
}

export const CriteriaFormList: React.FC<CriteriaFormListProps> = ({ t }) => {
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <S.DashboardHeader>
        <span style={{ fontWeight: 600 }}>{t("formCriteria")}</span>
      </S.DashboardHeader>

      <BaseForm.List name="tieuChi">
        {(fields, { add, remove }) => (
          <S.CriteriaListContainer>
            {fields.map(({ key, name, ...restField }) => (
              <S.CriterionItem key={key}>
                <S.RemoveCriterionButton onClick={() => remove(name)}>
                  <DeleteOutlined />
                </S.RemoveCriterionButton>

                <BaseRow gutter={16}>
                  <BaseCol span={8}>
                    <BaseForm.Item
                      {...restField}
                      name={[name, "tenTieuChi"]}
                      label={t("criteriaName")}
                      rules={[
                        { required: true, message: t("validationRequired") },
                      ]}
                    >
                      <BaseInput placeholder={t("placeholderCriteriaName")} />
                    </BaseForm.Item>
                  </BaseCol>
                  <BaseCol span={8}>
                    <BaseForm.Item
                      {...restField}
                      name={[name, "maTieuChi"]}
                      label={t("criteriaKey")}
                      rules={[
                        { required: true, message: t("validationRequired") },
                      ]}
                    >
                      <BaseInput placeholder={t("placeholderCriteriaKey")} />
                    </BaseForm.Item>
                  </BaseCol>
                  <BaseCol span={8}>
                    <BaseForm.Item
                      {...restField}
                      name={[name, "loai"]}
                      label={t("criteriaType")}
                      initialValue={LoaiTieuChi.SO}
                      rules={[
                        { required: true, message: t("validationRequired") },
                      ]}
                    >
                      <BaseSelect
                        options={[
                          {
                            label: t("criteriaTypeNumber"),
                            value: LoaiTieuChi.SO,
                          },
                          {
                            label: t("criteriaTypePercent"),
                            value: LoaiTieuChi.PHAN_TRAM,
                          },
                          {
                            label: t("criteriaTypeSelect"),
                            value: LoaiTieuChi.LUA_CHON,
                          },
                        ]}
                      />
                    </BaseForm.Item>
                  </BaseCol>
                </BaseRow>

                <BaseRow gutter={16}>
                  <BaseCol span={6}>
                    <BaseForm.Item
                      {...restField}
                      name={[name, "trongSo"]}
                      label={t("criteriaWeight")}
                      rules={[
                        { required: true, message: t("validationRequired") },
                      ]}
                    >
                      <BaseInput
                        type="number"
                        min={1}
                        max={100}
                        placeholder="%"
                      />
                    </BaseForm.Item>
                  </BaseCol>
                  <BaseCol span={6}>
                    <BaseForm.Item
                      {...restField}
                      name={[name, "huongToiUu"]}
                      label={t("criteriaOptimal")}
                      initialValue={HuongToiUu.CAO_HON}
                      rules={[
                        { required: true, message: t("validationRequired") },
                      ]}
                    >
                      <BaseSelect
                        options={[
                          { label: t("optimalMax"), value: HuongToiUu.CAO_HON },
                          {
                            label: t("optimalMin"),
                            value: HuongToiUu.THAP_HON,
                          },
                        ]}
                      />
                    </BaseForm.Item>
                  </BaseCol>
                  <BaseCol span={6}>
                    <BaseForm.Item
                      {...restField}
                      name={[name, "donVi"]}
                      label={t("criteriaUnit")}
                    >
                      <BaseInput placeholder={t("placeholderUnit")} />
                    </BaseForm.Item>
                  </BaseCol>
                  <BaseCol
                    span={6}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <BaseForm.Item
                      {...restField}
                      name={[name, "batBuoc"]}
                      label={t("criteriaRequired")}
                      valuePropName="checked"
                      initialValue={true}
                    >
                      <BaseSwitch />
                    </BaseForm.Item>
                  </BaseCol>
                </BaseRow>

                <BaseRow gutter={16}>
                  <BaseCol span={12}>
                    <BaseForm.Item
                      {...restField}
                      name={[name, "giaTriToiThieu"]}
                      label={t("criteriaMinVal")}
                    >
                      <BaseInput type="number" />
                    </BaseForm.Item>
                  </BaseCol>
                  <BaseCol span={12}>
                    <BaseForm.Item
                      {...restField}
                      name={[name, "giaTriToiDa"]}
                      label={t("criteriaMaxVal")}
                    >
                      <BaseInput type="number" />
                    </BaseForm.Item>
                  </BaseCol>
                </BaseRow>

                <BaseForm.Item
                  noStyle
                  shouldUpdate={(prev, curr) =>
                    prev?.tieuChi?.[name]?.loai !== curr?.tieuChi?.[name]?.loai
                  }
                >
                  {({ getFieldValue }) => {
                    const loai = getFieldValue(["tieuChi", name, "loai"]);
                    if (loai !== LoaiTieuChi.LUA_CHON) return null;

                    return (
                      <S.OptionsListContainer>
                        <S.OptionsHeader>
                          <span>{t("criteriaOptions")}</span>
                        </S.OptionsHeader>
                        <BaseForm.List name={[name, "cacLuaChon"]}>
                          {(optFields, { add: addOpt, remove: removeOpt }) => (
                            <>
                              {optFields.map((optField) => (
                                <S.OptionItem key={optField.key}>
                                  <BaseForm.Item
                                    {...optField}
                                    name={[optField.name, "nhan"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: t("validationLabelRequired"),
                                      },
                                    ]}
                                    style={{ margin: 0, flex: 1 }}
                                  >
                                    <BaseInput placeholder={t("optionLabel")} />
                                  </BaseForm.Item>
                                  <BaseForm.Item
                                    {...optField}
                                    name={[optField.name, "giaTri"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: t("validationScoreRequired"),
                                      },
                                    ]}
                                    style={{ margin: 0, width: 120 }}
                                  >
                                    <BaseInput
                                      type="number"
                                      min={0}
                                      max={100}
                                      placeholder={t("optionValue")}
                                    />
                                  </BaseForm.Item>
                                  <BaseButton
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => removeOpt(optField.name)}
                                  />
                                </S.OptionItem>
                              ))}
                              <BaseButton
                                type="dashed"
                                onClick={() => addOpt()}
                                icon={<PlusOutlined />}
                                size="small"
                                style={{ marginTop: 8 }}
                              >
                                {t("addOption")}
                              </BaseButton>
                            </>
                          )}
                        </BaseForm.List>
                      </S.OptionsListContainer>
                    );
                  }}
                </BaseForm.Item>
              </S.CriterionItem>
            ))}

            <BaseButton
              type="dashed"
              onClick={() => add()}
              icon={<PlusOutlined />}
              style={{ width: "100%" }}
            >
              {t("addCriteria")}
            </BaseButton>
          </S.CriteriaListContainer>
        )}
      </BaseForm.List>
    </div>
  );
};
