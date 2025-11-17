import { Container, Grid, Paper, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import FenceIcon from '@mui/icons-material/FenceSharp';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const features = [
  {
    icon: <LocationOnIcon />,
    title: 'Tylko 10 minut od centrum miasta',
    description:
      'Zamieszkaj w sąsiedztwie lasu – w spokojnej, cichej i zielonej okolicy, która jednocześnie znajduje się nieopodal serca Opola zapewniając wygodny dostęp do całej infrastruktury tego miasta i okolic.',
  },
  {
    icon: <SquareFootIcon />,
    title: 'Apartament od 57 m² do 92 m²',
    description:
      'Wybierz jeden z trzech wariantów funkcjonalnych i nowoczesnych mieszkań - z przestronnym dwu poziomowym układem pomieszczeń oraz wnętrzami pełnymi słońca przez cały dzień ',
  },
  {
    icon: <FenceIcon />,
    title: 'Prywatny ogródek do dyspozycji',
    description:
      'Poczuj pełnię swobody i prywatności we własnym ogródku, bez sąsiadów nad głową i z kojącym widokiem na zieleń. Każdy z naszych mieszkań posiada prywatny ogródek z przestronnym tarasem, na który wyjdziesz bezpośrednio ze swojego salonu.',
  },
];

const FeatureCard = ({ feature }: { feature: (typeof features)[0] }) => (
  <Paper
    elevation={0}
    sx={{
      p: 5,
      textAlign: 'center',
      height: '100%',
      backgroundColor: '#fff',
      color: '#424242',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      transition: 'border-color 0.3s ease',
      '&:hover': {
        borderColor: 'primary.main',
      },
    }}
  >
    <Box sx={{ color: 'primary.main', mb: 3, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ fontSize: 48 }}>{feature.icon}</Box>
    </Box>
    <Typography
      variant="h5"
      component="h3"
      gutterBottom
      sx={{ fontWeight: 600, mb: 2, color: '#212121' }}
    >
      {feature.title}
    </Typography>
    <Typography
      variant="body1"
      sx={{ flexGrow: 1, color: '#757575', lineHeight: 1.7 }}
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
            spaceBetween={40}
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
            spacing={6}
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
