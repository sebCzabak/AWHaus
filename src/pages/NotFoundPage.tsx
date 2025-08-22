import { Box, Typography, Button, Container } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

export function NotFoundPage() {
  return (
    <>
      <title>404 - Strona Nie Znaleziona | AWHaus</title>
      <meta
        name="robots"
        content="noindex"
      />

      <Container>
        <Box
          sx={{
            py: 12,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ReportProblemIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontWeight: 'bold' }}
          >
            404
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            paragraph
          >
            Strona nie została znaleziona
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Niestety, strona, której szukasz, nie istnieje. Być może została usunięta lub wpisałeś zły adres.
          </Typography>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            size="large"
          >
            Wróć na stronę główną
          </Button>
        </Box>
      </Container>
    </>
  );
}
