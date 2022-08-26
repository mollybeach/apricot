import * as React from 'react';
import { Avatar } from '@mui/material';

interface PhotoSquareProps {
  imgSrc: string;
  alt: string;
  style: any;
}

export default function PhotoSquare(props: PhotoSquareProps) {
  const { imgSrc, alt, style } = props;
  return (
    <>
      <Avatar variant={'square'} alt={alt} src={imgSrc} style={style} />
    </>
  );
}
