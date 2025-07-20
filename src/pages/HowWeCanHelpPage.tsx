import { Container, Typography } from '@mui/material';

export function HowWeCanHelpPage() {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Jak możemy pomóc?
      </Typography>
      <Typography paragraph sx={{ mt: 4 }}>
        Opis procesu zakupu mieszkania krok po kroku, od pierwszego kontaktu, przez formalności, aż po odbiór kluczy.
      </Typography>
    </Container>
  );
}