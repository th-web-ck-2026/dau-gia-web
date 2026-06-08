"use client";

import React, { useEffect, useState } from "react";

import { useTranslations } from "next-intl";

import { MenuOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import BrandLogo from "@/assets/svg/bidwar-text-brand.svg";
import { BaseDrawer } from "@/components/common";
import LanguageAction from "@/components/layouts/header/language";
import { useAuth } from "@/hooks/common";
import { Link, usePathname } from "@/i18n/routing";

import * as S from "./index.styles";
import Navigation from "./navigation";
import { NotificationBell } from "./notification";
import Profile from "./profile";

const Header = () => {
  const t = useTranslations("header");
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsMounted(true);
      setTime(dayjs().format("HH:mm:ss"));
      setDate(dayjs().format("DD/MM/YYYY"));
    }, 0);

    const intervalId = setInterval(() => {
      setTime(dayjs().format("HH:mm:ss"));
      setDate(dayjs().format("DD/MM/YYYY"));
    }, 1000);

    return () => {
      clearTimeout(timerId);
      clearInterval(intervalId);
    };
  }, []);

  const getActiveKey = (path: string): string => {
    if (path === "/" || path === "") return "/";
    if (path.startsWith("/sessions")) return "/sessions";
    if (path.startsWith("/leaderboard")) return "/leaderboard";
    return "";
  };

  const mobileMenuItems = [
    {
      key: "/",
      label: <Link href="/">{t("home")}</Link>,
    },
    {
      key: "/sessions",
      label: <Link href="/sessions">{t("sessions")}</Link>,
    },
    {
      key: "/leaderboard",
      label: <Link href="/leaderboard">{t("leaderboard")}</Link>,
    },
  ];

  return (
    <S.HeaderWrapper>
      <S.MainBar>
        <Link href="/">
          <S.LogoContainer>
            <BrandLogo />
          </S.LogoContainer>
        </Link>

        <Navigation />

        <S.RightSection>
          {isMounted && (
            <S.ClockWrapper>
              <S.ClockTime>{time}</S.ClockTime>
              <S.ClockDate>{date}</S.ClockDate>
            </S.ClockWrapper>
          )}

          {isAuthenticated && <NotificationBell />}
          <Profile />

          <S.LanguageSelectorWrapper>
            <LanguageAction />
          </S.LanguageSelectorWrapper>
        </S.RightSection>

        <S.MobileSection>
          <S.MobileHamburger onClick={() => setDrawerVisible(true)}>
            <MenuOutlined />
          </S.MobileHamburger>
        </S.MobileSection>
      </S.MainBar>

      <BaseDrawer
        title={t("home")}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
      >
        <S.DrawerContent>
          <S.DrawerMenu>
            {mobileMenuItems.map((item) => {
              const isSelected = getActiveKey(pathname) === item.key;
              return (
                <S.DrawerMenuItem
                  key={item.key}
                  $selected={isSelected}
                  onClick={() => setDrawerVisible(false)}
                >
                  {item.label}
                </S.DrawerMenuItem>
              );
            })}
          </S.DrawerMenu>

          <S.DrawerDivider />

          <S.DrawerFooter>
            {isMounted && (
              <S.DrawerClock>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 700, color: "#111827" }}>
                    {time}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>
                    {date}
                  </div>
                </div>
              </S.DrawerClock>
            )}

            {isAuthenticated ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0 8px",
                    gap: "4px",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "#6B7280" }}>
                    Logged in as
                  </span>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    {user?.fullname || user?.email}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Link href="/profile" passHref legacyBehavior>
                    <a
                      onClick={() => setDrawerVisible(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "38px",
                        border: "1px solid #1f3aa0",
                        color: "#1f3aa0",
                        borderRadius: "6px",
                        fontWeight: 600,
                      }}
                    >
                      {t("profile")}
                    </a>
                  </Link>
                  <button
                    onClick={() => {
                      setDrawerVisible(false);
                      logout();
                    }}
                    style={{
                      height: "38px",
                      backgroundColor: "#1f3aa0",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "6px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {t("logout")}
                  </button>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Link href="/auth/login" passHref legacyBehavior>
                  <a
                    onClick={() => setDrawerVisible(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "38px",
                      backgroundColor: "#1f3aa0",
                      color: "#ffffff",
                      borderRadius: "6px",
                      fontWeight: 600,
                    }}
                  >
                    {t("login")}
                  </a>
                </Link>
                <Link href="/auth/register" passHref legacyBehavior>
                  <a
                    onClick={() => setDrawerVisible(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "38px",
                      border: "1px solid #1f3aa0",
                      color: "#1f3aa0",
                      borderRadius: "6px",
                      fontWeight: 600,
                    }}
                  >
                    {t("register")}
                  </a>
                </Link>
              </div>
            )}
          </S.DrawerFooter>
        </S.DrawerContent>
      </BaseDrawer>
    </S.HeaderWrapper>
  );
};

export default Header;
