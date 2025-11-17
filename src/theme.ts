import { createTheme, type PaletteColor, type PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    green: PaletteColor;
  }
  interface PaletteOptions {
    green?: PaletteColorOptions;
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light', // Jasny tryb
    primary: {
      main: '#008363', //   #83907cTwój nowy kolor główny (szałwiowa zieleń)
    },
    secondary: {
      main: '#333333', // Ciemny szary/czarny dla kontrastu
    },
    green: {
      main: '#22af88',
    },
    background: {
      default: '#ffffff', // Cała strona jest biała
      paper: '#f9f9f9',   // Delikatnie szare tło dla "kartek"
    },
    text: {
      primary: '#212121', // Główny tekst
      secondary: '#757575', // Drugorzędny tekst
    },
  },
  typography: {
    fontFamily: '"Lato", "Helvetica Neue", "Arial", sans-serif',
    h1: { fontSize: '3.5rem', fontWeight: 700 },
    h2: { fontSize: '2.5rem', fontWeight: 600 },
    // ...możesz dalej dostosowywać typografię
  },
});
export const strongTextShadow = {
  textShadow: '-1px -1px 0 #, 1px -1px 0 #d4b04cff, -1px 1px 0 #d4b04cff, 1px 1px 0 #d4b04cff',
};
export const subtleTextShadow = {
  // textShadow: '1px 1px 3px rgba(37, 37, 37, 0.9)'
};