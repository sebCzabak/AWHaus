import { useState, useEffect } from 'react';
import { Container, Typography, Stack, CircularProgress, Alert } from '@mui/material';
import { db, storage } from '../data/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { type Investment } from '../data/investments';
import { InvestmentListItem } from '../components/InvestmentListItem';

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
            if (inv.mainImage && typeof inv.mainImage === 'string') {
              try {
                const imageRef = ref(storage, inv.mainImage);
                const imageUrl = await getDownloadURL(imageRef);
                return { ...inv, mainImage: imageUrl };
              } catch (imageError) {
                console.error(`Nie udało się pobrać zdjęcia dla ścieżki: ${inv.mainImage}`, imageError);
                return { ...inv, mainImage: '' };
              }
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

      <Stack
        spacing={4}
        sx={{ mt: 4 }}
      >
        {investments.map((investment) => (
          <InvestmentListItem
            key={investment.id}
            investment={investment}
          />
        ))}
      </Stack>
    </Container>
  );
}
