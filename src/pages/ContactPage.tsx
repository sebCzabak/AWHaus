import { Container, Typography, Box, Paper, Grid, Stack } from '@mui/material';
import { ContactForm } from '../components/ContactForm';
import { GoogleMap } from '../components/GoogleMap';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';

export function ContactPage() {
  return (
    <>
      <title>Kontakt z Biurem Sprzedaży AWHaus w Opolu | Umów Spotkanie</title>
      <meta
        name="description"
        content="Skontaktuj się z nami! Znajdziesz tu nasz adres, telefon i e-mail. Wypełnij formularz, aby zapytać o dostępne mieszkania lub umówić się na spotkanie w Opolu."
      />

      <Container
        maxWidth="lg"
        sx={{ py: 5 }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
        >
          Kontakt
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          paragraph
        >
          Masz pytania? Jesteśmy do Twojej dyspozycji.
        </Typography>
        <Paper sx={{ p: { xs: 2, md: 4 }, mt: 4 }}>
          <Grid
            container
            spacing={4}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h4"
                gutterBottom
              >
                Napisz do nas
              </Typography>
              <ContactForm />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h4"
                gutterBottom
              >
                Nasze biuro
              </Typography>
              <Stack
                spacing={2}
                sx={{ mt: 2 }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <PlaceIcon color="primary" />
                  <Typography>ul. Przykładowa 1, 64-000 Opole</Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <EmailIcon color="primary" />
                  <Typography>biuro@awhaus.pl</Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <PhoneIcon color="primary" />
                  <Typography>+48 123 456 789</Typography>
                </Stack>
              </Stack>
              <Box sx={{ height: '300px', width: '100%', mt: 4, borderRadius: 2, overflow: 'hidden' }}>
                <GoogleMap />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
