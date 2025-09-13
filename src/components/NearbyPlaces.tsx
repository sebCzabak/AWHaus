import { Container, Grid, Typography, Box, Stack } from '@mui/material';
import ParkIcon from '@mui/icons-material/Park';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';

const places = [
  { icon: <NaturePeopleIcon sx={{ fontSize: 60 }} />, name: 'Wyspa bolko, Zoo', time: '– 5 min samochodem' },
  { icon: <ShoppingBagIcon sx={{ fontSize: 60 }} />, name: 'Galeria Karolinka ', time: '– 10 min samochodem' },
  {
    icon: <ApartmentIcon sx={{ fontSize: 60 }} />,
    name: 'Centrum miasta Opole',
    time: '– 10 min samochodem',
  },
  { icon: <ParkIcon sx={{ fontSize: 60 }} />, name: 'Rozległy las ', time: '– na miejscu!' },
  { icon: <LocalConvenienceStoreIcon sx={{ fontSize: 60 }} />, name: 'Sklep i paczkomat ', time: '– 2 min spacerem' },
  {
    icon: <ChildFriendlyIcon sx={{ fontSize: 60 }} />,
    name: 'Publiczne przedszkole i szkoła publiczna',
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
