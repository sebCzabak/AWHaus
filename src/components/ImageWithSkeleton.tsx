import { useState, useEffect } from 'react';
import { Skeleton, Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
type ObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

interface Props {
  src: string;
  alt: string;
  height: number | string;
  width?: number | string | object;
  objectFit?: ObjectFit;
  sx?: SxProps<Theme>;
}

export function ImageWithSkeleton({ src, alt, height }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Resetujemy stan przy zmianie obrazka
    setIsLoaded(false);

    // Tworzymy w pamięci nowy obiekt obrazka
    const img = new Image();
    img.src = src;

    // Gdy obrazek się w pełni załaduje, ustawiamy stan na 'true'
    img.onload = () => {
      setIsLoaded(true);
    };
  }, [src]); // Efekt uruchamia się ponownie, gdy zmieni się 'src'

  return (
    <Box sx={{ position: 'relative', height, width: '100%' }}>
      {/* Obrazek - początkowo przezroczysty, pojawia się, gdy jest załadowany */}
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '8px',
          // Płynne przejście
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />

      {/* Skeleton - widoczny tylko wtedy, gdy obrazek NIE jest załadowany */}
      {!isLoaded && (
        <Skeleton
          variant="rectangular"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '8px',
          }}
        />
      )}
    </Box>
  );
}
