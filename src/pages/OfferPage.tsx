import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Importy z Firebase
import { db, storage } from '../data/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { type Investment } from '../data/investments';

export function OfferPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'investments'));

        if (querySnapshot.empty) {
        }

        const investmentsFromDb = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<Investment, 'id'>),
          id: doc.id,
        }));

        const investmentsWithImages = await Promise.all(
          investmentsFromDb.map(async (inv) => {
            try {
              if (inv.mainImage && typeof inv.mainImage === 'string' && inv.mainImage.length > 0) {
                const imageRef = ref(storage, inv.mainImage);
                const imageUrl = await getDownloadURL(imageRef);
                return { ...inv, mainImage: imageUrl };
              }
              return { ...inv, mainImage: '' };
            } catch (imageError) {
              console.error(`Nie udało się pobrać zdjęcia dla inwestycji ${inv.id}:`, imageError);
              return { ...inv, mainImage: '' };
            }
          })
        );

        setInvestments(investmentsWithImages);
      } catch (err) {
        console.error('Główny błąd Firebase:', err);
        setError('Nie udało się załadować inwestycji. Sprawdź konsolę, aby zobaczyć szczegóły.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  if (loading) {
    return (
      <Container sx={{ py: 5, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 5 }}
    >
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
      >
        Nasze Inwestycje
      </Typography>
      <Typography
        variant="h5"
        color="text.secondary"
        paragraph
      >
        Zobacz nasze aktualne i planowane inwestycje.
      </Typography>

      <Grid
        container
        spacing={4}
        sx={{ mt: 2 }}
      >
        {investments.map((investment) => (
          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
            key={investment.id}
          >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={investment.mainImage}
                  alt={investment.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {investment.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Lokalizacja: {investment.location}
                    {investment.cenaM2 && ` | Cena: ${investment.cenaM2} zł/m²`}
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
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
