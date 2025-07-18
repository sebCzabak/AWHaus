import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';

export function ContactForm() {
  return (
    <Box sx={{ py: 6, backgroundColor: '#ffffff' }}>
      <Container maxWidth="md">
        <Typography variant="h2" align="center" gutterBottom>
          Skontaktuj się z nami
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid size={{xs:12, sm:6}}>
              <TextField fullWidth label="Imię" variant="outlined" />
            </Grid>
            <Grid size={{xs:12, sm:6}}>
              <TextField fullWidth label="Email" variant="outlined" />
            </Grid>
            <Grid size={{xs:12}}>
              <TextField fullWidth label="Wiadomość" variant="outlined" multiline rows={4} />
            </Grid>
            <Grid size={{xs:12}} sx={{ textAlign: 'center' }}>
              <Button variant="contained" color="primary" size="large">
                Wyślij wiadomość
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}