import dayjs from "dayjs";

export enum ResponseCode {
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  VALIDATION_ERROR = 422,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export enum SortOrder {
  DESC = "DESC",
  ASC = "ASC",
}

export const DATE_FORMAT = {
  SHORT_MONTH_YEAR: "MM/yy",
  BASIC_DATE: "DD-MM-YYYY",
  BASIC_DATE_2: "YYYY/MM/DD",
  FULL_DATE_TIME: "YYYY/MM/DD HH:mm",
  FULL_DATE_TIME_VI: "DD/MM/YYYY HH:mm",
  ISO_DATE: "YYYY-MM-DD",
  FULL_DATE_WITH_TIME: "HH:mm DD MMM YYYY",
  YEAR_MONTH_DAY: "YYYY-MM-DD",
  MONTH_DAY_YEAR: "MM/DD/YYYY",
  DAY_MONTH_YEAR: "DD/MM/YYYY",
  HOURS_MINUTES: "HH:mm",
  LONG_MONTH: "DD MMMM YYYY",
  LONG_MONTH_VI: "DD [Tháng] M YYYY",
  MINUTES_SECONDS: "mm:ss",
  TIME_DATE_PART: "hh:mm A DD/MM/YYYY",
  DATE_TEXT_MONTH: "DD MMM YYYY",
  DD_MM_YYYY: "DD/MM/YYYY",
  ISO_WITH_TIMEZONE: "YYYY-MM-DDTHH:mm:ss.SSSZ",
} as const;

export enum SORT_TYPE {
  DESC = "desc",
  ASC = "asc",
}

export enum LOCALE {
  EN = "en",
  VI = "vi",
}

export const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

export const WEBSITE_PATTERN =
  /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)?$/i;

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

export const ALLOWED_DOCUMENT_TYPES = ".pdf,.doc,.docx,.ppt,.pptx";

export const formatDate = (date: string | null | undefined): string => {
  if (!date) return "-";
  return dayjs(date).format(DATE_FORMAT.DAY_MONTH_YEAR);
};

export const formatCurrency = (value: number, currencyLabel: string) =>
  `${new Intl.NumberFormat("en-US").format(value)} ${currencyLabel}`;

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum AuthProvider {
  EMAIL = "email",
  GOOGLE = "google",
}