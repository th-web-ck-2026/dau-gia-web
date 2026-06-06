import styled from "styled-components";

export const GalleryWrapper = styled.div`
  width: 100%;
`;

export const MainSwiperWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 682 / 505;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  background-color: ${({ theme }) => theme.backgroundTeriary};

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    width: 100%;
    height: 100%;
  }
`;

export const ImageClickArea = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: zoom-in;
`;

export const ThumbnailsWrapper = styled.div`
  margin-top: 16px;
  width: 100%;

  .swiper {
    width: 100%;
    padding: 2px 0;
  }
`;

export const ThumbnailButton = styled.button<{ $isActive: boolean }>`
  width: 100%;
  aspect-ratio: 124 / 92;
  border-radius: ${({ theme }) => theme.borderRadius.xxxs};
  padding: 2px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.backgroundColorBase};
  border: 2px solid
    ${({ theme, $isActive }) => ($isActive ? theme.primary : theme.border)};
  transition: all 0.2s ease-in-out;
  outline: none;

  &:hover {
    border-color: ${({ theme, $isActive }) =>
      $isActive ? theme.primary : theme.primary3};
  }
`;

export const ThumbnailInner = styled.span`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: calc(${({ theme }) => theme.borderRadius.xxxs} - 2px);
  overflow: hidden;
`;
