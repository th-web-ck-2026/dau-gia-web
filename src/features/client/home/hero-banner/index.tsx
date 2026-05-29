import Image from "next/image";

import HeroBannerImage from "@/assets/images/home/hero-banner.png";

import * as S from "./index.styles";

const HeroBanner = () => (
  <S.BannerWrapper>
    <Image
      src={HeroBannerImage}
      alt="Hero Banner"
      priority
      placeholder="blur"
      sizes="100vw"
      quality={100}
    />
  </S.BannerWrapper>
);

export default HeroBanner;
