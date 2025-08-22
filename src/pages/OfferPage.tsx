import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Alert, Skeleton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { db, storage } from '../data/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { type Investment } from '../data/investments';
import { ImageWithSkeleton } from '../components/ImageWithSkeleton';

export function OfferPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'investments'));

        const investmentsFromDb = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<Investment, 'id'>),
          id: doc.id,
        }));

        const investmentsWithImages = await Promise.all(
          investmentsFromDb.map(async (inv) => {
            if (inv.mainImage) {
              const imageRef = ref(storage, inv.mainImage);
              const imageUrl = await getDownloadURL(imageRef);
              return { ...inv, mainImage: imageUrl };
            }
            return inv;
          })
        );

        setInvestments(investmentsWithImages);
      } catch (err) {
        console.error('Błąd Firebase:', err);
        setError('Nie udało się załadować inwestycji.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  if (loading) {
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
          {Array.from(new Array(3)).map((_, index) => (
            <Grid
              size={{ xs: 12, md: 4 }}
              key={index}
            >
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Skeleton
                  variant="rectangular"
                  height={200}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1.5rem' }}
                  />
                  <Skeleton
                    variant="text"
                    width="60%"
                  />
                </CardContent>
                <CardActions>
                  <Skeleton
                    variant="rounded"
                    width={120}
                    height={30}
                    sx={{ ml: 1, mb: 1 }}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
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
    <>
      <title>Nowe Mieszkania i Domy na Sprzedaż w Opolu - Oferta AWHaus</title>
      <meta
        name="description"
        content="Zobacz naszą aktualną ofertę nowych mieszkań i domów w Opolu. Sprawdź dostępne metraże, ceny i lokalizacje na Osiedlu Symfonia. Znajdź swoje wymarzone miejsce."
      />
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
              size={{ xs: 12, md: 4 }}
              key={investment.id}
            >
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <ImageWithSkeleton
                  src={investment.mainImage}
                  alt={investment.name}
                  height={200}
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
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
