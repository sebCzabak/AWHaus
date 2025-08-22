import { Paper, Box, Button, Stack } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Link as RouterLink } from 'react-router-dom';

export function MobileStickyActionBar() {
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: { xs: 'block', md: 'none' },
      }}
    >
      <Box sx={{ p: 1.5 }}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<PhoneIcon />}
            href="tel:+48123456789"
            fullWidth
          >
            Zadzwoń
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ApartmentIcon />}
            component={RouterLink}
            to="/oferta"
            fullWidth
          >
            Zobacz Ofertę
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
