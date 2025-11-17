import { Box, Tooltip } from '@mui/material';

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

export function InteractiveLocationMap() {
  return (
    // Główny kontener z position: relative
    <Box sx={{ position: 'relative', width: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e0e0e0' }}>
      {/* Obrazek mapy jako tło */}
      <Box
        component="img"
        src={mapBackground}
        alt="Mapa okolicy inwestycji"
        sx={{ 
          width: '100%', 
          height: 'auto', 
          display: 'block',
        }}
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
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translate(-50%, -50%) scale(1.15)',
                boxShadow: '0 4px 12px rgba(0, 131, 99, 0.3)',
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