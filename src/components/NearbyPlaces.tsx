import { Container, Grid, Typography, Box, Stack } from '@mui/material';
import ParkIcon from '@mui/icons-material/Park';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';

const places = [
  { icon: <NaturePeopleIcon sx={{ fontSize: 48 }} />, name: 'Wyspa bolko, Zoo', time: '– 5 min samochodem' },
  { icon: <ShoppingBagIcon sx={{ fontSize: 48 }} />, name: 'Galeria Karolinka ', time: '– 10 min samochodem' },
  {
    icon: <ApartmentIcon sx={{ fontSize: 48 }} />,
    name: 'Centrum miasta Opole',
    time: '– 10 min samochodem',
  },
  { icon: <ParkIcon sx={{ fontSize: 48 }} />, name: 'Rozległy las ', time: '– na miejscu!' },
  { icon: <LocalConvenienceStoreIcon sx={{ fontSize: 48 }} />, name: 'Sklep i paczkomat ', time: '– 2 min spacerem' },
  {
    icon: <ChildFriendlyIcon sx={{ fontSize: 48 }} />,
    name: 'Publiczne przedszkole i szkoła publiczna',
    time: '– 5 min samochodem',
  },
];

export function NearbyPlaces() {
  return (
    <Box sx={{ py: 8, backgroundColor: '#fff' }}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={6}
          justifyContent="center"
        >
          {places.map((place, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={index}
            >
              <Stack
                spacing={3}
                // Ustawiamy kierunek i wyrównanie warunkowo
                direction={{ xs: 'column', sm: 'row' }}
                alignItems="center"
                sx={{
                  p: 3,
                  backgroundColor: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  transition: 'border-color 0.3s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                  },
                }}
              >
                <Box
                  sx={{ 
                    color: 'primary.main',
                    mb: { xs: 1, sm: 0 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {place.icon}
                </Box>
                {/* Wyrównujemy tekst warunkowo */}
                <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, flex: 1 }}>
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{ fontWeight: 600, mb: 0.5, color: '#212121' }}
                  >
                    {place.name}
                  </Typography>
                  <Typography sx={{ color: '#757575' }}>{place.time}</Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
