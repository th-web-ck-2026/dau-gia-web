import React from "react";

import { useTranslations } from "next-intl";

import { message } from "antd";

import {
  BaseButton,
  BaseForm,
  BaseInput,
  BaseProgress,
} from "@/components/common";

// import type { ChangePasswordDto } from "@/interfaces/auth";
import * as S from "../index.styles";

interface PasswordRule {
  key: string;
  labelKey: string;
  test: (val: string) => boolean;
}

const passwordRules: PasswordRule[] = [
  {
    key: "minLength",
    labelKey: "reqMinLength",
    test: (val) => val.length >= 8,
  },
  {
    key: "number",
    labelKey: "reqNumber",
    test: (val) => /\d/.test(val),
  },
  {
    key: "lowercase",
    labelKey: "reqLowercase",
    test: (val) => /[a-z]/.test(val),
  },
  {
    key: "uppercase",
    labelKey: "reqUppercase",
    test: (val) => /[A-Z]/.test(val),
  },
  {
    key: "special",
    labelKey: "reqSpecial",
    test: (val) => /[^A-Za-z0-9]/.test(val),
  },
];

const ChangePasswordForm: React.FC = () => {
  const t = useTranslations("client.profile");
  const [form] = BaseForm.useForm();

  const newPassword = BaseForm.useWatch("newPassword", form) || "";

  const passedCount = passwordRules.filter((rule) =>
    rule.test(newPassword)
  ).length;
  const percent = newPassword
    ? Math.round((passedCount / passwordRules.length) * 100)
    : 0;

  const isPasswordValid =
    newPassword.length > 0 && passedCount === passwordRules.length;

  const validateNewPassword = (_: any, value?: string) => {
    const password = value || "";
    if (!password) {
      return Promise.reject(new Error(t("errPasswordRequired")));
    }
    const valid = passwordRules.every((rule) => rule.test(password));
    if (!valid) {
      return Promise.reject(new Error(t("passwordInvalid")));
    }
    return Promise.resolve();
  };

  const handleFinish = (values: any) => {
    console.log("Password change requested:", values);
    message.success(t("successUpdatePassword"));
    form.resetFields();
  };

  return (
    <BaseForm
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={handleFinish}
      autoComplete="off"
    >
      {/* Current Password */}
      <BaseForm.Item
        name="oldPassword"
        label={
          <span>
            {t("currentPassword")}
            <S.RequiredMark>*</S.RequiredMark>
          </span>
        }
        rules={[
          {
            required: true,
            message: t("errCurrentPasswordRequired"),
          },
        ]}
      >
        <BaseInput.Password
          size="large"
          placeholder={t("placeholderCurrentPassword")}
        />
      </BaseForm.Item>

      {/* New Password */}
      <BaseForm.Item
        name="newPassword"
        label={
          <span>
            {t("newPassword")}
            <S.RequiredMark>*</S.RequiredMark>
          </span>
        }
        validateTrigger={["onChange", "onBlur"]}
        rules={[{ validator: validateNewPassword }]}
      >
        <BaseInput.Password
          size="large"
          placeholder={t("placeholderNewPassword")}
        />
      </BaseForm.Item>

      {/* Requirements progress bar and status */}
      {newPassword && (
        <S.PasswordStatusWrapper>
          <BaseProgress
            percent={percent}
            showInfo={false}
            strokeColor={isPasswordValid ? "#22c55e" : "#ef4444"}
            trailColor="#e5e7eb"
            strokeWidth={6}
            style={{ marginBottom: 16 }}
          />
          <S.RuleBox>
            <S.RuleTitle>
              {isPasswordValid ? t("passwordValid") : t("passwordReqTitle")}
            </S.RuleTitle>
            <S.RuleList>
              {passwordRules.map((rule) => {
                const passed = rule.test(newPassword);
                return (
                  <S.RuleItem key={rule.key} $passed={passed}>
                    <S.RuleIcon>{passed ? "✓" : "×"}</S.RuleIcon>
                    <span>{t(rule.labelKey)}</span>
                  </S.RuleItem>
                );
              })}
            </S.RuleList>
          </S.RuleBox>
        </S.PasswordStatusWrapper>
      )}

      {/* Confirm Password */}
      <BaseForm.Item
        name="confirmPassword"
        label={
          <span>
            {t("confirmNewPassword")}
            <S.RequiredMark>*</S.RequiredMark>
          </span>
        }
        dependencies={["newPassword"]}
        validateTrigger={["onChange", "onBlur"]}
        rules={[
          {
            required: true,
            message: t("errConfirmPasswordRequired"),
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(t("errPasswordMismatch")));
            },
          }),
        ]}
      >
        <BaseInput.Password
          size="large"
          placeholder={t("placeholderConfirmNewPassword")}
        />
      </BaseForm.Item>

      {/* Submit Button */}
      <BaseForm.Item style={{ marginTop: 24, marginBottom: 0 }}>
        <BaseButton type="primary" htmlType="submit" size="large">
          {t("updatePassword")}
        </BaseButton>
      </BaseForm.Item>
    </BaseForm>
  );
};

export default ChangePasswordForm;
