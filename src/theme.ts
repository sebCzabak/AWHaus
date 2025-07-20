import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#af2249', 
    },
    secondary: {
      main: '#22af88', 
    },
    background: {
      default: '#F5F5F3', // Nowy, cieplejszy kolor tła strony
      paper: '#ffffff',   // Tło dla "kartek" (Paper) i kart (Card) pozostaje białe
    },
    text: {
      primary: '#333333',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      marginBottom: '1rem',
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none', 
      fontWeight: 600,
      fontSize: '1rem',
    }
  },
});