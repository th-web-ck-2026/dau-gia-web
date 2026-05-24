export const formatCurrency = (value?: number, locale: string = "vi") => {
  if (value === undefined || value === null) return "---";
  return new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US", {
    style: "currency",
    currency: locale === "vi" ? "VND" : "USD",
  }).format(value);
};

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  ended: boolean;
}

export const calculateTimeLeft = (targetDateStr: string): TimeLeft => {
  const targetTime = new Date(targetDateStr).getTime();
  const now = Date.now();
  const difference = targetTime - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    ended: false,
  };
};

export const formatTimeLeft = (timeLeft: TimeLeft, t: any): string => {
  if (timeLeft.ended) {
    return t("ended");
  }
  const parts = [];
  if (timeLeft.days > 0) parts.push(`${timeLeft.days}${t("days")}`);
  if (timeLeft.hours > 0) parts.push(`${timeLeft.hours}${t("hours")}`);
  if (timeLeft.minutes > 0) parts.push(`${timeLeft.minutes}${t("minutes")}`);
  parts.push(`${timeLeft.seconds}${t("seconds")}`);

  return parts.slice(0, 2).join(" ");
};
