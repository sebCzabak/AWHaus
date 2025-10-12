import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, Container, Grid, TextField, Typography, CircularProgress, Alert } from '@mui/material';

// Importujemy potrzebne funkcje z Firebase
import { db } from '../data/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ContactFormProps {
  isInDialog?: boolean;
}

export function ContactForm({ isInDialog = false }: ContactFormProps) {
  const location = useLocation();
  
  // 1. Odczytujemy WSZYSTKIE dane przekazane ze strony mieszkania
  const prefilledMessage = location.state?.prefilledMessage || '';
  const investmentId = location.state?.investmentId || null;
  const apartmentId = location.state?.apartmentId || null;
  
   useEffect(() => {
    console.log("Krok 2: Dane OTRZYMANE w formularzu kontaktowym:", location.state);
  }, [location.state]);
  // Stan do przechowywania danych z formularza
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: prefilledMessage,
  });

  // Stan do zarządzania procesem wysyłki
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

 useEffect(() => {
    setFormData(prev => ({ ...prev, message: prefilledMessage }));
  }, [prefilledMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const dataToSave = {
        ...formData,
        investmentId,
        apartmentId,
        createdAt: serverTimestamp(),
      };

      // --- LOG DIAGNOSTYCZNY ---
      console.log("Krok 3: Dane WYSYŁANE do Firestore:", dataToSave);
      // --- KONIEC LOGU ---

      await addDoc(collection(db, 'messages'), dataToSave);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error("Błąd zapisu wiadomości:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  const formContent = (
    <Box component="form" noValidate autoComplete="off" sx={{ mt: isInDialog ? 2 : 0 }} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth label="Imię" name="name" value={formData.name} onChange={handleChange} required />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField fullWidth label="Telefon" name="phone" value={formData.phone} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Wiadomość"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', minHeight: '80px', mt: 2 }}>
          {isSubmitting ? (
            <CircularProgress />
          ) : (
            <Button type="submit" variant="contained" color="primary" size="large">
              Wyślij wiadomość
            </Button>
          )}
          {submitStatus === 'success' && <Alert severity="success" sx={{ mt: 2 }}>Wiadomość wysłana pomyślnie! Dziękujemy.</Alert>}
          {submitStatus === 'error' && <Alert severity="error" sx={{ mt: 2 }}>Wystąpił błąd. Spróbuj ponownie.</Alert>}
        </Grid>
      </Grid>
    </Box>
  );

  if (!isInDialog) {
    return (
      <Box sx={{ py: 6, backgroundColor: 'background.paper' }}>
        <Container maxWidth="md">
          <Typography variant="h2" align="center" gutterBottom>
            Skontaktuj się z nami
          </Typography>
          {formContent}
        </Container>
      </Box>
    );
  }

  return formContent;
}