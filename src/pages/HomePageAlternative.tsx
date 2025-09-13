import { Hero } from '../components/Hero';
import { FeatureSection } from '../components/FeatureSection';
import { ApartmentList } from '../components/ApartmentList';

import happy from '../assets/happy.png'
import rowery from '../assets/rowery.png'
import gardenImage from '../assets/ogrod.png'
import gardenNImage from '../assets/wizualizacja/20.jpg';
import architekturaImage from '../assets/wizualizacja/24.jpg';
import lokalizacjaImage from '../assets/wizualizacja/18.jpg';
import { FadeInOnScroll } from '../components/FadeInOnScroll';
import { KeyFeatures } from '../components/KeyFeatures';
import { Box, Container, Typography } from '@mui/material';
import { GoogleMap } from '../components/GoogleMap';
import { MasonryGrid, type MasonryItem } from '../components/MasonryGrid';
import { NearbyPlaces } from '../components/NearbyPlaces';
import { FloatingSquares } from '../components/FloatingSquares';
import VideoComponent from '../components/VideoComponent';


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
    title: 'Wizualizacja Architektury',
  },
  {
    type: 'text',
    title: 'Własny Ogródek',
    content: 'Każde mieszkanie posiada prywatny ogródek do Twojej dyspozycji.',
  },
  {
    type: 'image',
    img: rowery,
    title: 'Widok na Okolicę',
  },
  {
    type: 'text',
    title: 'Najwyższa Jakość',
    content: 'Korzystamy tylko ze sprawdzonych materiałów, gwarantując komfort na lata.',
  },
  {
    type: 'image',
    img: gardenImage,
    title: 'Tereny rekreacyjne',
  },
];

export function HomePageAlternative() {
  return (
    <>
      <Hero />

      <FadeInOnScroll>
        <KeyFeatures />
      </FadeInOnScroll>

      <Box id ="budynek">
    <FeatureSection
        imageSrc={gardenNImage}
        subheading="Budynek"
        title="Nowoczesna Architektura"
        imageOnLeft={true}
        backgroundColor="#f9f9f9"
      >
          <Typography
            paragraph
            color="text.secondary"
            sx={{ fontSize: '1.1rem' }}
          >
            Bliskość natury i malowniczych krajobrazów stały się inspiracją do stworzenia nowoczesnego projektu
            architektonicznego, który harmonijnie łączy modernistyczny styl z otaczającym środowiskiem. Materiały do
            wykończenia budynków zostały starannie dobrane, duże przeszklenia zapewniają naturalne światło i eksponują
            piękno natury. Elewacja ceglana, liczne gzymsy, łączenie kolorów i detali razem z dwu spadowym dachem nadaje
            ponadczasowy wygląd budynków oraz komfortowy styl życia.
          </Typography>
          Symfonia Górki  oferuje unikalne połączenie bliskości natury z dynamicznym życiem miejskim. Dzięki dobrej
          lokalizacji, mieszkańcy będą mieli dostęp do tras rowerowych, ścieżek spacerowych oraz miejsc do wypoczynku.
          Kilkuminutowa przejażdżka rowerem pozwoli dotrzeć na wyspę Bolko z przepięknym ogrodem zoologicznym oraz nowym
          parkiem, basenem Wodna Nuta lub kampus Politechniki Opolskiej.
          <Typography
            paragraph
            color="text.secondary"
            sx={{ fontSize: '1.1rem' }}
          >
            Rozwinięta infrastruktura drogowa i komunikacja miejska zapewniają szybki dostęp do kluczowych punktów
            miasta oraz szkół, przedszkoli i licznych sklepów. To miejsce idealne dla każdego, kto ceni ciszę, spokój i
            zieleń w połączeniu z wygodnym życiem miejskim.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <FloatingSquares />
          </Box>
      </FeatureSection>
      </Box>
    
    <Box id="lokalizacja">
      <FeatureSection
        imageSrc={lokalizacjaImage}
        subheading="Twoje Miejsce"
        title="Górki - Idealna Lokalizacja"
        imageOnLeft={false}
        backgroundColor="white"
      >
        Wybieramy tylko najlepsze lokalizacje – bliskość terenów zielonych, dogodny dojazd do centrum oraz rozbudowana
        infrastruktura to nasze priorytety. Twoje nowe mieszkanie będzie idealnym miejscem do życia, pracy i odpoczynku,
        z łatwym dostępem do wszystkiego, czego potrzebujesz na co dzień.
      </FeatureSection>
</Box>
      <VideoComponent />

        <FeatureSection
        imageSrc={architekturaImage}
        subheading="Komfort Życia"
        title="Żyj w harmonii z naturą"
        imageOnLeft={true}
        backgroundColor="#f9f9f9"
      >
          <Typography
            paragraph
            color="text.secondary"
            sx={{ fontSize: '1.1rem' }}
          >
            Symfonia Górki to wyjątkowy projekt mieszkaniowy w sercu Górek, zlokalizowany w pięknej, malowniczej
            zieleni, jedynie 10 minut jazdy samochodem od centrum miasta Opola. Dzięki tej doskonałej lokalizacji
            przyszli mieszkańcy będą mogli cieszyć się zapierającymi dech w piersiach widokami. Krótki spacer po okolicy
            wystarczy, by zregenerować się po ciężkim dnu pracy. Wybierz nowoczesny styl życia w Symfonia Górki i poczuj
            się jak na wakacjach każdego dnia.
          </Typography>
              Oferujemy szeroki wybór mieszkań dwupoziomowych o powierzchniach od 59 do 94 m², w tym funkcjonalne 2- i
              3-pokojowe lokale, które spełnią oczekiwania nawet najbardziej wymagających klientów.
          <Typography
            paragraph
            color="text.secondary"
            sx={{ fontSize: '1.1rem' }}
          >
            Każde mieszkanie ma możliwość adaptacji poddasza.
            Zyskujesz kolejny dodatkowy metraż ̴  27 m2. Każdy mieszkaniec będzie mógł cieszyć się
            prywatnym ogródkiem, a do każdego budynku jest przynależne miejsce parkingowe
            <Box sx={{ mt: 3 }}>
              <FloatingSquares />
            </Box>
          </Typography>
      </FeatureSection>

  
      <FadeInOnScroll direction="right">
        <NearbyPlaces />
      </FadeInOnScroll>

      <Box sx={{ py: 8 }}id="dlaczego-warto">
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            textAlign="center"
          >
            Dlaczego warto!
          </Typography>
          <Box mt={4}>
            <MasonryGrid items={masonryData} />
          </Box>
        </Container>
      </Box>
      <GoogleMap />
      <ApartmentList />
    </>
  );
}
