export const formatNumber = (
  num: number | string | undefined | null
): string => {
  if (num === undefined || num === null) return "0";
  const parsed = Number(num);
  if (isNaN(parsed)) return "0";
  return parsed.toLocaleString("vi-VN");
};
