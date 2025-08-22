import { Box, Paper } from '@mui/material';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface Props {
  src: string;
  alt: string;
  height?: number | string;
  offsetDirection?: 'bottom-right' | 'top-left';
}

export function ImageWithOffsetBg({ src, alt, height = 350,offsetDirection = 'bottom-right' }: Props) {
  const offset = '25px'; // Jak bardzo obrazek ma "wystawać"

   // Warunkowo ustawiamy pozycje dla tła (Paper) i obrazka
  const paperStyles = {
    top: offsetDirection === 'bottom-right' ? offset : 0,
    left: offsetDirection === 'bottom-right' ? offset : 0,
    right: offsetDirection === 'top-left' ? offset : 0,
    bottom: offsetDirection === 'top-left' ? offset : 0,
  };

  const imageBoxStyles = {
    top: offsetDirection === 'top-left' ? offset : 0,
    left: offsetDirection === 'top-left' ? offset : 0,
    right: offsetDirection === 'bottom-right' ? offset : 0,
    bottom: offsetDirection === 'bottom-right' ? offset : 0,
  };

  return (
    <Box sx={{ position: 'relative', height, width: '100%' }}>
      <Paper
        elevation={3}
        sx={{
          position: 'absolute',
          backgroundColor: 'white',
          borderRadius: '12px',
          ...paperStyles 
        }}
      />
      <Box sx={{ position: 'absolute', zIndex: 1, ...imageBoxStyles }}>
        <ImageWithSkeleton src={src} alt={alt} height="100%" />
      </Box>
    </Box>
  );
}
