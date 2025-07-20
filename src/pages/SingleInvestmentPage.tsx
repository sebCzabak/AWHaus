import React, { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Paper, Grid, List, ListItem, ListItemText, Chip, Tabs, Tab, ImageList, ImageListItem } from '@mui/material';
import { investmentsData } from '../data/investments';
import { NotFoundPage } from './NotFoundPage';
import { InteractiveMapOverlay } from '../components/InteractiveMapOverlay';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";


// Komponent pomocniczy do wyświetlania treści aktywnej zakładki
function TabPanel(props: { children?: React.ReactNode; index: number; value: number; }) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export function SingleInvestmentPage() {
  const { investmentId } = useParams<{ investmentId: string }>();
  const investment = investmentsData.find(inv => inv.id === investmentId);

  // Stan do zarządzania podświetlaniem (hover)
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  // Stan do zarządzania aktywną zakładką
  const [activeTab, setActiveTab] = useState(0);
  // Stan do zarządzania lightboxem dla galerii
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (!investment) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          {investment.name}
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          {investment.description}
        </Typography>

        <Paper sx={{ mt: 4 }}>
          {/* Nawigacja w zakładkach */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange} centered>
              <Tab label="Interaktywny Plan" />
              <Tab label="Galeria Inwestycji" />
            </Tabs>
          </Box>
          
          {/* Panel dla pierwszej zakładki - Interaktywny Plan */}
          <TabPanel value={activeTab} index={0}>
            <Grid container spacing={4}>
              <Grid size={{xs:12, md:7}}>
                <Typography variant="h4" gutterBottom>Plan osiedla</Typography>
                <InteractiveMapOverlay
                  investmentId={investment.id}
                  apartments={investment.apartments}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                />
              </Grid>
              <Grid size={{xs:12, md:5}}>
                <Typography variant="h4" gutterBottom>Dostępne lokale</Typography>
                <List sx={{ border: '1px solid #ddd', borderRadius: 2, overflow: 'hidden' }}>
                  {investment.apartments.map((apt, index) => (
                    <ListItem
                      key={apt.id}
                      component={RouterLink}
                      to={`/oferta/${investment.id}/${apt.id}`}
                      divider={index < investment.apartments.length - 1}
                      onMouseEnter={() => setHoveredId(apt.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      sx={{ py: 1.5, transition: 'background-color 0.2s ease', backgroundColor: hoveredId === apt.id ? 'action.hover' : 'transparent', '&:hover': { backgroundColor: 'action.hover' }}}
                    >
                      <ListItemText primary={`Mieszkanie ${apt.id.toUpperCase()} - ${apt.area.toFixed(2)} m²`} secondary={`Piętro: ${apt.floor === 0 ? 'Parter' : apt.floor}, Pokoje: ${apt.rooms}`} />
                      <Chip label={apt.status} color={apt.status === 'dostępne' ? 'success' : apt.status === 'zarezerwowane' ? 'warning' : 'default'} size="small"/>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </TabPanel>
          
          {/* Panel dla drugiej zakładki - Galeria */}
          <TabPanel value={activeTab} index={1}>
            {investment.investmentGallery && investment.investmentGallery.length > 0 ? (
              <ImageList variant="masonry" cols={3} gap={8}>
                {investment.investmentGallery.map((imgSrc, index) => (
                  <ImageListItem key={imgSrc} onClick={() => setLightboxOpen(true)}>
                    <img src={imgSrc} alt={`Wizualizacja ${index + 1}`} loading="lazy" style={{ borderRadius: '8px', cursor: 'pointer' }}/>
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
      {investment.investmentGallery && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={investment.investmentGallery.map(src => ({ src }))}
        />
      )}
    </>
  );
}