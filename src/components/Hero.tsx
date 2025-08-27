import { Box, Typography, Button, Stack, Paper } from '@mui/material';
import { keyframes } from '@mui/system';
import { strongTextShadow } from '../oldtheme';
import heroImage from '../assets/wizualizacja/14.jpg';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const kenburns = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1); 
  }
`;

export function Hero() {
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
    </Box>
  );
}
