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
            Ostatnia aktualizacja: 11 października 2025 r.
          </Typography>

          <Box my={3}>
            <Typography
              variant="h4"
              gutterBottom
            >
              §1. Kto jest Administratorem Danych?
            </Typography>
            <Typography paragraph>
              Administratorem Państwa danych osobowych jest <strong>AWHaus</strong> z siedzibą w ul. Opolska 18 B Boguszyce, 
            </Typography>
            <Typography paragraph>
              46-061 Prószków Polska,
               NIP: <strong>9910562053</strong>, REGON: <strong>0001184227</strong> (dalej jako
              "Administrator").
            </Typography>
            <Typography paragraph>
              Kontakt z Administratorem jest możliwy poprzez adres e-mail: <strong>biuro@awaus.pl</strong> lub telefonicznie
              pod numerem: <strong>600 099 572</strong>.
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
                {/* <li>
                  <strong>Analiza ruchu na stronie (jeśli dotyczy):</strong> Korzystamy z narzędzi analitycznych, takich
                  jak Google Analytics, w celu tworzenia statystyk i poprawy działania naszej strony. Podstawą prawną
                  jest Państwa dobrowolna zgoda (Art. 6 ust. 1 lit. a RODO), wyrażona poprzez baner cookie.
                </li> */}
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
                  <strong>Google LLC</strong>: W zakresie usług chmurowych Firebase (baza danych)
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
