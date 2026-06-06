"use client";

import React from "react";

import { useTranslations } from "next-intl";

import { TrangThaiPhien } from "@/constants";

import * as S from "./index.styles";

interface SectionStatusProps {
  status: TrangThaiPhien;
  text?: string;
  dot?: boolean;
}

const SessionStatus: React.FC<SectionStatusProps> = ({
  status,
  text,
  dot = true,
}) => {
  const t = useTranslations("sessionStatus");
  const displayText = text || t(status);

  return (
    <S.StyledTag $status={status} $showDot={dot}>
      {displayText}
    </S.StyledTag>
  );
};

export default SessionStatus;
