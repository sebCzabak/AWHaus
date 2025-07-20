import { Container, Typography, Box, Paper, Grid, Avatar } from '@mui/material';

export function AboutUsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Paper sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h2" component="h1" gutterBottom>
          O Nas
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Budujemy przyszłość, mieszkanie po mieszkaniu.
        </Typography>

        <Box my={4}>
          <img
            src="https://source.unsplash.com/random/1200x400?office-building"
            alt="Nasze biuro"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Box>

        <Typography variant="h4" gutterBottom>Nasza misja</Typography>
        <Typography paragraph>
          Od [rok założenia] roku z pasją tworzymy przestrzenie, które nasi klienci z dumą nazywają domem. Wierzymy, że kluczem do sukcesu jest połączenie nowoczesnej architektury, najwyższej jakości materiałów i transparentnej współpracy. Każdy projekt traktujemy indywidualnie, dbając o każdy, nawet najmniejszy detal.
        </Typography>

        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>Nasz Zespół</Typography>
        <Grid container spacing={4}>
          <Grid size={{xs:12, sm:4}} sx={{ textAlign: 'center' }}>
            <Avatar sx={{ width: 100, height: 100, margin: '0 auto 16px' }} />
            <Typography variant="h6">Jan Kowalski</Typography>
            <Typography color="text.secondary">Prezes Zarządu</Typography>
          </Grid>
          <Grid size={{xs:12, sm:4}} sx={{ textAlign: 'center' }}>
            <Avatar sx={{ width: 100, height: 100, margin: '0 auto 16px' }} />
            <Typography variant="h6">Anna Nowak</Typography>
            <Typography color="text.secondary">Dyrektor Sprzedaży</Typography>
          </Grid>
          <Grid size={{xs:12, sm:4}} sx={{ textAlign: 'center' }}>
            <Avatar sx={{ width: 100, height: 100, margin: '0 auto 16px' }} />
            <Typography variant="h6">Piotr Wiśniewski</Typography>
            <Typography color="text.secondary">Główny Architekt</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}