import { useState, useMemo } from 'react';
import { Container, Typography, Paper, Box, Grid, TextField, Slider, InputAdornment } from '@mui/material';

// Funkcja do formatowania waluty
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(value);
};

export function CreditCalculator() {
  // Stany dla wartości wejściowych
  const [propertyPrice, setPropertyPrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(20);
  const [loanTerm, setLoanTerm] = useState(25);
  const [interestRate, setInterestRate] = useState(7.0);

  // Obliczenia wykonywane, gdy zmieni się któraś z wartości
  const calculationResults = useMemo(() => {
    const downPaymentAmount = propertyPrice * (downPayment / 100);
    const loanAmount = propertyPrice - downPaymentAmount;

    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (loanAmount <= 0 || monthlyInterestRate <= 0 || numberOfPayments <= 0) {
      return { downPaymentAmount, loanAmount, monthlyInstallment: 0 };
    }

    const monthlyInstallment =
      (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    return { downPaymentAmount, loanAmount, monthlyInstallment };
  }, [propertyPrice, downPayment, loanTerm, interestRate]);

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 5 }}
    >
      <Typography
        variant="h2"
        component="h2"
        gutterBottom
        textAlign="center"
        sx={{ mb: 2, color: '#212121' }}
      >
        Kalkulator Kredytowy
      </Typography>
      <Typography
        variant="h5"
        color="text.secondary"
        paragraph
        textAlign="center"
        sx={{ mb: 4 }}
      >
        Oblicz szacunkową ratę kredytu hipotecznego.
      </Typography>

      <Paper sx={{ p: { xs: 2, md: 4 }, mt: 4 }}>
        <Grid
          container
          spacing={4}
        >
          {/* Sekcja z suwakami i polami do wpisywania */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box mb={4}>
              <Typography gutterBottom>Cena nieruchomości (PLN)</Typography>
              <TextField
                fullWidth
                type="number"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                InputProps={{ endAdornment: <InputAdornment position="end">PLN</InputAdornment> }}
              />
            </Box>
            <Box mb={4}>
              <Typography gutterBottom>Wkład własny ({downPayment}%)</Typography>
              <Slider
                value={downPayment}
                onChange={(_, newValue) => setDownPayment(newValue as number)}
                aria-labelledby="input-slider"
                min={20} // Minimalny wkład własny
                max={100}
                valueLabelDisplay="auto"
              />
            </Box>
            <Box mb={4}>
              <Typography gutterBottom>Okres kredytowania ({loanTerm} lat)</Typography>
              <Slider
                value={loanTerm}
                onChange={(_, newValue) => setLoanTerm(newValue as number)}
                aria-labelledby="input-slider"
                min={5}
                max={35}
                valueLabelDisplay="auto"
              />
            </Box>
            <Box>
              <Typography gutterBottom>Oprocentowanie (%)</Typography>
              <TextField
                fullWidth
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
              />
            </Box>
          </Grid>

          {/* Sekcja z wynikami */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ p: 3, backgroundColor: 'background.default', borderRadius: 2, height: '100%' }}>
              <Typography
                variant="h5"
                gutterBottom
              >
                Podsumowanie:
              </Typography>
              <Box my={2}>
                <Typography variant="body1">Wymagany wkład własny:</Typography>
                <Typography
                  variant="h4"
                  color="primary"
                >
                  {formatCurrency(calculationResults.downPaymentAmount)}
                </Typography>
              </Box>
              <Box my={2}>
                <Typography variant="body1">Kwota kredytu:</Typography>
                <Typography
                  variant="h4"
                  color="primary"
                >
                  {formatCurrency(calculationResults.loanAmount)}
                </Typography>
              </Box>
              <Box
                mt={3}
                p={2}
                bgcolor="primary.main"
                color="primary.contrastText"
                borderRadius={1}
              >
                <Typography variant="body1">Szacunkowa miesięczna rata:</Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 'bold' }}
                >
                  {formatCurrency(calculationResults.monthlyInstallment)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Paper
          elevation={0}
          sx={{ p: 2, mt: 4, backgroundColor: '#fffbe6' }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
          >
            <strong>Zastrzeżenie:</strong> Powyższe obliczenia są symulacją i mają charakter wyłącznie poglądowy. Nie
            stanowią one oferty handlowej w rozumieniu prawa i nie powinny być podstawą do podejmowania decyzji
            finansowych. W celu uzyskania wiążącej oferty prosimy o kontakt z doradcą kredytowym.
          </Typography>
        </Paper>
      </Paper>
    </Container>
  );
}

