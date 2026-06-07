import { defaultLocale } from "@/config";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const validateEmoji = (value: string) => {
  const emojiRegex =
    /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F1E0}-\u{1F1FF}]/gu;
  return emojiRegex.test(value);
};

export const formatPhoneNumber = (value: string) => {
  const phoneRegex = /^(0|\+)[0-9]{9,11}$/;
  return phoneRegex.test(value);
};

export const checkEmoji = (message: string) => ({
  validator(_: any, value: string) {
    if (!value || !validateEmoji(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(message));
  },
});

export const checkAllspace = (message: string) => ({
  validator(_: any, value: string) {
    if (value && value.trim() === "") {
      return Promise.reject(new Error(message));
    }
    return Promise.resolve();
  },
});

export const checkPhoneNumber = (message: string) => ({
  validator(_: any, value: string) {
    if (!value || formatPhoneNumber(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(message));
  },
});

export const checkPassword = (message: string) => ({
  validator(_: any, value: string) {
    const regex = /^.{6,50}$/;
    if (!value || regex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(message));
  },
});

export const checkNumber = (message: string) => ({
  validator(_: any, value: any) {
    if (value === undefined || value === null || value === "") {
      return Promise.resolve();
    }

    const decimalRegex = /^[0-9]+(\.[0-9]{1,3})?$/;

    if (decimalRegex.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject(new Error(message));
  },
});

export const getFileName = (value: string) => {
  const urlElements = value?.split("/");
  if (urlElements?.length) {
    const fileId = urlElements[urlElements?.length - 1];
    const fileName = fileId.split(".pdf")[0];
    return fileName ?? "";
  }
  return "";
};

export const convertToHour = (times: number): string => {
  const hours = times / (1000 * 60 * 60);
  return hours.toFixed(2);
};

export const formatCurrency = (amount: number): string => {
  return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "VNĐ";
};

export const convertToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const convertToHHMM = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${remainingMinutes.toString().padStart(2, "0")}`;
};

export const truncateInfomation = (
  value: string | undefined,
  maxLength: number
): string => {
  if (!value) return "";
  return value.length > maxLength
    ? `${value.substring(0, maxLength)}...`
    : value;
};

export const convertToUpperCase = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
export function convertAmountToDateTime(isoString: string) {
  if (!isoString) {
    return "Invalid input: no data provided";
  }

  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return "Invalid date format";
  }

  const formattedDate = date.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return formattedDate;
}

export function getFileNameWithoutPrefix(fileName: string): string {
  const parts = fileName.split(".");
  const prefix = parts[0];

  return isTimestamp(prefix) ? parts.slice(1).join(".") : fileName;
}

export function isTimestamp(value: string): boolean {
  if (!/^\d+$/.test(value) || (value.length !== 13 && value.length !== 10)) {
    return false;
  }
  const timestamp =
    value.length === 13 ? parseInt(value, 10) : parseInt(value, 10) * 1000;
  const date = new Date(timestamp);
  const now = Date.now();
  return (
    date.getTime() > 0 && date.getTime() <= now + 30 * 365 * 24 * 60 * 60 * 1000
  );
}

export const formatToUpperCase = (value: string | undefined): string => {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
};

// SEO content
export const getSeoKey = (locale: string, type: string) => {
  try {
    return (
      type + (locale != defaultLocale ? capitalizeFirstLetter(locale) : "")
    );
  } catch (error) {
    console.error(error);
    return "";
  }
};

export const checkNationalID = (message: string) => ({
  validator(_: any, value: string) {
    if (!value || /^0\d{11}$/.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject(new Error(message));
  },
});

export const formatDuration = (value: number): string => {
  const hours = String(Math.floor(value / 60)).padStart(2, "0");
  const minutes = String(Math.floor(value % 60)).padStart(2, "0");

  return `${hours}:${minutes}`;
};

export function trimAllFields(data: any): any {
  if (Array.isArray(data)) {
    return data.map(trimAllFields);
  }

  if (data && typeof data === "object") {
    const result: any = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = trimAllFields(value);
    }
    return result;
  }

  return typeof data === "string" ? data.trim() : data;
}

/* eslint-enable @typescript-eslint/no-explicit-any */

export const getFirstLetterOfLastName = (fullName?: string): string => {
  if (!fullName?.trim()) return "";

  const parts = fullName.trim().split(/\s+/);

  return parts[parts.length - 1][0].toUpperCase();
};

export const toSnakeCase = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s_]/g, "")
    .replace(/[\s_]+/g, "_")
    .replace(/^_+|_+$/g, "");
