import { Box, keyframes, Typography } from '@mui/material';

import heroImage from '../assets/wizualizacja/15.png'

const kenburns = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1); // Możesz dostosować siłę przybliżenia
  }
`;

export function Hero() {
  return (
    <Box
      sx={{
        height: '70vh',
        position: 'relative', 
        overflow: 'hidden',   
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
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
      <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', p: 4, borderRadius: 2 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          Znajdź swoje wymarzone mieszkanie
        </Typography>
        <Typography variant="h5">
          Nowoczesne osiedla w najlepszych lokalizacjach.
        </Typography>
      </Box>
    </Box>
  );
}