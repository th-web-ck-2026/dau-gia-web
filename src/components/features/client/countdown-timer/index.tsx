"use client";

import React, { useEffect, useState } from "react";

import { useTranslations } from "next-intl";

import { TrangThaiPhien } from "@/constants";

import * as S from "./index.styles";

interface CountdownTimerProps {
  targetDate: Date | string;
  status: TrangThaiPhien;
  onComplete?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  status,
  onComplete,
}) => {
  const t = useTranslations("common");
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      return Math.max(0, difference);
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        if (onComplete) {
          onComplete();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, mounted, onComplete]);

  if (!mounted) {
    return (
      <S.TimerContainer>
        <S.TimeBlock>
          <S.TimeValue $status={status}>0</S.TimeValue>
          <S.TimeLabel>{t("days", { defaultValue: "Ngày" })}</S.TimeLabel>
        </S.TimeBlock>
        <S.TimeBlock>
          <S.TimeValue $status={status}>00</S.TimeValue>
          <S.TimeLabel>{t("hours", { defaultValue: "Giờ" })}</S.TimeLabel>
        </S.TimeBlock>
        <S.TimeBlock>
          <S.TimeValue $status={status}>00</S.TimeValue>
          <S.TimeLabel>{t("minutes", { defaultValue: "Phút" })}</S.TimeLabel>
        </S.TimeBlock>
        <S.TimeBlock>
          <S.TimeValue $status={status}>00</S.TimeValue>
          <S.TimeLabel>{t("seconds", { defaultValue: "Giây" })}</S.TimeLabel>
        </S.TimeBlock>
      </S.TimerContainer>
    );
  }

  if (timeLeft <= 0) {
    return (
      <S.TextTimer $status={status}>{t("ended") || "Đã kết thúc"}</S.TextTimer>
    );
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const pad = (num: number) => String(num).padStart(2, "0");

  return (
    <S.TimerContainer>
      <S.TimeBlock>
        <S.TimeValue $status={status}>{days}</S.TimeValue>
        <S.TimeLabel>{t("days", { defaultValue: "Ngày" })}</S.TimeLabel>
      </S.TimeBlock>
      <S.TimeBlock>
        <S.TimeValue $status={status}>{pad(hours)}</S.TimeValue>
        <S.TimeLabel>{t("hours", { defaultValue: "Giờ" })}</S.TimeLabel>
      </S.TimeBlock>
      <S.TimeBlock>
        <S.TimeValue $status={status}>{pad(minutes)}</S.TimeValue>
        <S.TimeLabel>{t("minutes", { defaultValue: "Phút" })}</S.TimeLabel>
      </S.TimeBlock>
      <S.TimeBlock>
        <S.TimeValue $status={status}>{pad(seconds)}</S.TimeValue>
        <S.TimeLabel>{t("seconds", { defaultValue: "Giây" })}</S.TimeLabel>
      </S.TimeBlock>
    </S.TimerContainer>
  );
};

export default CountdownTimer;
