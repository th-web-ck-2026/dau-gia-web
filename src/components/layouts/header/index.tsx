"use client";

import React, { useEffect, useState } from "react";

import { useTranslations } from "next-intl";

import { MailOutlined, MenuOutlined, PhoneOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import BrandLogo from "@/assets/svg/bidwar-text-brand.svg";
import WifiConnectedIcon from "@/assets/svg/wifi-connected";
import WifiDisconnectedIcon from "@/assets/svg/wifi-disconnected";
import { BaseDrawer, BaseTooltip } from "@/components/common";
import LanguageAction from "@/components/layouts/header/language";
import { useAuth, useOnlineStatus } from "@/hooks/common";
import { Link, usePathname } from "@/i18n/routing";

import * as S from "./index.styles";
import Navigation from "./navigation";
import Profile from "./profile";

const Header = () => {
  const t = useTranslations("header");
  const infoTranslations = useTranslations("infomation");
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const isOnline = useOnlineStatus();

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
    if (path.startsWith("/auctions")) return "/auctions";
    if (path.startsWith("/news")) return "/news";
    if (path.startsWith("/notices")) return "/notices";
    if (path.startsWith("/contact")) return "/contact";
    if (path.startsWith("/about")) return "/about";
    return "";
  };

  const mobileMenuItems = [
    {
      key: "/",
      label: <Link href="/">{t("home")}</Link>,
    },
    {
      key: "/auctions",
      label: <Link href="/auctions">{t("auctionAssets")}</Link>,
    },
    {
      key: "/news",
      label: <Link href="/news">{t("news")}</Link>,
    },
    {
      key: "/notices",
      label: <Link href="/notices">{t("auctionNotices")}</Link>,
    },
    {
      key: "/contact",
      label: <Link href="/contact">{t("contact")}</Link>,
    },
  ];

  return (
    <S.HeaderWrapper>
      <S.TopBar>
        <S.TopBarLeft>
          <S.TopBarItem>
            <PhoneOutlined />
            <span>{infoTranslations("phoneNumber")}</span>
          </S.TopBarItem>
          <S.TopBarItem>
            <MailOutlined />
            <span>{infoTranslations("email")}</span>
          </S.TopBarItem>
        </S.TopBarLeft>
        <S.TopBarRight>
          <S.LanguageSelectorWrapper>
            <LanguageAction color="white" />
          </S.LanguageSelectorWrapper>
        </S.TopBarRight>
      </S.TopBar>

      <S.MainBar>
        <Link href="/" passHref legacyBehavior>
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

          <Profile />

          <BaseTooltip
            title={
              isOnline ? t("connectionStatus") : t("connectionStatusOffline")
            }
          >
            <S.WifiIconWrapper>
              {isOnline ? <WifiConnectedIcon /> : <WifiDisconnectedIcon />}
            </S.WifiIconWrapper>
          </BaseTooltip>
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
            <S.DrawerDivider />
            <S.DrawerMenuItem
              $selected={getActiveKey(pathname) === "/about"}
              onClick={() => setDrawerVisible(false)}
            >
              <Link href="/about">{t("about")}</Link>
            </S.DrawerMenuItem>
          </S.DrawerMenu>

          <S.DrawerDivider />

          <S.DrawerFooter>
            {isMounted && (
              <S.DrawerClock>
                <span style={{ fontSize: "14px", color: "#6B7280" }}>
                  System Time
                </span>
                <div style={{ textAlign: "right" }}>
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
