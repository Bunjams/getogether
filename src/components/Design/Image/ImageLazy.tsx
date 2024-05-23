import React, { ImgHTMLAttributes, useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

const ImageLazy = ({
  src,
  fallbackimg,
  fallbackClassName,
  fallbackStyle,
  ...rest
}: {
  src: string;
  fallbackimg: string;
  fallbackClassName?: string;
  fallbackStyle?: React.CSSProperties;
} & ImgHTMLAttributes<HTMLImageElement>) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const img = new Image();
    img.src = src;
    img.onload = () => setLoading(false);
    img.onerror = () => {
      img.src = fallbackimg;
      setLoading(false);
    };
  }, [src, fallbackimg]);

  return loading ? (
    <Blurhash
      hash={fallbackimg}
      punch={1}
      className={fallbackClassName}
      style={fallbackStyle}
    />
  ) : (
    <img src={src} loading="lazy" alt="" {...rest} />
  );
};

export default ImageLazy;
