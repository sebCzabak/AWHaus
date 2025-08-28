import { Box } from '@mui/material';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface Props {
  imageSrc: string;
  logoSrc: string; // Nadal potrzebne do wyświetlenia samego logo
  alt: string;
  height?: number; // Dodajemy wysokość, aby lepiej kontrolować proporcje
}

export function ImageWithShapedCutout({ imageSrc, logoSrc, alt, height = 350 }: Props) {
  const logoWidth = 115; // Szerokość obszaru na logo
  const logoHeight = 115; // Wysokość obszaru na logo
  const logoPadding = 20; // Odstęp od lewej i górnej krawędzi

  // Definiujemy punkty dla clipPath
  // Pamiętaj, że wartości są procentowe względem szerokości/wysokości całego kontenera
  // Lub absolutne, jeśli chcemy precyzyjnie kontrolować "wcięcie".
  // Użyjemy miksu, aby dopasować do logo
  const logoAreaRightX = logoPadding + logoWidth; // Prawa krawędź obszaru logo
  const logoAreaBottomY = logoPadding + logoHeight; // Dolna krawędź obszaru logo

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: height, // Wykorzystujemy wysokość z propsów
        borderRadius: '12px', // Zachowujemy zaokrąglenia
        boxShadow: 3, // Doda cień, aby kształt był lepiej widoczny
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          // --- KLUCZOWA ZMIANA: clipPath ---
          clipPath: `polygon(
            0% ${logoAreaBottomY}px,        /* Dolna lewa krawędź "wcięcia" */
            ${logoAreaRightX}px ${logoAreaBottomY}px, /* Dolna prawa krawędź "wcięcia" */
            ${logoAreaRightX}px 0%,         /* Górna prawa krawędź "wcięcia" */
            100% 0%,                        /* Górna prawa krawędź obrazka */
            100% 100%,                      /* Dolna prawa krawędź obrazka */
            0% 100%                         /* Dolna lewa krawędź obrazka */
          )`,
          // Aby clipPath dobrze działał na obrazku wewnątrz
          display: 'block',
        }}
      >
        <ImageWithSkeleton
          src={imageSrc}
          alt={alt}
          height="100%"
          width="100%"
          objectFit="cover"
        />
      </Box>

      <Box
        component="img"
        src={logoSrc}
        alt="Logo Inwestycji"
        sx={{
          // --- ZMIANA TUTAJ ---
          position: 'absolute',
          top: -20, // Ujemna wartość "wypycha" w górę
          left: -20, // Ujemna wartość "wypycha" w lewo
          width: 120,
          height: 120,
          objectFit: 'contain',
          zIndex: 3, // Podnosimy z-index na wszelki wypadek
          backgroundColor: 'background.paper',
          borderRadius: '4px',
          boxShadow: 3, // Mocniejszy cień, aby wyglądało jak "na wierzchu"
        }}
      />
    </Box>
  );
}
