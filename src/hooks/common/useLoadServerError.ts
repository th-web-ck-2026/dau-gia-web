import { useCallback } from "react";
import { FormInstance } from "antd";

import { ResponseCode } from "@/constants";
import { ApiError, ApiErrorData, ValidationError } from "@/interfaces";

import { useFeedback } from "./useFeedback";

type LoadServerErrorsArgs = {
  error: ApiError | ApiErrorData | unknown;
  form?: FormInstance;
};

const IGNORED_ERROR_MESSAGES = ["canceled"];

const COMMON_ERROR_MESSAGE = "Có lỗi xảy ra. Vui lòng thử lại sau.";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isApiErrorResponse = (value: unknown): value is ApiErrorData => {
  if (!isRecord(value)) return false;
  return "status" in value && "data" in value;
};

const resolveErrorResponse = (
  error: ApiError | ApiErrorData | unknown
): ApiErrorData | null => {
  if (!error) return null;
  if (isApiErrorResponse(error)) {
    return error;
  }
  if (isRecord(error) && "response" in error) {
    const response = (error as { response?: unknown }).response;
    if (isApiErrorResponse(response)) {
      return response;
    }
  }
  return null;
};

export function useLoadServerError() {
  const { notification } = useFeedback();

  const showErrorMessage = useCallback((message: string | string[]) => {
    const normalizedMessage = Array.isArray(message) ? message[0] : message;

    if (
      normalizedMessage &&
      IGNORED_ERROR_MESSAGES.includes(normalizedMessage)
    ) {
      return;
    }

    notification.error({
      message: normalizedMessage || COMMON_ERROR_MESSAGE
    });
  }, [notification]);

  const handleValidationErrors = useCallback((
    data: ValidationError,
    form: FormInstance
  ) => {
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
  }, [showErrorMessage]);

  const loadServerErrors = useCallback(({ error, form }: LoadServerErrorsArgs) => {
    if (!error) return;

    const errorData = (error as any)?.response?.data || (error as any)?.data || error;
    const status = (error as any)?.response?.status || (error as any)?.status || (error as any)?.statusCode;
    const config = (error as any)?.config || (error as any)?.response?.config;

    if (config?._silent) return;

    if (status === ResponseCode.VALIDATION_ERROR && form) {
      const validationData = isRecord(errorData) ? errorData : {};
      if ("detail" in validationData) {
        // @ts-ignore
        handleValidationErrors(validationData as ValidationError, form as FormInstance);
        return;
      }
    }

    const message =
      (isRecord(errorData)
        ? (isRecord(errorData.error) ? errorData.error.message : errorData.error) || errorData.message
        : undefined) ||
      (error as any)?.message ||
      "";

    showErrorMessage(message);
  }, [handleValidationErrors, showErrorMessage]);

  return {
    loadServerErrors,
  };
}
