import { useLocation } from 'react-router-dom';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';

interface ContactFormProps {
  isInDialog?: boolean;
}

export function ContactForm({ isInDialog = false }: ContactFormProps) {
  const location = useLocation();
  const prefilledMessage =location.state?.prefilledMessage || '';
  const formContent = (
    <Box component="form" noValidate autoComplete="off" sx={{ mt: isInDialog ? 2 : 0 }}>
      <Grid container spacing={2}>
        <Grid size={{xs:12,sm:6}}>
          <TextField fullWidth label="Imię" variant="outlined" />
        </Grid>
        <Grid size={{xs:12,sm:6}}>
          <TextField fullWidth label="Email" variant="outlined" />
        </Grid>
          <Grid size={{xs:12,sm:6}}>
          <TextField fullWidth label="Telefon" variant="outlined" />
        </Grid>
        <Grid size={{xs:12}}>
          <TextField
            fullWidth
            label="Wiadomość"
            variant="outlined"
            multiline
            rows={4}
            defaultValue={prefilledMessage}
          />
        </Grid>
        <Grid size={{xs:12}} sx={{ textAlign: 'center' }}>
          <Button variant="contained" color="primary" size="large">
            Wyślij wiadomość
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  // Jeśli komponent nie jest w dialogu, renderujemy go z pełnym tłem i tytułem
  if (!isInDialog) {
    return (
      <Box sx={{ py: 6, backgroundColor: '#ffffff' }}>
        <Container maxWidth="md">
          <Typography variant="h2" align="center" gutterBottom>
            Skontaktuj się z nami
          </Typography>
          {formContent}
        </Container>
      </Box>
    );
  }

  // Jeśli jest w dialogu, zwracamy tylko sam formularz
  return formContent;
}