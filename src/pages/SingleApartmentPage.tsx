import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Paper, Grid, Button, Divider, Chip, CircularProgress } from '@mui/material';
import { NotFoundPage } from './NotFoundPage';
import { CustomImageCarousel } from '../components/CustomImageCarousel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { db, storage } from '../data/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import type { Investment, Apartment } from '../data/investments';

export function SingleApartmentPage() {
  const { investmentId, apartmentId } = useParams<{ investmentId: string; apartmentId: string }>();
  const navigate = useNavigate();

  const [investment, setInvestment] = useState<Investment | null>(null);
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!investmentId || !apartmentId) {
      setError('Brak ID inwestycji lub mieszkania w adresie URL.');
      setLoading(false);
      return;
    }

    const fetchApartmentData = async () => {
      try {
        setLoading(true);
        const investmentDocRef = doc(db, 'investments', investmentId);
        const investmentDocSnap = await getDoc(investmentDocRef);

        if (investmentDocSnap.exists()) {
          const investmentData = investmentDocSnap.data() as Investment;
          const apartmentData = investmentData.apartments.find((apt) => apt.id === apartmentId);

          if (apartmentData) {
            setInvestment(investmentData);
            setApartment(apartmentData);

            if (apartmentData.galleryImages && apartmentData.galleryImages.length > 0) {
              const urls = await Promise.all(
                apartmentData.galleryImages.map((path) => getDownloadURL(ref(storage, path)))
              );
              setGalleryUrls(urls);
            }
          } else {
            setError('Nie znaleziono takiego mieszkania w tej inwestycji.');
          }
        } else {
          setError('Nie znaleziono takiej inwestycji.');
        }
      } catch (err) {
        setError('Błąd podczas ładowania danych.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApartmentData();
  }, [investmentId, apartmentId]);

  const handleInquiryClick = () => {
    if (!apartment || !investment) return;
    const message = `Dzień dobry, interesuje mnie mieszkanie o numerze ${apartment.id.toUpperCase()} w inwestycji ${
      investment.name
    }. Proszę o kontakt w tej sprawie.`;
    navigate('/kontakt', { state: { prefilledMessage: message } });
  };

  if (loading) {
    return (
      <Container sx={{ py: 5, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !apartment || !investment) {
    return <NotFoundPage />;
  }

  return (
    <>
      <title>{`Mieszkanie ${apartment.id.toUpperCase()} (${apartment.area.toFixed(2)} m²) na Sprzedaż - ${
        investment.name
      } | AWHaus`}</title>
      <meta
        name="description"
        content={`Zobacz szczegóły i rzut mieszkania ${apartment.id.toUpperCase()} w inwestycji ${
          investment.name
        }. Apartament o powierzchni ${apartment.area.toFixed(2)} m² z ${apartment.rooms} pokojami. Zapytaj o ofertę!`}
      />
      <Container
        maxWidth="lg"
        sx={{ py: 5 }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(`/oferta/${investmentId}`)}
        >
          Wróć do planu inwestycji
        </Button>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ mt: 2 }}
        >
          Mieszkanie {apartment.id.toUpperCase()}
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          paragraph
        >
          Nieruchomość w ramach inwestycji: {investment.name}
        </Typography>

        <Paper sx={{ p: { xs: 2, md: 4 }, mt: 4, position: 'relative', overflow: 'hidden' }}>
          {apartment.isPremium && (
            <Box
              sx={{
                position: 'absolute',
                top: '25px',
                right: '-50px',
                width: '200px',
                height: '40px',
                transform: 'rotate(45deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              {/* Cień/Tło wstążki dla efektu głębi */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#8e0000', // Ciemniejsza czerwień dla "zawinięcia"
                  filter: 'blur(1px)',
                }}
              />
              {/* Główny pas wstążki */}
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 'calc(100% - 4px)', // Trochę węższy od tła
                  backgroundColor: '#D32F2F', // Wyraźna czerwień
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                }}
              >
                <Typography
                  sx={{
                    color: 'text.secondary', // Złoty kolor z motywu
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                  }}
                >
                  Premium
                </Typography>
              </Box>
            </Box>
          )}

          <Grid
            container
            spacing={4}
          >
            <Grid
              size={{
                xs: 12,
                md: 7,
              }}
            >
              {galleryUrls.length > 0 ? (
                <CustomImageCarousel images={galleryUrls} />
              ) : (
                <Box
                  sx={{
                    bgcolor: '#f0f0f0',
                    height: 400,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography color="text.secondary">[ Rzut mieszkania ]</Typography>
                </Box>
              )}
            </Grid>
            <Grid
              size={{
                xs: 12,
                md: 5,
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
              >
                Szczegóły lokalu
              </Typography>
              <Box>
                <Typography variant="h6">
                  Cena: <strong>{apartment.price} </strong>
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="h6">
                  Cena za m²: <strong>{apartment.cenam2} zł</strong>
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="h6">
                  Metraż: <strong>{apartment.area.toFixed(2)} m²</strong>
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="h6">
                  Liczba pokoi: <strong>{apartment.rooms}</strong>
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Typography variant="h6">
                  Status:
                  <Chip
                    label={apartment.status}
                    color={
                      apartment.status === 'dostępne'
                        ? 'success'
                        : apartment.status === 'zarezerwowane'
                        ? 'warning'
                        : 'default'
                    }
                  />
                </Typography>

                {apartment.description && (
                  <Typography
                    variant="body1"
                    sx={{ mt: 3, mb: 3 }}
                  >
                    {apartment.description}
                  </Typography>
                )}

                {apartment.status === 'sprzedane' ? (
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ mt: 2 }}
                    disabled
                  >
                    Mieszkanie sprzedane
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ mt: 2 }}
                    color={apartment.status === 'zarezerwowane' ? 'warning' : 'primary'}
                    onClick={handleInquiryClick}
                  >
                    {apartment.status === 'zarezerwowane' ? 'Zapytaj o rezerwację' : 'Zapytaj o to mieszkanie'}
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
