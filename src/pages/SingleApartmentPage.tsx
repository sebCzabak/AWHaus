import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Paper, Grid, Button, Divider, Chip } from '@mui/material';
import { investmentsData } from '../data/investments';
import { NotFoundPage } from './NotFoundPage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CustomImageCarousel } from '../components/CustomImageCarousel';

export function SingleApartmentPage() {
  const { investmentId, apartmentId } = useParams<{ investmentId: string, apartmentId: string }>();
  const navigate = useNavigate();

  const investment = investmentsData.find(inv => inv.id === investmentId);
  const apartment = investment?.apartments.find(apt => apt.id === apartmentId);

  if (!investment || !apartment) {
    return <NotFoundPage />;
  }
  const handleInquiryClick = ()=>{
    if(!apartment)return;
    const message=`Dzień dobry, interesuje mnie mieszkanie o numerze ${apartment.id.toUpperCase()} w inwestycji ${investment?.name}. Proszę o kontakt w tej sprawie.`;
    navigate('/kontakt',{state:{prefilledMessage:message}});
  }

   return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(`/oferta/${investmentId}`)}>
        Wróć do planu inwestycji
      </Button>
      <Typography variant="h2" component="h1" gutterBottom sx={{ mt: 2 }}>
        Mieszkanie {apartment.id.toUpperCase()}
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Nieruchomość w ramach inwestycji: {investment.name}
      </Typography>

      <Paper sx={{ p: { xs: 2, md: 4 }, mt: 4 }}>
        <Grid container spacing={4}>
             <Grid size={{xs:12, md:7}}>
            {/* Karuzela lub placeholder, jeśli nie ma zdjęć */}
            {apartment.galleryImages && apartment.galleryImages.length > 0 ? (
              <CustomImageCarousel images={apartment.galleryImages} />
            ) : (
              <Box sx={{ bgcolor: '#f0f0f0', height: 400, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="text.secondary">[ Rzut mieszkania ]</Typography>
              </Box>
            )}
          </Grid>
          <Grid size={{xs:12, md:5}}>
            <Typography variant="h4" gutterBottom>Szczegóły lokalu</Typography>
            <Box>
              <Typography variant="h6">Metraż: <strong>{apartment.area.toFixed(2)} m²</strong></Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="h6">Liczba pokoi: <strong>{apartment.rooms}</strong></Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="h6">Piętro: <strong>{apartment.floor === 0 ? 'Parter' : apartment.floor}</strong></Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="h6">Status: 
                <Chip 
                  label={apartment.status}
                  color={apartment.status === 'dostępne' ? 'success' : apartment.status === 'zarezerwowane' ? 'warning' : 'default'}
                />
              </Typography>
              
              {/* Opis mieszkania */}
              {apartment.description && (
                <Typography variant="body1" sx={{ mt: 3, mb: 3 }}>
                  {apartment.description}
                </Typography>
              )}

              {/* Inteligentny przycisk */}
              {apartment.status === 'sprzedane' ? (
                <Button variant="contained" size="large" sx={{ mt: 2 }} disabled>
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
  );
};