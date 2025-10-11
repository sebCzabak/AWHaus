import { Box, Container, Typography } from '@mui/material';

export function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        p: 4, 
        mt: 4, 
        backgroundColor: 'primary.main', 
        color: 'white' 
      }}
    >
      <Container maxWidth="lg">
        
        <Typography variant="caption" display="block" sx={{ textAlign: 'center', mb: 2, opacity: 0.8 }}>
          Wizualizacje mają charakter poglądowy. Mogą różnić się od stanu faktycznego i nie stanowią oferty w rozumieniu Kodeksu cywilnego.
        </Typography>
        
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          AWHaus © {new Date().getFullYear()} Wszelkie prawa zastrzeżone.
        </Typography>
      </Container>
    </Box>
  );
}