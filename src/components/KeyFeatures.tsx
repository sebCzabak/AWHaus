import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import FenceIcon from '@mui/icons-material/Fence';

const features = [
  {
    icon: <LocationOnIcon sx={{ fontSize: 60 }} />,
    title: 'Tylko 5 minut od centrum miasta',
    description: 'Zamieszkaj w sąsiedztwie lasu – w spokojnej, cichej i zielonej okolicy, która jednocześnie znajduje się nieopodal serca Bełchatowa, zapewniając wygodny dostęp do całej infrastruktury tego miasta i okolic.',
  },
  {
    icon: <SquareFootIcon sx={{ fontSize: 60 }} />,
    title: 'Apartament 59 m², 67 m² lub 94 m²',
    description: 'Wybierz jeden z dwóch wariantów funkcjonalnych i nowoczesnych apartamentów – na parterze lub piętrze, z przestronnym układem pomieszczeń oraz wnętrzami pełnymi słońca przez cały dzień.',
  },
  {
    icon: <FenceIcon sx={{ fontSize: 60 }} />,
    title: 'Prywatny ogródek do dyspozycji',
    description: 'Wypoczywaj w indywidualnym ogródku, znajdującym się bezpośrednio przy budynku – apartamenty na parterze mają w nim gotowe tarasy, a lokale na piętrze posiadają dodatkowo duże balkony.',
  },
];

export function KeyFeatures() {
  return (
    <Box  sx={{ 
        // py: 6 - Usuniemy padding na razie, aby lepiej kontrolować pozycję
        position: 'relative',
        marginTop: { xs: 0, md: '-100px' }, 
        // --- POCZĄTEK ZMIANY ---
        // Ustawiamy przezroczyste tło, aby zobaczyć, co jest pod spodem
        backgroundColor: 'transparent',
        // Ustawiamy z-index, aby mieć pewność, że komponent jest na wierzchu
        zIndex: 2, 
        // --- KONIEC ZMIANY ---
      }}
      >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid size={{xs:12,md:4}}key={index} >
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  backgroundColor: 'primary.main', // Kolor tła z Twojego przykładu
                  color: 'background.paper',
                }}
              >
                <Box sx={{ color: 'white', mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1">{feature.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}