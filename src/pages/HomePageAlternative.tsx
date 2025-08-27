
import { Hero } from '../components/Hero';
import { FeatureSection } from '../components/FeatureSection';
import { ApartmentList } from '../components/ApartmentList';

import aImage from '../assets/wizualizacja/12.jpg';
import bImage from '../assets/wizualizacja/22.jpg';
import gardenImage from '../assets/wizualizacja/21.jpg';
import gardenNImage from '../assets/wizualizacja/20.jpg';
import architekturaImage from '../assets/wizualizacja/24.jpg'
import lokalizacjaImage from '../assets/wizualizacja/18.jpg';
import { FadeInOnScroll } from '../components/FadeInOnScroll';
import { KeyFeatures } from '../components/KeyFeatures';
import { Avatar, Box, Container, Grid, Typography } from '@mui/material';
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
    img: aImage,
    title: 'Wizualizacja Architektury',
  },
  {
    type: 'text',
    title: 'Własny Ogródek',
    content: 'Każde mieszkanie posiada prywatny ogródek do Twojej dyspozycji.',
  },
  {
    type: 'image',
    img: bImage,
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
     
      <FeatureSection
        imageSrc={architekturaImage}
        subheading="Komfort Życia"
        title="Nowoczesna Architektura"
        imageOnLeft={true}
        backgroundColor="#f9f9f9" 
      >
      <>
  <Typography paragraph color="text.secondary" sx={{ fontSize: '1.1rem' }}>
    Symfonia Górki to wyjątkowy projekt mieszkaniowy w sercu Górek, zlokalizowany w pięknej, malowniczej zieleni, jedynie 10 minut jazdy samochodem od centrum miasta Opola. Dzięki tej doskonałej lokalizacji przyszli mieszkańcy będą mogli cieszyć się zapierającymi dech w piersiach widokami. Krótki spacer po okolicy wystarczy, by zregenerować się po ciężkim dnu pracy.
    Wybierz nowoczesny styl życia w Symfonia Górki i poczuj się jak na wakacjach każdego dnia.
  </Typography>

   Oferujemy szeroki wybór mieszkań dwupoziomowych o powierzchniach od 59 do 94 m², w tym funkcjonalne 2- i 3-pokojowe lokale, które spełnią oczekiwania nawet najbardziej wymagających klientów.
  <Typography paragraph color="text.secondary" sx={{ fontSize: '1.1rem' }}>
    Kiedy powiększa się rodzina, rozbudowujesz mieszkanie o pełnowymiarowe poddasze i zyskujesz kolejny metraż. Każdy mieszkaniec będzie mógł cieszyć się prywatnym ogródkiem, a do każdego budynku jest przynależne miejsce parkingowe.
  </Typography>
</>
      </FeatureSection>

      <FeatureSection
        imageSrc={lokalizacjaImage}
        subheading="Twoje Miejsce"
        title="Idealna Lokalizacja"
        imageOnLeft={false}
        backgroundColor="white" 
      >
                    <Box sx={{ mt: 4 }}>
                        <FloatingSquares />
                      </Box>
        Wybieramy tylko najlepsze lokalizacje – bliskość terenów zielonych, dogodny dojazd do centrum oraz rozbudowana infrastruktura to nasze priorytety. Twoje nowe mieszkanie będzie idealnym miejscem do życia, pracy i odpoczynku, z łatwym dostępem do wszystkiego, czego potrzebujesz na co dzień.
      </FeatureSection>

    {/*<VideoComponent/>*/}
      <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" textAlign="center" gutterBottom>
            Deweloper z Pasją
          </Typography>
          <Typography variant="h5" color="text.secondary" textAlign="center" paragraph>
            Budujemy przyszłość, mieszkanie po mieszkaniu.
          </Typography>
          <Typography paragraph sx={{ mt: 3, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
            Od 2010 roku z pasją tworzymy przestrzenie, które nasi klienci z dumą nazywają domem. Wierzymy, że kluczem do sukcesu jest połączenie nowoczesnej architektury, najwyższej jakości materiałów i transparentnej współpracy. Każdy projekt traktujemy indywidualnie, dbając o każdy, nawet najmniejszy detal.
          </Typography>

          <Typography variant="h3" component="h3" textAlign="center" gutterBottom sx={{ mt: 6 }}>
            Nasz Zespół
          </Typography>
       <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid size={{xs:12, sm:4}} sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 100, height: 100, margin: '0 auto 16px' }} />
              <Typography variant="h6">Jan Kowalski</Typography>
              <Typography color="text.secondary">Prezes Zarządu</Typography>
            </Grid>
            <Grid size={{xs:12, sm:4}} sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 100, height: 100, margin: '0 auto 16px' }} />
              <Typography variant="h6">Anna Nowak</Typography>
              <Typography color="text.secondary">Dyrektor Sprzedaży</Typography>
            </Grid>
            <Grid size={{xs:12, sm:4}} sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 100, height: 100, margin: '0 auto 16px' }} />
              <Typography variant="h6">Piotr Wiśniewski</Typography>
              <Typography color="text.secondary">Główny Architekt</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

            <FeatureSection
        imageSrc={gardenNImage}
        subheading="Twoje Miejsce"
        title="Idealna Lokalizacja"
        imageOnLeft={true}
        backgroundColor="#f9f9f9" 
      >
      <>
  <Typography paragraph color="text.secondary" sx={{ fontSize: '1.1rem' }}>
   Bliskość natury i malowniczych krajobrazów stały się inspiracją do stworzenia
nowoczesnego projektu architektonicznego, który harmonijnie łączy modernistyczny
styl z otaczającym środowiskiem. Materiały do wykończenia budynków zostały
starannie dobrane, duże przeszklenia zapewniają naturalne światło i eksponują
piękno natury. Elewacja ceglana, liczne gzymsy, łączenie kolorów i detali razem z
dwu spadowym dachem nadaje ponadczasowy wygląd budynków oraz komfortowy
styl życia.
  </Typography>

    Symfonia Górki  oferuje unikalne połączenie bliskości natury z dynamicznym życiem
miejskim. Dzięki dobrej lokalizacji, mieszkańcy będą mieli dostęp do tras
rowerowych, ścieżek spacerowych oraz miejsc do wypoczynku. Kilkuminutowa
przejażdżka rowerem pozwoli dotrzeć na wyspę Bolko z przepięknym ogrodem
zoologicznym oraz nowym parkiem, basenem Wodna Nuta lub kampus Politechniki
Opolskiej.
  <Typography paragraph color="text.secondary" sx={{ fontSize: '1.1rem' }}>
   Rozwinięta infrastruktura drogowa i komunikacja miejska zapewniają
szybki dostęp do kluczowych punktów miasta oraz szkół, przedszkoli i licznych
sklepów. To miejsce idealne dla każdego, kto ceni ciszę, spokój i zieleń w połączeniu
z wygodnym życiem miejskim.
  </Typography>
   <Box sx={{ mt: 4 }}>
      <FloatingSquares />
    </Box>
</>
      </FeatureSection>
    <FadeInOnScroll direction="right">
      <NearbyPlaces />
    </FadeInOnScroll >
   

       <Box sx={{ py: 8 }}>
         <Container maxWidth="xl"> 
          <Typography variant="h2" component="h2" gutterBottom textAlign="center">
            Kluczowe Zalety
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