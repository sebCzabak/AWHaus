import { Box, Typography } from '@mui/material';

export function Hero() {
  return (
    <Box
      sx={{
        height: '70vh',
        backgroundImage: 'url(https://source.unsplash.com/random/1600x900?modern-apartment)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        px: 2,
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