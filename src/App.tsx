import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Element } from 'react-scroll'; // <--- IMPORT

import { theme } from './theme';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ImageTextSection } from './components/ImageTextSection'
import { ContactForm } from './components/ContactForm';
import { GoogleMap } from './components/GoogleMap';
import { Footer } from './components/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        {/* Każda sekcja opakowana w Element z unikalną nazwą (name) */}
        <Element name="start">
          <Hero />
        </Element>
        <Element name="o-nas">
          <ImageTextSection
            image="https://source.unsplash.com/random/800x600?apartment-building"
            title="Nowoczesna Architektura"
            text="Nasze inwestycje charakteryzują się nowoczesnym designem i wysoką jakością wykonania. Dbamy o każdy detal, aby zapewnić komfort i prestiż przyszłym mieszkańcom. Stosujemy tylko sprawdzone materiały i innowacyjne rozwiązania technologiczne."
            imageLeft={true}
          />
        </Element>
        <Element name="oferta">
          <ImageTextSection
            image="https://source.unsplash.com/random/800x600?green-estate"
            title="Idealna Lokalizacja"
            text="Wybieramy tylko najlepsze lokalizacje – bliskość terenów zielonych, dogodny dojazd do centrum oraz rozbudowana infrastruktura to nasze priorytety. Twoje nowe mieszkanie będzie idealnym miejscem do życia, pracy i odpoczynku."
            imageLeft={false}
          />
        </Element>
        <Element name="kontakt">
          <ContactForm />
          <GoogleMap />
        </Element>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;