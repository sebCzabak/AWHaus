import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

// Ikony
import EventIcon from '@mui/icons-material/Event';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import YardIcon from '@mui/icons-material/Yard';

const stats = [
  { icon: <EventIcon sx={{ fontSize: 40 }} />, endValue: 2025, label: 'ROK ODDANIA', prefix: '' },
  { icon: <ApartmentIcon sx={{ fontSize: 40 }} />, endValue: 50, label: 'APARTAMENTÓW', prefix: '' },
  { icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />, endValue: 100, label: 'MIEJSC PARKINGOWYCH', prefix: '' },
  { icon: <YardIcon sx={{ fontSize: 40 }} />, endValue: 208, label: 'METRÓW KWADRATOWYCH OGRODU', prefix: 'do ' },
];

export function AnimatedStats() {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <Box
      sx={{ py: 8, backgroundColor: 'white' }}
      ref={inViewRef}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          alignItems="center"
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: 'relative', pr: { md: 4 } }}>
              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="h3"
                  component="h2"
                  gutterBottom
                >
                  Przyszłość w zgodzie z naturą
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                >
                  Nasza inwestycja znajduje się w spokojnym sąsiedztwie domów jednorodzinnych w otoczeniu zieleni, co
                  tworzy unikalną atmosferę spokoju i bliskości z przyrodą.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Grid
              container
              spacing={{ xs: 3, md: 4 }}
              textAlign="center"
            >
              {stats.map((stat) => (
                <Grid
                  size={{ xs: 12, md: 6 }}
                  key={stat.label}
                >
                  <Paper
                    elevation={4}
                    sx={{ p: 3, borderRadius: '12px', height: '100%' }}
                  >
                    <Box sx={{ color: 'primary.main' }}>{stat.icon}</Box>
                    <Typography
                      variant="h4"
                      component="p"
                      sx={{ fontWeight: 'bold', my: 1 }}
                    >
                      {inView && (
                        <CountUp
                          start={0}
                          end={stat.endValue}
                          duration={2.5}
                          separator=" "
                          prefix={stat.prefix}
                        />
                      )}
                      {!inView && 0}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ minHeight: '3em' }}
                    >
                      {stat.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
