import { useState } from 'react';
import { Link } from 'react-router-dom';
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

export function QuickContactFab() {
  const [phoneOpen, setPhoneOpen] = useState(false);

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          display: { xs: 'none', md: 'flex' }, 
          position: 'fixed',
          top: '50%',
          left: 24,
          transform: 'translateY(-50%)',
          zIndex: 1200, 
        }}
      >
        {/* Przycisk do przekierowania na stronę kontakt */}
        <Fab 
          color="primary" 
          aria-label="kontakt" 
          size="medium" 
          component={Link}
          to="/kontakt"
        >
          <MailOutlineIcon />
        </Fab>

        {/* Przycisk do otwierania numeru telefonu */}
        <Fab 
          color="default" 
          aria-label="telefon" 
          size="medium" 
          onClick={() => setPhoneOpen(true)}
          sx={{ bgcolor: 'green', '&:hover': { bgcolor: 'green.main' } }}
        >
          <PhoneIcon />
        </Fab>
      </Stack>

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
            <Typography variant="h5" component="a" href="tel:+48600099572" sx={{ textDecoration: 'none', color: 'text.primary' }}>
              +48 600 099 572
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}