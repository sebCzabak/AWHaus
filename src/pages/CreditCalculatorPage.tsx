import { Container, Typography, Paper } from '@mui/material';

export function CreditCalculatorPage() {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Kalkulator Kredytowy
      </Typography>
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography>
          [Miejsce na osadzony kalkulator kredytowy z zewnętrznej usługi lub prosty formularz do obliczeń]
        </Typography>
      </Paper>
    </Container>
  );
}