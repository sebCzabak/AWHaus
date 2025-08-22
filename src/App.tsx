import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom'; // <--- IMPORTY Z ROUTERA

import { theme } from './theme';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TransparentDeveloperBadge } from './components/TransparentDeveloperBadge';
import { QuickContactFab } from './components/QuickContactFab';
import { CookieConsentBanner } from './components/CookieConsentBanner';

// Importujemy nasze nowe strony
import { HomePage } from './pages/HomePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { ContactPage } from './pages/ContactPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { OfferPage } from './pages/OfferPage';
import { ConstructionDiaryPage } from './pages/ConstructionDiaryPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SingleApartmentPage } from './pages/SingleApartmentPage';
import { SingleInvestmentPage } from './pages/SingleInvestmentPage';
import { FAQPage } from './pages/FAQPage';
import { CreditCalculatorPage } from './pages/CreditCalculatorPage';
import { HowWeCanHelpPage } from './pages/HowWeCanHelpPage';
import { MobileStickyActionBar } from './components/MobileStickyActionBar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          pb: { xs: '80px', md: 0 },
        }}
      >
        <Header />
        <Box
          component="main"
          sx={{ flexGrow: 1 }}
        >
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="/polityka-prywatnosci"
              element={<PrivacyPolicyPage />}
            />
            <Route
              path="/o-nas"
              element={<AboutUsPage />}
            />
            <Route
              path="/oferta"
              element={<OfferPage />}
            />
            <Route
              path="/oferta/:investmentId"
              element={<SingleInvestmentPage />}
            />
            <Route
              path="/oferta/:investmentId/:apartmentId"
              element={<SingleApartmentPage />}
            />
            <Route
              path="/kontakt"
              element={<ContactPage />}
            />
            <Route
              path="/dziennik-budowy"
              element={<ConstructionDiaryPage />}
            />
            <Route
              path="/faq"
              element={<FAQPage />}
            />
            <Route
              path="/kalkulator-kredytowy"
              element={<CreditCalculatorPage />}
            />
            <Route
              path="/jak-pomagamy"
              element={<HowWeCanHelpPage />}
            />

            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </Box>
        <Footer />
        <TransparentDeveloperBadge />
        <QuickContactFab />
        <CookieConsentBanner />
        <MobileStickyActionBar />
      </Box>
    </ThemeProvider>
  );
}

export default App;
