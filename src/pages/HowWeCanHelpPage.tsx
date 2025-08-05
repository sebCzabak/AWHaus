import { Container, Typography, Paper, Box, Stack } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import KeyIcon from '@mui/icons-material/Key';

// Dane do kroków
const steps = [
  {
    icon: <PhoneIcon color="primary" sx={{ fontSize: 40 }} />,
    title: '1. Pierwszy kontakt i wybór mieszkania',
    description: 'Wszystko zaczyna się od rozmowy. Skontaktuj się z naszym biurem sprzedaży, a nasi eksperci odpowiedzą na wszystkie Twoje pytania, przedstawią dostępne lokale i pomogą wybrać ten, który idealnie pasuje do Twoich potrzeb.'
  },
  {
    icon: <AssignmentIcon color="primary" sx={{ fontSize: 40 }} />,
    title: '2. Rezerwacja i umowa deweloperska',
    description: 'Gdy już wybierzesz swoje wymarzone mieszkanie, podpisujemy prostą umowę rezerwacyjną. Następnie, w dogodnym dla Ciebie terminie, spotykamy się u notariusza, aby podpisać umowę deweloperską, która w pełni zabezpiecza Twoje interesy.'
  },
  {
    icon: <AccountBalanceIcon color="primary" sx={{ fontSize: 40 }} />,
    title: '3. Wsparcie w finansowaniu',
    description: 'Nie jesteś sam w procesie kredytowym. Współpracujemy z doświadczonymi i niezależnymi doradcami finansowymi, którzy bezpłatnie pomogą Ci porównać oferty banków i wybrać najkorzystniejszy kredyt hipoteczny.'
  },
  {
    icon: <KeyIcon color="primary" sx={{ fontSize: 40 }} />,
    title: '4. Odbiór kluczy',
    description: 'To najprzyjemniejszy moment! Po zakończeniu budowy zaprosimy Cię na odbiór techniczny Twojego nowego mieszkania. Po podpisaniu protokołu otrzymasz klucze i będziesz mógł rozpocząć nowy rozdział w swoim życiu.'
  }
];

export function HowWeCanHelpPage() {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Jak Kupić Mieszkanie?
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Przeprowadzimy Cię przez cały proces zakupu – prosto i bezstresowo.
      </Typography>

      <Stack spacing={4} sx={{ mt: 5 }}>
        {steps.map((step) => (
          <Paper key={step.title} elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Stack direction="row" spacing={3} alignItems="center">
              <Box>{step.icon}</Box>
              <Box>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {step.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {step.description}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}