import React from "react";

import { Image, ImageProps } from "antd";

export type BaseImageProps = ImageProps;

interface IBaseImage extends React.FC<BaseImageProps> {
  PreviewGroup: typeof Image.PreviewGroup;
}

export const BaseImage: IBaseImage = (props) => {
  return <Image {...props} />;
};

BaseImage.PreviewGroup = Image.PreviewGroup;
