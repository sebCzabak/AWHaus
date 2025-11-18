import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Divider,
  Chip,
  CircularProgress,

} from '@mui/material';
import { NotFoundPage } from './NotFoundPage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Importy Firebase
import { db, storage } from '../data/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import type { Investment, Apartment } from '../data/investments';

// Helper function to format price with dots as thousands separators, comma for decimals, and add "zł"
const formatPrice = (price: number | string | undefined | null): string => {
  if (!price) return '-';
  
  let priceNum: number;
  
  if (typeof price === 'number') {
    priceNum = price;
  } else {
    // Handle string formats like "639.220,80" or "639220.80" or "639220,80"
    const priceStr = String(price);
    
    // Check if it has Polish format (dot for thousands, comma for decimal)
    if (priceStr.includes(',') && priceStr.includes('.')) {
      // Format: "639.220,80" - replace dot with nothing, comma with dot for parsing
      const normalized = priceStr.replace(/\./g, '').replace(',', '.');
      priceNum = parseFloat(normalized);
    } else if (priceStr.includes(',')) {
      // Format: "639220,80" - replace comma with dot
      priceNum = parseFloat(priceStr.replace(',', '.'));
    } else if (priceStr.includes('.')) {
      // Format: "639220.80" or "639.220"
      // Check if dot is decimal separator (only one dot, and it's followed by 1-2 digits at the end)
      const dotIndex = priceStr.lastIndexOf('.');
      const afterDot = priceStr.substring(dotIndex + 1);
      // If after the last dot there are 1-2 digits and it's at the end, it's likely a decimal separator
      if (afterDot.length <= 2 && /^\d+$/.test(afterDot) && dotIndex > 0) {
        // It's a decimal separator (e.g., "639220.80")
        priceNum = parseFloat(priceStr);
      } else {
        // It's thousands separators (e.g., "639.220")
        const cleaned = priceStr.replace(/\./g, '');
        priceNum = parseFloat(cleaned);
      }
    } else {
      // No separators, just digits
      priceNum = parseFloat(priceStr);
    }
  }
  
  if (isNaN(priceNum) || !isFinite(priceNum)) return '-';
  
  // Check if the number has decimal places
  const hasDecimals = priceNum % 1 !== 0;
  
  if (hasDecimals) {
    // Format with 2 decimal places: dot for thousands, comma for decimal (Polish format: 639.220,80)
    const parts = priceNum.toFixed(2).split('.');
    const integerPart = parseInt(parts[0], 10);
    const decimalPart = parts[1];
    
    // Format integer part with dots as thousands separators
    const formattedInteger = integerPart.toLocaleString('pl-PL', { useGrouping: true }).replace(/\s/g, '.');
    
    return `${formattedInteger},${decimalPart} zł`;
  } else {
    // No decimals: format with dots as thousands separators (Polish format: 499.000)
    const formatted = Math.round(priceNum).toLocaleString('pl-PL', { useGrouping: true });
    return `${formatted.replace(/\s/g, '.')} zł`;
  }
};

// Importy i konfiguracja dla react-pdf
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Konfiguracja "workera" dla biblioteki react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export function SingleApartmentPage() {
  const { investmentId, apartmentId } = useParams<{
    investmentId: string;
    apartmentId: string;
  }>();
  const navigate = useNavigate();

  // Stany dla danych
  const [investment, setInvestment] = useState<Investment | null>(null);
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [planUrl, setPlanUrl] = useState<string | null>(null);
  const [_galleryUrls, setGalleryUrls] = useState<string[]>([]);

  // Stany dla interfejsu
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Kompletny useEffect z funkcją fetchApartmentData ---
  useEffect(() => {
    const fetchApartmentData = async () => {
      // Sprawdzamy, czy mamy potrzebne ID z adresu URL
      if (!investmentId || !apartmentId) {
        setError('Brak ID inwestycji lub mieszkania w adresie URL.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Tworzymy referencję do konkretnego dokumentu inwestycji
        const investmentDocRef = doc(db, 'investments', investmentId);
        // Pobieramy dokument
        const investmentDocSnap = await getDoc(investmentDocRef);

        // Sprawdzamy, czy dokument istnieje w bazie
        if (investmentDocSnap.exists()) {
          // Łączymy dane z dokumentu (data()) z jego ID (id), aby mieć kompletny obiekt
          const investmentData = {
            ...(investmentDocSnap.data() as Omit<Investment, 'id'>),
            id: investmentDocSnap.id,
          };

          // Znajdujemy konkretne mieszkanie w tablicy mieszkań tej inwestycji
          const apartmentData = investmentData.apartments.find(
            (apt) => apt.id === apartmentId
          );

          if (apartmentData) {
            // Zapisujemy znalezione dane w stanie komponentu
            setInvestment(investmentData);
            setApartment(apartmentData);

            // Jeśli mieszkanie ma zdefiniowaną ścieżkę do rzutu PDF, pobieramy jego publiczny URL
            if (apartmentData.planUrl) {
              const planRef = ref(storage, apartmentData.planUrl);
              getDownloadURL(planRef).then(setPlanUrl);
            }

            // Jeśli mieszkanie ma galerię zdjęć, pobieramy publiczne URL-e dla każdego z nich
            if (
              apartmentData.galleryImages &&
              apartmentData.galleryImages.length > 0
            ) {
              const urls = await Promise.all(
                apartmentData.galleryImages.map((path) =>
                  getDownloadURL(ref(storage, path))
                )
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
  }, [investmentId, apartmentId]); // Hook uruchamia się ponownie, gdy zmienią się ID w URL

  const handleInquiryClick = () => {
    if (!apartment || !investment) return;
    const message = `Dzień dobry, interesuje mnie mieszkanie o numerze ${apartment.id.toUpperCase()} w inwestycji ${
      investment.name
    }. Proszę o kontakt w tej sprawie.`;
    navigate('/kontakt', {
      state: {
        prefilledMessage: message,
        investmentId: investment.id,
        apartmentId: apartment.id,
      },
    });
  };

  // --- Renderowanie warunkowe ---

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

  // --- Główna zwrotka JSX (gdy dane są załadowane) ---

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/oferta/${investmentId}`)}
      >
        Wróć do planu inwestycji
      </Button>
      <Typography variant="h2" component="h1" gutterBottom sx={{ mt: 2 }}>
        Mieszkanie {apartment.id.toUpperCase()}
        {apartment.isPremium && (
          <Chip
            label="Premium"
            color="primary"
            variant="outlined"
            sx={{ ml: 2, fontSize: '1rem', fontWeight: 'bold' }}
          />
        )}
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Nieruchomość w ramach inwestycji: {investment.name}
      </Typography>

      <Paper sx={{ p: { xs: 2, md: 4 }, mt: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{xs:12,md:7}}>
            <Typography variant="h4" gutterBottom>
              Rzut Architektoniczny
            </Typography>
            {planUrl ? (
              <Box
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Document file={planUrl} loading={<CircularProgress />}>
                  <Page pageNumber={1} />
                </Document>
              </Box>
            ) : (
              <Box
                sx={{
                  height: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'grey.100',
                  borderRadius: 2,
                }}
              >
                <Typography>Brak rzutu dla tego mieszkania.</Typography>
              </Box>
            )}
          </Grid>
          <Grid size={{xs:12,md:5}}>
            <Typography variant="h4" gutterBottom>
              Szczegóły lokalu
            </Typography>
            <Box>
              <Typography variant="h6">
                Metraż: <strong>{apartment.area.toFixed(2)} m²</strong>
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="h6">
                Liczba pokoi: <strong>{apartment.rooms}</strong>
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="h6">
                Cena: <strong style={{ color: '#22af88' }}>{formatPrice(apartment.price)}</strong>
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="h6">
                Cena za m²: <strong style={{ color: '#22af88' }}>
                  {(() => {
                    // Use cenaM2 if available, otherwise calculate from price and area
                    if (apartment.cenaM2) {
                      return formatPrice(apartment.cenaM2);
                    }
                    if (apartment.price && apartment.area) {
                      const priceNum = typeof apartment.price === 'number' 
                        ? apartment.price 
                        : parseFloat(String(apartment.price).replace(/[^\d.-]/g, ''));
                      if (!isNaN(priceNum) && isFinite(priceNum) && priceNum > 0) {
                        return formatPrice(priceNum / apartment.area);
                      }
                    }
                    return '-';
                  })()}
                </strong>
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="h6">
                Status:{' '}
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
                <Typography variant="body1" sx={{ mt: 3, mb: 3 }}>
                  {apartment.description}
                </Typography>
              )}

              {apartment.status === 'sprzedane' ? (
                <Button variant="contained" size="large" sx={{ mt: 2 }} disabled>
                  Mieszkanie sprzedane
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  sx={{ mt: 2 }}
                  color={
                    apartment.status === 'zarezerwowane' ? 'warning' : 'primary'
                  }
                  onClick={handleInquiryClick}
                >
                  {apartment.status === 'zarezerwowane'
                    ? 'Zapytaj o rezerwację'
                    : 'Zapytaj o to mieszkanie'}
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}