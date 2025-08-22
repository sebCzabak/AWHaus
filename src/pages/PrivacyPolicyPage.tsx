import { Container, Typography, Box, Paper } from '@mui/material';

export function PrivacyPolicyPage() {
  return (
    <>
      <title>Polityka Prywatności i Przetwarzanie Danych (RODO) | AWHaus</title>
      <meta
        name="description"
        content="Zapoznaj się z polityką prywatności firmy AWHaus. Dowiedz się, jak przetwarzamy Twoje dane osobowe zgodnie z RODO, jakie masz prawa i jak dbamy o Twoje bezpieczeństwo."
      />

      <Container
        maxWidth="md"
        sx={{ py: 5 }}
      >
        <Paper sx={{ p: { xs: 2, md: 4 } }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
          >
            Polityka Prywatności
          </Typography>
          <Typography
            paragraph
            sx={{ fontStyle: 'italic', color: 'text.secondary' }}
          >
            Ostatnia aktualizacja: 22 sierpnia 2025 r.
          </Typography>

          <Box my={3}>
            <Typography
              variant="h4"
              gutterBottom
            >
              §1. Kto jest Administratorem Danych?
            </Typography>
            <Typography paragraph>
              Administratorem Państwa danych osobowych jest **[Pełna nazwa firmy deweloperskiej]** z siedzibą w [Adres
              firmy, np. ul. Przykładowa 1, 00-000 Warszawa], NIP: [Numer NIP], REGON: [Numer REGON] (dalej jako
              "Administrator").
            </Typography>
            <Typography paragraph>
              Kontakt z Administratorem jest możliwy poprzez adres e-mail: **[Adres e-mail firmy]** lub telefonicznie
              pod numerem: **[Numer telefonu firmy]**.
            </Typography>
          </Box>

          <Box my={3}>
            <Typography
              variant="h4"
              gutterBottom
            >
              §2. W jakim celu i na jakiej podstawie przetwarzamy dane?
            </Typography>
            <Typography paragraph>
              Państwa dane osobowe przetwarzane są w następujących celach:
              <ul>
                <li>
                  <strong>Odpowiedź na zapytania z formularza kontaktowego:</strong> Dane takie jak imię, adres e-mail i
                  treść wiadomości przetwarzamy na podstawie Art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes
                  administratora), aby móc odpowiedzieć na Państwa zapytanie.
                </li>
                <li>
                  <strong>Analiza ruchu na stronie (jeśli dotyczy):</strong> Korzystamy z narzędzi analitycznych, takich
                  jak Google Analytics, w celu tworzenia statystyk i poprawy działania naszej strony. Podstawą prawną
                  jest Państwa dobrowolna zgoda (Art. 6 ust. 1 lit. a RODO), wyrażona poprzez baner cookie.
                </li>
              </ul>
            </Typography>
          </Box>

          <Box my={3}>
            <Typography
              variant="h4"
              gutterBottom
            >
              §3. Kto jest odbiorcą danych?
            </Typography>
            <Typography paragraph>
              Odbiorcami Państwa danych mogą być podmioty, z których usług korzystamy w celu prowadzenia naszej
              działalności. Są to m.in.:
              <ul>
                <li>
                  **Google LLC:** W zakresie usług chmurowych Firebase (hosting, baza danych) oraz usług analitycznych
                  (Google Analytics).
                </li>
                <li>
                  **[Nazwa firmy hostingowej, np. Cyber_Folks S.A.]:** W zakresie utrzymania serwera poczty e-mail.
                </li>
              </ul>
              Przekazanie danych odbywa się na podstawie umów powierzenia przetwarzania danych, zapewniających ich
              bezpieczeństwo.
            </Typography>
          </Box>

          <Box my={3}>
            <Typography
              variant="h4"
              gutterBottom
            >
              §4. Państwa prawa
            </Typography>
            <Typography paragraph>
              Zgodnie z RODO, przysługuje Państwu prawo do: dostępu do swoich danych, ich sprostowania, usunięcia,
              ograniczenia przetwarzania, wniesienia sprzeciwu wobec przetwarzania, a także prawo do przenoszenia danych
              i wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (UODO).
            </Typography>
          </Box>

          <Box my={3}>
            <Typography
              variant="h4"
              gutterBottom
            >
              §5. Informacje o plikach Cookies
            </Typography>
            <Typography paragraph>
              Nasza strona korzysta z plików cookies. Są to małe pliki tekstowe wysyłane przez serwer www i
              przechowywane przez oprogramowanie komputera przeglądarki. Używamy cookies funkcjonalnych, niezbędnych do
              zapamiętania Państwa zgody na cookies, oraz opcjonalnie cookies analitycznych, na które mogą Państwo
              wyrazić zgodę.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
