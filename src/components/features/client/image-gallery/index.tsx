"use client";

import React, { useState } from "react";

import NextImage from "next/image";

import { Image as AntImage } from "antd";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import { EffectFade, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import * as S from "./index.styles";

export interface ImageGalleryProps {
  images?: string[];
  mainWidth?: number;
  mainHeight?: number;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  slidesPerView?: number;
  previewable?: boolean;
  quality?: number;
  fallbackImage?: string;
}

const ImageGallery = ({
  images = [],
  slidesPerView = 4,
  previewable = true,
  quality = 100,
  fallbackImage = "/images/assets-default.png",
}: ImageGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);

  const galleryImages = images.length > 0 ? images : [fallbackImage];

  const handleSelectImage = (index: number) => {
    setActiveIndex(index);
    mainSwiper?.slideTo(index);
    thumbsSwiper?.slideTo(index);
  };

  return (
    <S.GalleryWrapper>
      <S.MainSwiperWrapper>
        <Swiper
          modules={[EffectFade]}
          onSwiper={setMainSwiper}
          effect="fade"
          speed={350}
          spaceBetween={10}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
            thumbsSwiper?.slideTo(swiper.activeIndex);
          }}
        >
          {galleryImages.map((src, index) => (
            <SwiperSlide key={`${src}-${index}`}>
              <S.ImageClickArea
                onClick={() => previewable && setPreviewOpen(true)}
                style={{ cursor: previewable ? "zoom-in" : "default" }}
              >
                <NextImage
                  src={src}
                  alt={`gallery-image-${index}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 682px"
                  style={{
                    objectFit: "cover",
                  }}
                  quality={quality}
                  priority={index === 0}
                />
              </S.ImageClickArea>
            </SwiperSlide>
          ))}
        </Swiper>
      </S.MainSwiperWrapper>

      {galleryImages.length > 1 && (
        <S.ThumbnailsWrapper>
          <Swiper
            modules={[FreeMode]}
            onSwiper={setThumbsSwiper}
            slidesPerView={slidesPerView}
            spaceBetween={12}
            freeMode={false}
            watchSlidesProgress
            allowTouchMove
          >
            {galleryImages.map((src, index) => (
              <SwiperSlide key={`${src}-${index}`}>
                <S.ThumbnailButton
                  type="button"
                  $isActive={activeIndex === index}
                  onClick={() => handleSelectImage(index)}
                >
                  <S.ThumbnailInner>
                    <NextImage
                      src={src}
                      alt={`thumbnail-${index}`}
                      fill
                      sizes="124px"
                      style={{
                        objectFit: "cover",
                      }}
                      quality={quality}
                    />
                  </S.ThumbnailInner>
                </S.ThumbnailButton>
              </SwiperSlide>
            ))}
          </Swiper>
        </S.ThumbnailsWrapper>
      )}

      {previewable && (
        <AntImage.PreviewGroup
          items={galleryImages}
          preview={{
            visible: previewOpen,
            current: activeIndex,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            onChange: (current) => {
              setActiveIndex(current);
              mainSwiper?.slideTo(current);
              thumbsSwiper?.slideTo(current);
            },
          }}
        />
      )}
    </S.GalleryWrapper>
  );
};

export default ImageGallery;
