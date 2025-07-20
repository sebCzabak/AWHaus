import { Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { investmentsData } from '../data/investments'; 
export function OfferPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Nasze Inwestycje
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Zobacz nasze aktualne i planowane inwestycje.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {investmentsData.map((investment) => (
          <Grid size={{xs:12,md:4}} key={investment.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={investment.mainImage}
                alt={investment.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {investment.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lokalizacja: {investment.location}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  component={RouterLink} 
                  to={`/oferta/${investment.id}`} 
                  size="small" 
                  color="primary"
                >
                  Zobacz szczegóły
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}