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
  CircularProgress,
} from '@mui/material';
import { NotFoundPage } from './NotFoundPage';
import { InteractiveMapOverlay } from '../components/InteractiveMapOverlay';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import type { Investment } from '../data/investments';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../data/firebase';

// Komponent pomocniczy do wyświetlania treści aktywnej zakładki
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

  // Stany do zarządzania danymi, ładowaniem i błędami
  const [investment, setInvestment] = useState<Investment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Stany dla interfejsu (zakładki, lightbox, podświetlanie)
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!investmentId) return;

    const fetchInvestment = async () => {
      try {
        setLoading(true);
        // Tworzymy referencję do konkretnego dokumentu w kolekcji 'investments'
        const docRef = doc(db, 'investments', investmentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setInvestment(docSnap.data() as Investment);
        } else {
          setError('Nie znaleziono takiej inwestycji.');
        }
      } catch (err) {
        setError('Błąd podczas ładowania danych.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestment();
  }, [investmentId]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Obsługa ładowania i błędów
  if (loading) {
    return (
      <Container sx={{ py: 5, textAlign: 'center' }}>
        <CircularProgress />
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
          {/* Reszta komponentu (zakładki, mapa, lista mieszkań) pozostaje bez zmian,
              ponieważ korzysta ze stanu 'investment', który jest teraz wypełniany danymi z Firebase. */}
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
                        primary={`Mieszkanie ${apt.id.toUpperCase()} - ${apt.area.toFixed(2)} m²`}
                        secondary={`Piętro: ${apt.floor === 0 ? 'Parter' : apt.floor}, Pokoje: ${apt.rooms}`}
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

          <TabPanel
            value={activeTab}
            index={1}
          >
            {investment.investmentGallery && investment.investmentGallery.length > 0 ? (
              <ImageList
                variant="masonry"
                cols={3}
                gap={8}
              >
                {investment.investmentGallery.map((imgSrc, index) => (
                  <ImageListItem
                    key={imgSrc}
                    onClick={() => setLightboxOpen(true)}
                  >
                    <img
                      src={imgSrc}
                      alt={`Wizualizacja ${index + 1}`}
                      loading="lazy"
                      style={{ borderRadius: '8px', cursor: 'pointer' }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            ) : (
              <Typography>Brak zdjęć w galerii dla tej inwestycji.</Typography>
            )}
          </TabPanel>
        </Paper>
      </Container>

      {investment.investmentGallery && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={investment.investmentGallery.map((src) => ({ src }))}
        />
      )}
    </>
  );
}
