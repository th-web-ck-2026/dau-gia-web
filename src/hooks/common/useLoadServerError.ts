import { useCallback } from "react";

import { useTranslations } from "next-intl";

import { FormInstance } from "antd";

import { ResponseCode } from "@/constants";
import { ApiError, ApiErrorData, ValidationError } from "@/interfaces";

import { useFeedback } from "./useFeedback";

type LoadServerErrorsArgs = {
  error: ApiError | ApiErrorData | unknown;
  form?: FormInstance;
};

const IGNORED_ERROR_MESSAGES = ["canceled"];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export function useLoadServerError() {
  const { notification } = useFeedback();
  const t = useTranslations("common");

  const showErrorMessage = useCallback(
    (message: string | string[]) => {
      const normalizedMessage = Array.isArray(message) ? message[0] : message;

      if (
        normalizedMessage &&
        IGNORED_ERROR_MESSAGES.includes(normalizedMessage)
      ) {
        return;
      }

      notification.error({
        message: t("error"),
        description: normalizedMessage || t("errorMessageCommon"),
      });
    },
    [notification, t]
  );

  const handleValidationErrors = useCallback(
    (data: ValidationError, form: FormInstance) => {
      const formFields = form.getFieldsValue();
      const fieldErrors: Array<{ name: string; errors: string[] }> = [];

      Object.keys(formFields).forEach((fieldName) => {
        const errorDetail = data.detail[fieldName];
        if (errorDetail) {
          fieldErrors.push({
            name: fieldName,
            errors: [errorDetail.message],
          });
        }
      });

      if (fieldErrors.length > 0) {
        form.setFields(fieldErrors);
        return;
      }

      const firstError = Object.values(data.detail)[0];
      if (firstError) {
        showErrorMessage(firstError.message);
      } else {
        showErrorMessage("Some fields are invalid");
      }
    },
    [showErrorMessage]
  );

  const loadServerErrors = useCallback(
    ({ error, form }: LoadServerErrorsArgs) => {
      if (!error) return;

      const errorData =
        (error as any)?.response?.data || (error as any)?.data || error;
      const status =
        (error as any)?.response?.status ||
        (error as any)?.status ||
        (error as any)?.statusCode;
      const config = (error as any)?.config || (error as any)?.response?.config;

      if (config?._silent) return;

      if (status === ResponseCode.VALIDATION_ERROR && form) {
        const validationData = isRecord(errorData) ? errorData : {};
        if ("detail" in validationData) {
          handleValidationErrors(
            validationData as unknown as ValidationError,
            form as FormInstance
          );
          return;
        }
      }

      const message =
        (isRecord(errorData)
          ? (isRecord(errorData.error)
              ? errorData.error.message
              : errorData.error) || errorData.message
          : undefined) ||
        (error as any)?.message ||
        "";

      showErrorMessage(message);
    },
    [handleValidationErrors, showErrorMessage]
  );

  return {
    loadServerErrors,
  };
}
