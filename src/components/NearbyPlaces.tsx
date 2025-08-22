import { Container, Grid, Typography, Box, Stack } from '@mui/material';
import ParkIcon from '@mui/icons-material/Park';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';

const places = [
  { icon: <ParkIcon sx={{ fontSize: 60 }} />, name: 'Kąpielisko bolko (3,5 km)', time: '– 7 min samochodem' },
  { icon: <ShoppingBagIcon sx={{ fontSize: 60 }} />, name: 'Galeria Karolinka (10 km)', time: '– 15 min samochodem' },
  {
    icon: <ShoppingCartIcon sx={{ fontSize: 60 }} />,
    name: 'Supermarket Aldi w Opolu (6,0 km)',
    time: '– 6 min samochodem',
  },
  { icon: <ParkIcon sx={{ fontSize: 60 }} />, name: 'Rozległy las (0 m)', time: '– na miejscu!' },
  { icon: <StorefrontIcon sx={{ fontSize: 60 }} />, name: 'Dino i paczkomat (450 m)', time: '– 5 min spacerem' },
  {
    icon: <ChildFriendlyIcon sx={{ fontSize: 60 }} />,
    name: 'Publiczne przedszkole i szkoła podstawowa (2,5 km)',
    time: '– 5 min samochodem',
  },
];

export function NearbyPlaces() {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="center"
        >
          {places.map((place, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={index}
            >
              <Stack
                spacing={2}
                // Ustawiamy kierunek i wyrównanie warunkowo
                direction={{ xs: 'column', sm: 'row' }}
                alignItems="center"
              >
                <Box
                  sx={{ p: 2, backgroundColor: 'primary.main', borderRadius: 2, color: 'white', mb: { xs: 1, sm: 0 } }}
                >
                  {place.icon}
                </Box>
                {/* Wyrównujemy tekst warunkowo */}
                <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {place.name}
                  </Typography>
                  <Typography color="text.secondary">{place.time}</Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
