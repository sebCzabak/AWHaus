import { Container, Grid, Paper, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import FenceIcon from '@mui/icons-material/Fence';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const features = [
  {
    icon: <LocationOnIcon sx={{ fontSize: 60 }} />,
    title: 'Tylko 5 minut od centrum miasta',
    description:
      'Zamieszkaj w sąsiedztwie lasu – w spokojnej, cichej i zielonej okolicy, która jednocześnie znajduje się nieopodal serca Opola zapewniając wygodny dostęp do całej infrastruktury tego miasta i okolic.',
  },
  {
    icon: <SquareFootIcon sx={{ fontSize: 60 }} />,
    title: 'Apartament 59 m², 67 m² lub 94 m²',
    description:
      'Wybierz jeden z dwóch wariantów funkcjonalnych i nowoczesnych apartamentów – na parterze lub piętrze, z przestronnym układem pomieszczeń oraz wnętrzami pełnymi słońca przez cały dzień.',
  },
  {
    icon: <FenceIcon sx={{ fontSize: 60 }} />,
    title: 'Prywatny ogródek do dyspozycji',
    description:
      'Wypoczywaj w indywidualnym ogródku, znajdującym się bezpośrednio przy budynku – apartamenty na parterze mają w nim gotowe tarasy, a lokale na piętrze posiadają dodatkowo duże balkony.',
  },
];

const FeatureCard = ({ feature }: { feature: (typeof features)[0] }) => (
  <Paper
    elevation={3}
    sx={{
      p: 4,
      textAlign: 'center',
      height: '100%',
      backgroundColor: 'primary.main',
      color: '#424242',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Box sx={{ color: 'white', mb: 2 }}>{feature.icon}</Box>
    <Typography
      variant="h5"
      component="h3"
      gutterBottom
      sx={{ fontWeight: 'bold' }}
    >
      {feature.title}
    </Typography>
    <Typography
      variant="body1"
      sx={{ flexGrow: 1 }}
    >
      {feature.description}
    </Typography>
  </Paper>
);

export function KeyFeatures() {
  // 2. Używamy hooków MUI, aby sprawdzić, czy ekran jest "mobilny"
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        position: 'relative',
        marginTop: { xs: 0, md: '-100px' },
        backgroundColor: { xs: '#f4f6f8', md: 'transparent' }, // Tło tylko na mobile
        py: 6,
        zIndex: 2,
      }}
    >
      <Container maxWidth="lg">
        {isMobile ? (
          // 3. Jeśli to mobile, renderujemy SWIPER
          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            style={{ paddingBottom: '40px' }} // Dodatkowe miejsce na kropki paginacji
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <FeatureCard feature={feature} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // 4. Jeśli to desktop, renderujemy GRID (tak jak wcześniej)
          <Grid
            container
            spacing={4}
            justifyContent="center"
          >
            {features.map((feature, index) => (
              <Grid
                size={{ xs: 12, md: 4 }}
                key={index}
              >
                <FeatureCard feature={feature} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
