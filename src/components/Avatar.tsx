import * as React from 'react';
import { Avatar as MuiAvatar } from '@mui/material';

interface ImageAvatarProps {
  imgSrc: string;
  alt: string;
  sx?: any;
}

export default function Avatar(props: ImageAvatarProps) {
  const { imgSrc, alt, sx } = props;
  return <MuiAvatar alt={alt} src={imgSrc} sx={sx} />;
}
