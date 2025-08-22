import { Box, Paper } from '@mui/material';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface Props {
  src: string;
  alt: string;
  height?: number | string;
}

export function ImageWithOffsetBg({ src, alt, height = 350 }: Props) {
  const offset = '20px'; // Jak bardzo obrazek ma "wystawać"

  return (
    <Box sx={{ position: 'relative', height, width: '100%' }}>
      <Paper
        elevation={3}
        sx={{
          position: 'absolute',
          top: offset,
          left: offset,
          width: `calc(100% - ${offset})`,
          height: `calc(100% - ${offset})`,
          backgroundColor: 'white',
          borderRadius: '12px',
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1, height: `calc(100% - ${offset})`, width: `calc(100% - ${offset})` }}>
        <ImageWithSkeleton
          src={src}
          alt={alt}
          height="100%"
        />
      </Box>
    </Box>
  );
}
