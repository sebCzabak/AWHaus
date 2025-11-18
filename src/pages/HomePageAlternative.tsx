import { Hero } from '../components/Hero';
import { FeatureSection } from '../components/FeatureSection';
import { ApartmentList } from '../components/ApartmentList';

import happy from '../assets/happy.png';
import rowery from '../assets/rowery.png';
import gardenImage from '../assets/ogrod.png';
import gardenNImage from '../assets/wizualizacja/20.jpg';
import architekturaImage from '../assets/wizualizacja/24.jpg';
import lokalizacjaImage from '../assets/wizualizacja/18.jpg';
import wizualizacja12 from '../assets/wizualizacja/Poddasze.png';
import { FadeInOnScroll } from '../components/FadeInOnScroll';
import { KeyFeatures } from '../components/KeyFeatures';
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import { MasonryGrid, type MasonryItem } from '../components/MasonryGrid';
import { NearbyPlaces } from '../components/NearbyPlaces';
import { FloatingSquares } from '../components/FloatingSquares';
import VideoComponent from '../components/VideoComponent';
import { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../data/firebase';
import DownloadIcon from '@mui/icons-material/Download';
import { InteractiveLocationMap } from '../components/InteractiveLocationMap';
import coverImage from '../assets/katalog-okladka.jpg';
import { CatalogFlipbook } from '../components/CatalogFlipbook';
import { FloatingTriangles } from '../components/FloatingTriangles';
import { BrickWall } from '../components/BrickWall';
import { CreditCalculator } from '../components/CreditCalculator';
import { Link } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';

// Przygotowujemy dane dla naszej nowej siatki
const masonryData: MasonryItem[] = [
  {
    type: 'text',
    title: 'Spokój i Cisza',
    content: 'Osiedle zlokalizowane w otoczeniu zieleni, z dala od miejskiego zgiełku.',
  },
  {
    type: 'image',
    img: happy,
    title: '"Lasy na miejscu"',
    content: 'Zielone tereny, wiele miejsc do spacerowania i relaksu w otoczeniu lasów.',
  },
  {
    type: 'text',
    title: 'Daleko od miasta',
    content: 'Ale blisko do wszystkiego co potrzebujesz.',
  },

  {
    type: 'image',
    img: rowery,
    title: 'Tereny rekreacyjne',
    content: 'Spacerując po okolicy, możesz docenić piękno otaczającej zieleni i malowniczych krajobrazów.',
  },
  {
    type: 'text',
    title: 'Najwyższa Jakość i Nowoczesne Rozwiązania',
    content:
      'Korzystamy tylko ze sprawdzonych materiałów, gwarantując komfort na lata. Innowacyjne technologie i ekologiczne rozwiązania dla komfortowego życia.',
  },
  {
    type: 'image',
    img: gardenImage,
    title: 'Własny Ogródek',
    content: 'Każde mieszkanie posiada prywatny ogródek do Twojej dyspozycji. Idealne miejsce do relaksu i spokoju.',
  },

  {
    type: 'image',
    img: wizualizacja12,
    title: 'Wizualizacja Osiedla',
  },
  {
    type: 'image',
    title: 'Adaptacja poddasza',
    content: 'Każde mieszkanie ma możliwość adaptacji poddasza. Zyskujesz kolejny dodatkowy metraż.',
  },
];

export function HomePageAlternative() {
  const [prospectusUrl, setProspectusUrl] = useState('');
  const [_specsUrl, setSpecsUrl] = useState('');
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  useEffect(() => {
    // Pobieramy link do naszego PDF-a ze Storage
    const fileRef = ref(storage, 'klient/Symfonia Górki.pdf');

    getDownloadURL(fileRef)
      .then((url) => setProspectusUrl(url))
      .catch((error) => console.error('Nie udało się pobrać linku do prospektu:', error));
  }, []);
  const specsRef = ref(storage, 'klient/Harmonogram płatności AW Haus sp. z o.o. po korekcie.docx'); // Upewnij się, że nazwa pliku się zgadza
  getDownloadURL(specsRef)
    .then((url) => setSpecsUrl(url))
    .catch((error) => console.error('Nie udało się pobrać linku do specyfikacji:', error));

  return (
    <>
      <title>Nowe Mieszkania i Domy w Opolu - Deweloper AWHaus | Osiedle Symfonia</title>
      <meta
        name="description"
        content="Odkryj Osiedle Symfonia – Twoje nowe miejsce do życia blisko natury. Sprawdź ofertę nowoczesnych i komfortowych mieszkań od dewelopera AWHaus w Opolu."
      />
      <Hero />

      <FadeInOnScroll>
        <KeyFeatures />
      </FadeInOnScroll>

      <Box sx={{ py: 12, backgroundColor: '#fff' }}>
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              p: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
            }}
          >
            <Box
              component="img"
              src={coverImage}
              alt="Katalog inwestycji"
              sx={{
                width: '200px',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: 5,
                cursor: 'pointer',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
              onClick={() => setIsCatalogOpen(true)}
            />
            <Box>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
              >
                Zobacz nasz katalog
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Przejrzyj szczegółowy, katalog naszej inwestycji w formie interaktywnego magazynu.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => setIsCatalogOpen(true)}
              >
                Otwórz Katalog
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>

      <Box
        id="budynek"
        sx={{ backgroundColor: '#fff' }}
      >
        <FeatureSection
          imageSrc={lokalizacjaImage}
          subheading="Twoje Miejsce"
          title="Górki - Idealna Lokalizacja"
          imageOnLeft={true}
          backgroundColor="#fff"
        >
          <Typography
            paragraph
            color="text.secondary"
            sx={{
              fontSize: '1.2rem',
              '& strong': { color: 'black' },
            }}
          >
            Wybieramy tylko najlepsze lokalizacje – bliskość terenów zielonych, dogodny dojazd do centrum oraz
            rozbudowana infrastruktura to nasze priorytety. Twoje nowe mieszkanie będzie idealnym miejscem do życia,
            pracy i odpoczynku, z łatwym dostępem do wszystkiego, czego potrzebujesz na co dzień.
          </Typography>
          <Typography
            paragraph
            color="text.secondary"
            sx={{
              fontSize: '1.2rem',
              '& strong': { color: 'black' },
            }}
          >
            <strong>Symfonia Górki </strong> oferuje unikalne połączenie bliskości natury z dynamicznym życiem miejskim.
            Dzięki dobrej lokalizacji, mieszkańcy będą mieli dostęp do tras rowerowych, ścieżek spacerowych oraz miejsc
            do wypoczynku. Kilkuminutowa przejażdżka rowerem pozwoli dotrzeć na wyspę Bolko z przepięknym ogrodem
            zoologicznym oraz nowym parkiem, basenem Wodna Nuta lub kampus Politechniki Opolskiej.
          </Typography>
          <Typography
            paragraph
            color="text.secondary"
            sx={{ fontSize: '1.2rem' }}
          >
            Rozwinięta infrastruktura drogowa i komunikacja miejska zapewniają szybki dostęp do kluczowych punktów
            miasta oraz szkół, przedszkoli i licznych sklepów. To miejsce idealne dla każdego, kto ceni ciszę, spokój i
            zieleń w połączeniu z wygodnym życiem miejskim.
          </Typography>
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <FloatingTriangles />
            <Button
              variant="contained"
              component={Link}
              to="/oferta/osiedle-symfonia"
              sx={{
                textTransform: 'none',
                fontWeight: 900,
                px: 4,
                py: 2,
              }}
            >
              Zobacz Ofertę
            </Button>
          </Box>
        </FeatureSection>
      </Box>

      <Box
        id="lokalizacja"
        sx={{ backgroundColor: '#fff' }}
      >
        <FeatureSection
          imageSrc={gardenNImage}
          subheading="Budynek"
          title="Nowoczesna Architektura"
          imageOnLeft={false}
          backgroundColor="#fff"
        >
          <Typography
            paragraph
            color="text.secondary"
            sx={{ fontSize: '1.2rem' }}
          >
            Bliskość natury i malowniczych krajobrazów stały się inspiracją do stworzenia nowoczesnego projektu
            architektonicznego, który harmonijnie łączy modernistyczny styl z otaczającym środowiskiem. Materiały do
            wykończenia budynków zostały starannie dobrane, duże przeszklenia zapewniają naturalne światło i eksponują
            piękno natury. Elewacja ceglana, liczne gzymsy, łączenie kolorów i detali razem z dwu spadowym dachem nadaje
            ponadczasowy wygląd budynków oraz komfortowy styl życia.
          </Typography>

          <Typography
            paragraph
            color="text.secondary"
            sx={{ fontSize: '1.2rem' }}
          >
            Każde mieszkanie ma możliwość adaptacji poddasza. Zyskujesz kolejny dodatkowy metraż. Każdy mieszkaniec
            będzie mógł cieszyć się prywatnym ogródkiem, a do każdego budynku jest przynależne miejsce parkingowe
          </Typography>
          <Box
            sx={{
              mt: 5,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <BrickWall
              loop={true}
              loopDelay={2}
            />
            <Button
              variant="contained"
              component={Link}
              to="/oferta/osiedle-symfonia"
              sx={{
                textTransform: 'none',
                fontWeight: 900,
                px: 4,
                py: 2,
              }}
            >
              Zobacz Ofertę
            </Button>
          </Box>
        </FeatureSection>
      </Box>
      <VideoComponent />

      <FadeInOnScroll direction="right">
        <NearbyPlaces />
      </FadeInOnScroll>

      <Box
        id="komfort-zycia"
        sx={{ backgroundColor: '#fff' }}
      >
        <FeatureSection
          imageSrc={architekturaImage}
          subheading="Komfort Życia"
          title="Żyj w harmonii z naturą"
          imageOnLeft={true}
          backgroundColor="#fff"
        >
          <Typography
            paragraph
            color="text.secondary"
            sx={{ fontSize: '1.2rem' }}
          >
            Oferujemy szeroki wybór mieszkań dwupoziomowych o powierzchniach od 57 do 92 m², w tym funkcjonalny rozkład
            lokali oraz okno w łazience, które spełnią oczekiwania nawet najbardziej wymagających klientów.
          </Typography>
          <Typography
            paragraph
            color="text.secondary"
            sx={{
              fontSize: '1.2rem',
              '& strong': { color: 'black' },
            }}
          >
            <strong>Symfonia Górki </strong> to wyjątkowy projekt mieszkaniowy w sercu Górek, zlokalizowany w pięknej,
            malowniczej zieleni, jedynie 10 minut jazdy samochodem od centrum miasta Opola. Dzięki tej doskonałej
            lokalizacji przyszli mieszkańcy będą mogli cieszyć się zapierającymi dech w piersiach widokami. Krótki
            spacer po okolicy wystarczy, by zregenerować się po ciężkim dnu pracy.
          </Typography>
          <Typography
            paragraph
            color="text.secondary"
            sx={{
              fontSize: '1.2rem',
              '& strong': { color: 'black' },
            }}
          >
            Wybierz nowoczesny styl życia w <strong> Symfonia Górki </strong> i poczuj się jak na wakacjach każdego
            dnia.
          </Typography>

          <Box
            sx={{
              mt: 5,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <FloatingSquares />
            <Button
              variant="contained"
              component={Link}
              to="/oferta/osiedle-symfonia"
              sx={{
                textTransform: 'none',
                fontWeight: 900,
                px: 4,
                py: 2,
              }}
            >
              Zobacz Ofertę
            </Button>
          </Box>
        </FeatureSection>
      </Box>

      <Box
        sx={{ py: 12, backgroundColor: '#fff', px: { xs: 2, md: 0 } }}
        id="dlaczego-warto"
      >
        <Container
          maxWidth={false}
          sx={{ px: { xs: 2, sm: 3, md: 4 } }}
        >
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            textAlign="center"
            sx={{ mb: 6, color: '#212121' }}
          >
            Dlaczego warto!
          </Typography>
          <Box sx={{ width: '100%' }}>
            <MasonryGrid items={masonryData} />
          </Box>
        </Container>
      </Box>
      <Box sx={{ py: 12, backgroundColor: '#fff' }}>
        <CreditCalculator />
      </Box>
      <Box
        id="mapa"
        sx={{ py: 12, backgroundColor: '#fff' }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ mb: 6, color: '#212121' }}
          >
            Naturalnie blisko miasta
          </Typography>
          <InteractiveLocationMap />
          <Box
            textAlign="center"
            mt={6}
          >
            <Button
              variant="outlined"
              href="https://maps.app.goo.gl/DkwyaNii2VVGtqad6"
              target="_blank"
              sx={{
                color: 'primary.main',
                borderColor: 'primary.main',
                textTransform: 'none',
                fontWeight: 500,
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(0, 131, 99, 0.04)',
                },
              }}
            >
              Zobacz na Google Maps
            </Button>
          </Box>
        </Container>
      </Box>
      <ApartmentList />
      <CatalogFlipbook
        open={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
      />
      {/* Nowa sekcja z przyciskiem do pobierania */}
      <Box sx={{ py: 12, textAlign: 'center', backgroundColor: '#fff' }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ color: '#212121', mb: 3 }}
          >
            Pobierz Dokumenty
          </Typography>
          <Typography sx={{ color: '#757575', mb: 6 }}>
            Zapoznaj się ze wszystkimi szczegółami naszej inwestycji w wygodnych dokumentach PDF.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="outlined"
              size="large"
              startIcon={<DownloadIcon />}
              {...(prospectusUrl ? { href: prospectusUrl, target: '_blank', rel: 'noopener noreferrer' } : {})}
              disabled={!prospectusUrl}
              sx={{
                color: 'primary.main',
                borderColor: 'primary.main',
                textTransform: 'none',
                fontWeight: 500,
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(0, 131, 99, 0.04)',
                },
              }}
            >
              Prospekt Informacyjny
            </Button>

            <Button
              variant="outlined" // Inny styl dla drugiego przycisku
              size="large"
              startIcon={<ArticleIcon />}
              {...(_specsUrl ? { href: _specsUrl, target: '_blank', rel: 'noopener noreferrer' } : {})}
              disabled={!_specsUrl}
            >
              Harmonogram budowy
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
