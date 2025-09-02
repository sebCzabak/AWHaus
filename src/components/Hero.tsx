import { Box, Typography, Button, Stack, Paper } from '@mui/material';
import { keyframes } from '@mui/system';
import heroImage from '../assets/wizualizacja/14.jpg';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// Załóżmy, że ten import działa poprawnie w Twoim projekcie
import { strongTextShadow } from '../oldtheme';
// ✅ NOWE IMPORTY Z REACTA
import { useState, useEffect } from 'react';

// Istniejąca animacja Ken Burns
const kenburns = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
`;

// ✅ NOWA ANIMACJA DLA POJAWIAJĄCEGO SIĘ TEKSTU
const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateX(20px); }
  15% { opacity: 1; transform: translateX(0); }
  85% { opacity: 1; transform: translateX(0); }
  100% { opacity: 0; transform: translateX(-20px); }
`;

// ✅ TABLICA Z TEKSTAMI DO WYŚWIETLENIA
const animatedTexts = [
  { id: 1, text: 'Doskonała lokalizacja blisko miasta' },
  { id: 2, text: 'Nowoczesna architektura i design' },
  { id: 3, text: 'Prywatne ogrody i tereny zielone' },
  { id: 4, text: 'Najwyższa jakość materiałów' },
  { id: 5, text: 'Funkcjonalne układy mieszkań' },
  { id: 6, text: 'Bliskość natury i spokój' },
];

// ✅ LICZBA TEKSTÓW WYŚWIETLANYCH JEDNOCZEŚNIE
const TEXTS_TO_SHOW = 2;

export function Hero() {
  // ✅ STAN DO PRZECHOWYWANIA AKTUALNEGO INDEKSU TEKSTU
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ EFEKT DO USTAWIANIA INTERWAŁU, KTÓRY ZMIENIA TEKST
  useEffect(() => {
    const interval = setInterval(() => {
      // Przesuwamy indeks o liczbę wyświetlanych tekstów, aby wymienić całą grupę
      setCurrentIndex((prevIndex) => (prevIndex + TEXTS_TO_SHOW) % animatedTexts.length);
    }, 6000); // Zmiana co 6 sekund (6000ms)

    // Funkcja czyszcząca, która zatrzymuje interwał, gdy komponent zniknie
    return () => clearInterval(interval);
  }, []); // Pusta tablica [] sprawia, że efekt uruchomi się tylko raz

  return (
    <Box
      sx={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        color: '#f4f6f8',
        textAlign: 'center',
        px: 2,

        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: `${kenburns} 30s ease-in-out infinite alternate`,
          zIndex: -1,
        },
      }}
    >
      {/* Istniejąca treść po lewej stronie */}
      <Box sx={{ p: { xs: 2, md: 6 }, zIndex: 1, maxWidth: '600px' }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{ color: 'primary.main', ...strongTextShadow, textAlign: 'left' }}
        >
          Odkrywaj uroki życia blisko natury – każdego dnia
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 3, alignItems: 'center' }}
        >
          <Paper sx={{ p: '12px 16px', backgroundColor: 'rgba(255,255,255,0.9)', color: 'black' }}>
            <Typography sx={{ fontWeight: 'bold' }}>
              Cena za m² już od <span style={{ color: '#73bb4dff'}}>8500 zł</span>
            </Typography>
          </Paper>
          <Button
            component={RouterLink}
            to="/oferta"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
          >
            Zobacz ofertę
          </Button>
        </Stack>
      </Box>

      {/* ✅ NOWY KONTENER NA ANIMOWANE TEKSTY PO PRAWEJ STRONIE */}
      <Stack
        spacing={2}
        sx={{
          position: 'absolute',
          top: '50%',
          right: { xs: '10px', md: '40px' },
          transform: 'translateY(-50%)',
          zIndex: 2,
          width: { xs: '180px', md: '280px' },
        }}
      >
        {/* Generujemy fragment tablicy i mapujemy go do komponentów Paper */}
        {Array.from({ length: TEXTS_TO_SHOW }).map((_, i) => {
          const item = animatedTexts[(currentIndex + i) % animatedTexts.length];
          return (
            <Paper
              key={item.id} // Używamy unikalnego ID z obiektu jako klucza
              elevation={4}
              sx={{
                p: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                color: 'text.primary',
                borderRadius: '8px',
                // Użycie `key` restartuje komponent i animację przy każdej zmianie
                animation: `${fadeInOut} 6s ease-in-out forwards`,
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
  );
}