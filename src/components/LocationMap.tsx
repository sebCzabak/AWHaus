import { Container, Grid, Typography, Box, Button } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
//import locationMapImage from '../assets/location-map.jpg';

export function LocationMap() {
  return (
    <Box sx={{ py: 6, backgroundColor: '#f4f6f8' }}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          alignItems="center"
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Naturalnie blisko miasta
            </Typography>
            <Typography paragraph>
              Osiedle Symfonia zlokalizowana jest przy ul. Symfonicznej we wschodniej części miejscowości Górki, tuż
              przy dużym obszarze leśnym, co zapewni Ci ciszę, bliskość natury i zdrowy klimat. To dobrze skomunikowana
              okolica – korzystając z samochodu lub komunikacji miejskiej (w pobliżu przystanki autobusowe) szybko
              dotrzesz do centrum miasta. Dodatkowym atutem jest rozległa sieć tras spacerowych oraz rowerowych, idealna
              dla miłośników wędrówek i jednośladów.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<PlaceIcon />}
              href="https://maps.app.goo.gl/2krxxcHeUrQ1VRjt5"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zobacz w Google Maps
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '450px', // Możesz dostosować wysokość mapy
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 3,
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20249.388387971547!2d17.901204946899455!3d50.62389276090875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spl!2spl!4v1752868044754!5m2!1spl!2spl"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Box>
            {/* --- KONIEC ZMIANY --- */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
