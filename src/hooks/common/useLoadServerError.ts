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
  return (
    "status" in value &&
    "data" in value &&
    "statusText" in value &&
    "headers" in value &&
    "config" in value
  );
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

  const loadServerErrors = ({ error, form }: LoadServerErrorsArgs) => {
    if (!error) {
      return;
    }

    const response = resolveErrorResponse(error);
    const status = response?.status;
    const errorData = response?.data;

    if (status === ResponseCode.VALIDATION_ERROR && !!form) {
      if (isRecord(errorData) && "detail" in errorData) {
        handleValidationErrors(errorData as ValidationError, form);
        return;
      }
    }

    const message =
      (isRecord(errorData) && "message" in errorData
        ? (errorData.message as string)
        : undefined) ||
      (isRecord(error) && "message" in error ? (error.message as string) : "");

    showErrorMessage(message);
  };

  const handleValidationErrors = (
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
  };

  const showErrorMessage = (message: string | string[]) => {
    const normalizedMessage = Array.isArray(message) ? message[0] : message;

    if (
      normalizedMessage &&
      IGNORED_ERROR_MESSAGES.includes(normalizedMessage)
    ) {
      return;
    }

    notification.error({ message: COMMON_ERROR_MESSAGE });
  };

  return {
    loadServerErrors,
  };
}
