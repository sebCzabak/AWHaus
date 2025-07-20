import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { sitePlanCoordinates } from '../data/overlayCoordinates';
import sitePlanImage from '../assets/site-plan.png';
import type { Apartment } from '../data/investments'; 

interface Props {
  investmentId: string;
  apartments: Apartment[]; 
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

export function InteractiveMapOverlay({ investmentId, apartments, hoveredId, setHoveredId }: Props) {

  const getHighlightStyle = (apartmentId: string | null) => {
    if (!apartmentId) return {};

    const apartment = apartments.find(apt => apt.id === apartmentId);
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
      
      {sitePlanCoordinates.map((coord) => (
        <RouterLink key={coord.id} to={`/oferta/${investmentId}/${coord.id}`}>
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
              transition: 'background-color 0.2s ease, border 0.2s ease',
              // Dynamiczne style na podstawie najechania i statusu
              ...(hoveredId === coord.id ? getHighlightStyle(coord.id) : { border: '1px dashed rgba(0,0,0,0.2)' }),
            }}
          />
        </RouterLink>
      ))}
    </Box>
  );
}