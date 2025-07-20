import { Box, Typography } from '@mui/material';

export function Footer() {
  return (
    <Box component="footer" sx={{ p: 4, mt: 4, backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }}>
      <Typography variant="body2">
        AWHaus © {new Date().getFullYear()} Wszelkie prawa zastrzeżone.
      </Typography>
    </Box>
  );
}