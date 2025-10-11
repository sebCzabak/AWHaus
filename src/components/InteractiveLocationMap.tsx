import { Box, Tooltip, keyframes } from '@mui/material';

import mapBackground from '../assets/mapa-okolicy.png'; 
import ParkIcon from '@mui/icons-material/Park';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';



const pointsOfInterest = [
  { id: 'las', top: '35%', left: '60%', icon: <ParkIcon />, label: 'Wyspa Bolko oraz Park Zoologiczny' },
  { id: 'galeria', top: '50%', left: '50%', icon: <ShoppingBagIcon />, label: 'Dino' },
  { id: 'przedszkole', top: '75%', left: '48%', icon: <StorefrontIcon />, label: 'Publiczne przedszkole w Górkach i Paczkomat (700 m)' },
  { id: 'szkola', top: '30%', left: '48%', icon: <SchoolIcon />, label: 'Politechnika Opolska, Kryta pływalnia "Wodna Nuta"' },
  {id:'symfonia',top:'82%',left:'45%',icon:<HomeIcon/>,label:'Osiedle Symfonia'}
];

// Definiujemy animację pulsowania
const pulse = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(131, 144, 124, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(131, 144, 124, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(131, 144, 124, 0); }
`;
export function InteractiveLocationMap() {
  return (
    // Główny kontener z position: relative
    <Box sx={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: 5 }}>
      {/* Obrazek mapy jako tło */}
      <Box
        component="img"
        src={mapBackground}
        alt="Mapa okolicy inwestycji"
        sx={{ width: '100%', height: 'auto', display: 'block' }}
      />
      
      {/* Mapujemy po punktach i renderujemy wskaźniki */}
      {pointsOfInterest.map((point) => (
        <Tooltip key={point.id} title={point.label} placement="top" arrow>
          <Box
            sx={{
              position: 'absolute',
              top: point.top,
              left: point.left,
              transform: 'translate(-50%, -50%)',
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              cursor: 'pointer',
              animation: `${pulse} 2s infinite`, // Aplikujemy animację
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translate(-50%, -50%) scale(1.1)',
                animationPlayState: 'paused', // Pauzujemy pulsowanie przy najechaniu
              },
            }}
          >
            {point.icon}
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
}