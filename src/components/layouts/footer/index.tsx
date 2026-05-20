"use client";

import {
  EnvironmentOutlined,
  FileTextOutlined,
  MailOutlined,
  PhoneOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

import BrandLogo from "@/assets/svg/bidwar-text-brand.svg";
import { BaseButton, BaseCol, BaseInput, BaseRow } from "@/components/common";
import { Link } from "@/i18n/routing";

import * as S from "./index.styles";
import useFooterUtils from "./index.utils";

const Footer = () => {
  const { t, infoT, email, setEmail, handleSubscribe } = useFooterUtils();

  return (
    <S.FooterWrapper>
      <S.FooterContainer>
        <S.TopSection>
          <S.LogoSection>
            <BrandLogo />
            <S.CompanyName>{t("companyName")}</S.CompanyName>
          </S.LogoSection>
          <S.Tagline>{t("tagline")}</S.Tagline>
        </S.TopSection>

        <BaseRow gutter={[32, 32]}>
          <BaseCol xs={24} md={12} lg={10}>
            <S.ColumnTitle>{t("contact")}</S.ColumnTitle>
            <S.ContactList>
              <S.ContactItem>
                <EnvironmentOutlined />
                <span>
                  <strong>{t("address")}:</strong> {infoT("address")}
                </span>
              </S.ContactItem>
              <S.ContactItem>
                <PhoneOutlined />
                <span>
                  <strong>{t("phone")}:</strong> {infoT("phoneNumber")}
                </span>
              </S.ContactItem>
              <S.ContactItem>
                <PrinterOutlined />
                <span>
                  <strong>Fax:</strong> {infoT("fax")}
                </span>
              </S.ContactItem>
              <S.ContactItem>
                <MailOutlined />
                <span>
                  <strong>{t("email")}:</strong> {infoT("email")}
                </span>
              </S.ContactItem>
            </S.ContactList>
          </BaseCol>

          <BaseCol xs={24} sm={12} md={6} lg={6}>
            <S.ColumnTitle>{t("aboutUs")}</S.ColumnTitle>
            <S.LinkList>
              <S.LinkItem>
                <Link href="/about">{t("about")}</Link>
              </S.LinkItem>
              <S.LinkItem>
                <Link href="/about">{t("visionMission")}</Link>
              </S.LinkItem>
              <S.LinkItem>
                <Link href="/news">{t("newsEvents")}</Link>
              </S.LinkItem>
              <S.LinkItem>
                <Link href="/about">{t("regulations")}</Link>
              </S.LinkItem>
              <S.LinkItem>
                <Link href="/about">{t("userManual")}</Link>
              </S.LinkItem>
              <S.LinkItem>
                <Link href="/about">{t("privacyPolicy")}</Link>
              </S.LinkItem>
              <S.LinkItem>
                <Link href="/about">{t("termsOfUse")}</Link>
              </S.LinkItem>
            </S.LinkList>
          </BaseCol>

          <BaseCol xs={24} sm={12} md={6} lg={8}>
            <S.ColumnTitle>{t("subscribe")}</S.ColumnTitle>
            <S.SubscribeFormWrapper>
              <S.SubscribeDescription>
                {t("subscribeDesc")}
              </S.SubscribeDescription>
              <S.SubscribeInputGroup>
                <BaseInput
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onPressEnter={handleSubscribe}
                />
                <BaseButton type="primary" onClick={handleSubscribe}>
                  {t("subscribeBtn")}
                </BaseButton>
              </S.SubscribeInputGroup>
            </S.SubscribeFormWrapper>
          </BaseCol>
        </BaseRow>

        <S.FooterDivider />

        <S.BottomSection>
          <S.BottomText>
            <FileTextOutlined style={{ marginRight: "8px" }} />
            {infoT("license")}
          </S.BottomText>
          <S.BottomText>
            <FileTextOutlined style={{ marginRight: "8px" }} />
            {infoT("approval")}
          </S.BottomText>
          <S.CopyrightText>{infoT("copyright")}</S.CopyrightText>
        </S.BottomSection>
      </S.FooterContainer>
    </S.FooterWrapper>
  );
};

export default Footer;
