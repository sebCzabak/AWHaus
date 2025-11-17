import  { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack, Paper } from '@mui/material';
import { keyframes } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import heroImage from '../assets/wizualizacja/14.jpg';
import { strongTextShadow } from '../theme'; 
import { FlippingPriceTag } from './FlippingPriceTag';

// Animacja tła Ken Burns
const kenburns = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
`;

// Animacja dla pojawiającego się tekstu
const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateX(20px); }
  15% { opacity: 1; transform: translateX(0); }
  85% { opacity: 1; transform: translateX(0); }
  100% { opacity: 0; transform: translateX(-20px); }
`;

// Tablica z tekstami do wyświetlenia
const animatedTexts = [
  { id: 1, text: 'Doskonała lokalizacja blisko miasta' },
  { id: 2, text: 'Nowoczesna architektura i design' },
  { id: 3, text: 'Prywatne ogrody i tereny zielone' },
  { id: 4, text: 'Najwyższa jakość materiałów' },
  { id: 5, text: 'Funkcjonalne układy mieszkań' },
  { id: 6, text: 'Bliskość natury i spokój' },
];
const TEXTS_TO_SHOW = 2; // Ile tekstów ma być widocznych naraz

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + TEXTS_TO_SHOW) % animatedTexts.length);
    }, 7000); // Zmiana co 7 sekund
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        color: 'white',
        pt: { xs: '60px', md: '72px' }, // Padding-top aby uwzględnić navbar
        '&::before': {
          content: '""',
          position: 'absolute', 
          top: { xs: '64px', md: '72px' }, // Przesunięcie obrazu pod navbar
          left: 0,
          width: '100%', 
          height: 'calc(100% - 64px)', // Wysokość minus wysokość navbara
          '@media (min-width: 900px)': {
            height: 'calc(100% - 72px)', // Wysokość minus wysokość navbara na desktop
          },
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top', // Przesunięcie pozycji na górę, aby podczas zoom był widoczny w całości
          animation: `${kenburns} 30s ease-in-out infinite alternate`,
          zIndex: -1,
        },
      }}
    >
      {/* Kontener lewej i prawej strony */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        p: { xs: 2, md: 6 },
        mb: { xs: 15, md: 8 }
      }}>
        {/* Lewa strona z tytułem i przyciskami */}
        <Box 
          sx={{ 
            zIndex: 0, // Zmniejszony z-index aby był pod navbar
            maxWidth: '1500px', 
            backgroundColor: 'rgba(0, 0, 0, 0.2)', 
            borderRadius: 2,
            backdropFilter: 'blur(2px)',
            p: { xs: 2, md: 4 },
          }}
        >
          <Typography variant="h2" component="h1" sx={{ color: 'white', ...strongTextShadow, textAlign: 'left', whiteSpace: 'nowrap', fontSize: { xs: '1.8rem', md: '3.75rem' } }}>
            Odkrywaj uroki życia blisko natury – każdego dnia
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
            <FlippingPriceTag /> 
            <Button component={RouterLink} to="/oferta" variant="contained" size="large" endIcon={<ArrowForwardIcon />}>
              Zobacz ofertę
            </Button>
          </Stack>
        </Box>

        {/* Prawa strona z animowanymi tekstami */}
        <Stack
          spacing={2}
          sx={{
            display: { xs: 'none', md: 'flex' }, // Ukryte na mobile
            zIndex: 0, // Zmniejszony z-index aby był pod navbar
            width: { md: '280px' },
          }}
        >
          {Array.from({ length: TEXTS_TO_SHOW }).map((_, i) => {
            const item = animatedTexts[(currentIndex + i) % animatedTexts.length];
            return (
              <Paper
                key={item.id}
                elevation={4}
                sx={{
                  p: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  color: 'text.primary',
                  borderRadius: '8px',
                  animation: `${fadeInOut} 7s ease-in-out forwards`,
                }}
              >
                <Typography variant="body1" component="p" sx={{ fontWeight: '500' }}>
                  {item.text}
                </Typography>
              </Paper>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}