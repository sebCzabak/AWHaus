import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
  Tabs,
  Tab,
  ImageList,
  ImageListItem,
  Skeleton,
} from '@mui/material';
import { NotFoundPage } from './NotFoundPage';
import { InteractiveMapOverlay } from '../components/InteractiveMapOverlay';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { ImageWithSkeleton } from '../components/ImageWithSkeleton';
// Importy z Firebase
import { db, storage } from '../data/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { type Investment } from '../data/investments';

function TabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
export function SingleInvestmentPage() {
  const { investmentId } = useParams<{ investmentId: string }>();

  const [investment, setInvestment] = useState<Investment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!investmentId) return;

    const fetchInvestmentData = async () => {
      try {
        setLoading(true);
        // Krok 1: Pobierz dane inwestycji z Firestore (bez zmian)
        const docRef = doc(db, 'investments', investmentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const investmentData = {
            ...(docSnap.data() as Omit<Investment, 'id'>),
            id: docSnap.id,
          };
          setInvestment(investmentData);

          // --- POCZĄTEK POPRAWKI ---
          // Krok 2: Pobierz wszystkie zdjęcia ze STAŁEGO folderu 'investments/osiedle'
          const galleryFolderRef = ref(storage, 'investments/osiedle');
          // --- KONIEC POPRAWKI ---

          const response = await listAll(galleryFolderRef);

          const urls = await Promise.all(response.items.map((itemRef) => getDownloadURL(itemRef)));
          setGalleryUrls(urls);
        } else {
          setError('Nie znaleziono takiej inwestycji.');
        }
      } catch (err) {
        setError('Błąd podczas ładowania danych.');
        console.error('Błąd Firebase:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestmentData();
  }, [investmentId]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{ py: 5 }}
      >
        {/* Szkielet dla tytułów */}
        <Skeleton
          variant="text"
          width="60%"
          sx={{ fontSize: '3rem' }}
        />
        <Skeleton
          variant="text"
          width="80%"
          sx={{ fontSize: '1.5rem' }}
        />

        <Paper sx={{ mt: 4 }}>
          {/* Szkielet dla zakładek */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={0}>
              <Tab label={<Skeleton width={150} />} />
              <Tab label={<Skeleton width={150} />} />
            </Tabs>
          </Box>

          {/* Szkielet dla panelu z galerią */}
          <Box sx={{ p: 3 }}>
            <ImageList
              variant="masonry"
              cols={3}
              gap={8}
            >
              {/* Renderujemy 6 szkieletów w miejscu zdjęć */}
              {Array.from(new Array(6)).map((_, index) => (
                <ImageListItem key={index}>
                  <Skeleton
                    variant="rectangular"
                    sx={{ borderRadius: '8px' }}
                    height={index % 2 === 0 ? 250 : 180}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Paper>
      </Container>
    );
  }
  if (error || !investment) {
    // Jeśli jest błąd lub nie znaleziono inwestycji, wyświetlamy stronę 404
    return <NotFoundPage />;
  }

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ py: 5 }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
        >
          {investment.name}
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          paragraph
        >
          {investment.description}
        </Typography>

        <Paper sx={{ mt: 4 }}>
          {/* Nawigacja w zakładkach */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              centered
            >
              <Tab label="Interaktywny Plan" />
              <Tab label="Galeria Inwestycji" />
            </Tabs>
          </Box>

          {/* Panel dla pierwszej zakładki - Interaktywny Plan */}
          <TabPanel
            value={activeTab}
            index={0}
          >
            <Grid
              container
              spacing={4}
            >
              <Grid size={{ xs: 12, md: 7 }}>
                <Typography
                  variant="h4"
                  gutterBottom
                >
                  Plan osiedla
                </Typography>
                <InteractiveMapOverlay
                  investmentId={investment.id}
                  apartments={investment.apartments}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Typography
                  variant="h4"
                  gutterBottom
                >
                  Dostępne lokale
                </Typography>
                <List sx={{ border: '1px solid #ddd', borderRadius: 2, overflow: 'hidden' }}>
                  {investment.apartments.map((apt, index) => (
                    <ListItem
                      key={apt.id}
                      component={RouterLink}
                      to={`/oferta/${investment.id}/${apt.id}`}
                      divider={index < investment.apartments.length - 1}
                      onMouseEnter={() => setHoveredId(apt.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      sx={{
                        py: 1.5,
                        transition: 'background-color 0.2s ease',
                        backgroundColor: hoveredId === apt.id ? 'action.hover' : 'transparent',
                        '&:hover': { backgroundColor: 'action.hover' },
                      }}
                    >
                      <ListItemText
                        primary={`Mieszkanie ${apt.id.toUpperCase()} - ${
                          typeof apt.area === 'number' ? apt.area.toFixed(2) : '??'
                        } m²`}
                        secondary={`Piętro: ${apt.floor === 0 ? 'Parter' : apt.floor ?? '??'}, Pokoje: ${
                          apt.rooms ?? '??'
                        }`}
                      />
                      <Chip
                        label={apt.status}
                        color={
                          apt.status === 'dostępne' ? 'success' : apt.status === 'zarezerwowane' ? 'warning' : 'default'
                        }
                        size="small"
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Panel dla drugiej zakładki - Galeria */}
          <TabPanel
            value={activeTab}
            index={1}
          >
            {galleryUrls.length > 0 ? (
              <ImageList
                variant="masonry"
                cols={3}
                gap={8}
              >
                {galleryUrls.map((imgSrc, index) => (
                  <ImageListItem
                    key={imgSrc}
                    onClick={() => openLightbox(index)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {/* --- POCZĄTEK ZMIANY --- */}
                    {/* Zamiast <img> używamy naszego nowego komponentu */}
                    <ImageWithSkeleton
                      src={imgSrc}
                      alt={`Wizualizacja ${index + 1}`}
                      height={index % 2 === 0 ? 250 : 180} // Ustawiamy wysokość
                    />
                    {/* --- KONIEC ZMIANY --- */}
                  </ImageListItem>
                ))}
              </ImageList>
            ) : (
              <Typography>Brak zdjęć w galerii dla tej inwestycji.</Typography>
            )}
          </TabPanel>
        </Paper>
      </Container>

      {/* Lightbox dla galerii inwestycji */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={galleryUrls.map((src) => ({ src }))}
        index={lightboxIndex}
      />
    </>
  );
}
