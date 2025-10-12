import { Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { sitePlanCoordinates } from '../data/overlayCoordinates';
import sitePlanImage from '../assets/site-plan.png';
import type { Apartment } from '../data/investments';
import { strongTextShadow } from '../oldtheme';

interface Props {
  investmentId: string;
  apartments: Apartment[];
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

export function InteractiveMapOverlay({ investmentId, apartments, hoveredId, setHoveredId }: Props) {
  const getHighlightStyle = (apartmentId: string | null) => {
    if (!apartmentId) return {};

    const apartment = apartments.find((apt) => apt.id === apartmentId);
    if (!apartment) return {};

    let highlightColor = 'transparent';
    if (hoveredId === apartmentId) {
      switch (apartment.status) {
        case 'dostępne':
          highlightColor = 'rgba(34, 175, 136, 0.6)'; // Zielony
          break;
        case 'zarezerwowane':
          highlightColor = 'rgba(255, 193, 7, 0.6)'; // Żółty
          break;
        case 'sprzedane':
          highlightColor = 'rgba(211, 47, 47, 0.6)'; // Czerwony
          break;
        default:
          highlightColor = 'transparent';
      }
    }

    return {
      backgroundColor: highlightColor,
      border: `2px solid ${highlightColor}`,
    };
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', userSelect: 'none' }}>
      <Box
        component="img"
        src={sitePlanImage}
        alt="Plan osiedla"
        sx={{ width: '100%', height: 'auto', display: 'block' }}
      />

      {sitePlanCoordinates.map((coord) => {
        // Sprawdzamy, czy dany obszar to prawdziwe mieszkanie, czy placeholder
        const isApartment = apartments.some((apt) => apt.id === coord.id);

        if (isApartment) {
          // Jeśli to mieszkanie, renderujemy klikalny link tak jak wcześniej
          return (
            <RouterLink
              key={coord.id}
              to={`/oferta/${investmentId}/${coord.id}`}
            >
              <Box
                onMouseEnter={() => setHoveredId(coord.id)}
                onMouseLeave={() => setHoveredId(null)}
                sx={{
                  position: 'absolute',
                  top: coord.top,
                  left: coord.left,
                  width: coord.width,
                  height: coord.height,
                  cursor: 'pointer',
                  clipPath: coord.clipPath || 'none',
                  transition: 'background-color 0.2s ease, border 0.2s ease',
                  ...(hoveredId === coord.id ? getHighlightStyle(coord.id) : { border: '1px dashed rgba(0,0,0,0.2)' }),
                }}
              />
            </RouterLink>
          );
        } else {
          // Jeśli to nie jest mieszkanie (czyli nasz 'etap-2'), renderujemy placeholder
          return (
            <Box
              key={coord.id}
              sx={{
                position: 'absolute',
                top: coord.top,
                left: coord.left,
                width: coord.width,
                height: coord.height,
                backgroundColor: 'rgba(177, 159, 135, 0.3)', // Kolor primary z przezroczystością
                border: '2px dashed #b19f87', // Kolor primary
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 2,
                clipPath: 'polygon(100% 3%, 100% 76%, 96% 93%, 4% 100%, 4% 19%)',
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: 'green.main', fontWeight: 'bold', ...strongTextShadow, backgroundColor: '#fff' }}
              >
                {coord.placeholderTitle}
                <Typography
                  component="span"
                  sx={{ display: 'block', fontSize: '0.9rem', fontWeight: 'normal', backgroundColor: '#fff' }}
                >
                  {coord.placeholderSubtitle}
                </Typography>
              </Typography>
            </Box>
          );
        }
      })}
    </Box>
  );
}
