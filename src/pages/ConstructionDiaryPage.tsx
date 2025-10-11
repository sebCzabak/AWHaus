import  { useState } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

export function ConstructionDiaryPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsModalOpen(false);
    navigate('/'); 
  };

  return (
    <>
      <title>Postęp Prac: Osiedle Symfonia w Opolu | Dziennik Budowy AWHaus</title>
      <meta 
        name="description" 
        content="Śledź postęp prac na budowie Osiedla Symfonia w Opolu. Zobacz aktualne zdjęcia i galerię z każdego etapu budowy Twojego nowego domu z AWHaus Deweloper." 
      />

      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="coming-soon-dialog-title"
        BackdropProps={{
          sx: {
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
          }
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: '12px'
          }
        }}
      >
        <DialogTitle id="coming-soon-dialog-title" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Już Wkrótce!
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: 'center' }}>
            Ta sekcja jest w trakcie przygotowania. Zapraszamy wkrótce, aby zobaczyć najnowsze postępy prac na budowie.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
          <Button onClick={handleClose} variant="contained">
            Wróć na stronę główną
          </Button>
        </DialogActions>
      </Dialog>

      {/* Istniejąca treść strony (będzie rozmyta i zablokowana przez modal) */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Dziennik Budowy
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Śledź z nami na bieżąco postępy prac na osiedlu [Nazwa Osiedla].
        </Typography>
        <Paper sx={{ p: { xs: 1, md: 2 }, mt: 4 }}>
          {/* ... reszta komponentów, np. ImageList ... */}
        </Paper>
      </Container>
    </>
  );
}