import { createTheme,type PaletteColor, type PaletteColorOptions } from '@mui/material/styles';

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
    primary: {
      main: '#ad9874ff', //#af2249
    },
    secondary: {
      main: '#000', 
    },
    green:{
      main:'#22af88',
    },
    background: {
      default: '#f1f1eaff', 
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary:'#d4b04cff'
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
export const strongTextShadow = {
  textShadow: 
    '-1px -1px 0 #, 1px -1px 0 #d4b04cff, -1px 1px 0 #d4b04cff, 1px 1px 0 #d4b04cff'
};
export const subtleTextShadow = {
  // textShadow: '1px 1px 3px rgba(37, 37, 37, 0.9)'
};