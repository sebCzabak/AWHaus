import  { useState } from 'react';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import CloseIcon from '@mui/icons-material/Close';
import { ContactForm } from './ContactForm'; // Importujemy nasz formularz

export function QuickContactFab() {
  const [formOpen, setFormOpen] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          position: 'fixed',
          top: '50%',
          left: 24,
          transform: 'translateY(-50%)',
          zIndex: 1200, // Aby być nad innymi elementami
        }}
      >
        {/* Przycisk do otwierania formularza */}
        <Fab color="primary" aria-label="form" size="medium" onClick={() => setFormOpen(true)}>
          <MailOutlineIcon />
        </Fab>

        {/* Przycisk do otwierania numeru telefonu */}
        <Fab color="secondary" aria-label="phone" size="medium" onClick={() => setPhoneOpen(true)}>
          <PhoneIcon />
        </Fab>
      </Stack>

      {/* Okno dialogowe z formularzem kontaktowym */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Napisz do nas
          <IconButton
            aria-label="close"
            onClick={() => setFormOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ContactForm isInDialog={true} />
        </DialogContent>
      </Dialog>

      {/* Okno dialogowe z numerem telefonu */}
      <Dialog open={phoneOpen} onClose={() => setPhoneOpen(false)}>
        <DialogTitle>
          Zadzwoń do nas
          <IconButton
            aria-label="close"
            onClick={() => setPhoneOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <PhoneIcon color="secondary" sx={{ fontSize: '2.5rem' }}/>
            <Typography variant="h5" component="a" href="tel:+48123456789" sx={{ textDecoration: 'none', color: 'text.primary' }}>
              +48 123 456 789
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}