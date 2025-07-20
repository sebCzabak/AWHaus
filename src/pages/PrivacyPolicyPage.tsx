import { Container, Typography, Box, Paper } from '@mui/material';

export function PrivacyPolicyPage() {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Polityka Prywatności
        </Typography>
        <Typography paragraph sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          Ostatnia aktualizacja: 18 lipca 2025 r.
        </Typography>

        <Box my={3}>
          <Typography variant="h4" gutterBottom>1. Administrator Danych</Typography>
          <Typography paragraph>
            Administratorem Państwa danych osobowych jest [Pełna Nazwa Firmy Deweloperskiej] z siedzibą w [Adres], NIP: [Numer NIP] (dalej jako "Administrator").
          </Typography>
          <Typography paragraph>
            Kontakt z administratorem jest możliwy poprzez e-mail: [Adres e-mail] lub telefonicznie: [Numer telefonu].
          </Typography>
        </Box>

        <Box my={3}>
          <Typography variant="h4" gutterBottom>2. Cele i podstawy przetwarzania danych</Typography>
          <Typography paragraph>
            Państwa dane osobowe, podane w formularzu kontaktowym (imię, adres e-mail), przetwarzane są na podstawie Art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes administratora) w celu udzielenia odpowiedzi na przesłane zapytanie.
          </Typography>
        </Box>

        <Box my={3}>
          <Typography variant="h4" gutterBottom>3. Prawa użytkownika</Typography>
          <Typography paragraph>
            Przysługuje Państwu prawo do dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, a także prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.
          </Typography>
        </Box>

        <Box my={3}>
          <Typography variant="h4" gutterBottom>4. Pliki Cookies</Typography>
          <Typography paragraph>
            Nasza strona internetowa używa plików cookies w celu poprawy jej funkcjonowania oraz w celach analitycznych. Więcej informacji na ten temat znajduje się w naszej polityce cookies, dostępnej na stronie.
          </Typography>
        </Box>

        <Typography variant="body2" color="error" sx={{ mt: 4, fontWeight: 'bold' }}>
          UWAGA: Powyższy tekst jest jedynie wzorem i nie stanowi porady prawnej. Należy go dostosować do faktycznego stanu działalności firmy i skonsultować z radcą prawnym lub specjalistą ds. RODO.
        </Typography>
      </Paper>
    </Container>
  );
}