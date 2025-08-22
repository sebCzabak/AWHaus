import { Element } from 'react-scroll';

import { Hero } from '../components/Hero';
import { ImageTextSection } from '../components/ImageTextSection';
import { ContactForm } from '../components/ContactForm';
import { GoogleMap } from '../components/GoogleMap';

import architekturaImage from '../assets/wizualizacja/24.jpg';
import lokalizacjaImage from '../assets/wizualizacja/18.jpg';
import designImage from '../assets/wizualizacja/19.jpg';
import { KeyFeatures } from '../components/KeyFeatures';
import { NearbyPlaces } from '../components/NearbyPlaces';
import { LocationMap } from '../components/LocationMap';
import { FadeInOnScroll } from '../components/FadeInOnScroll';
import { AnimatedStats } from '../components/AnimatedStats';
import { ContentSection } from '../components/ContentSection';
import { Box } from '@mui/material';

export function HomePage() {
  return (
    <>
      <title>Nowe Mieszkania i Domy w Opolu - AWHaus Deweloper</title>
      <meta
        name="description"
        content="Odkryj Osiedle Symfonia - Twoje nowe miejsce do życia. Nowoczesne i komfortowe mieszkania blisko natury. Sprawdź naszą ofertę."
      />

      <Element name="start">
        <Hero />
      </Element>

      <AnimatedStats />

      <FadeInOnScroll>
        <KeyFeatures />
      </FadeInOnScroll>

      {/* <FadeInOnScroll direction="left">
        <Element name="o-nas">
          <ImageTextSection
            image={architekturaImage}
            title="Nowoczesna Architektura"
            text="Nasze inwestycje charakteryzują się nowoczesnym designem i wysoką jakością wykonania. Dbamy o każdy detal, aby zapewnić komfort i prestiż przyszłym mieszkańcom. Stosujemy tylko sprawdzone materiały i innowacyjne rozwiązania technologiczne."
            imageLeft={true}
          />
        </Element>
      </FadeInOnScroll> */}

      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Element name="o-nas">
          <ContentSection
            imageSrc={architekturaImage}
            title="Nowoczesna Architektura"
            imageOnLeft={false}
          >
            Nasze inwestycje charakteryzują się nowoczesnym designem i wysoką jakością wykonania. Dbamy o każdy detal,
            aby zapewnić komfort i prestiż przyszłym mieszkańcom. Stosujemy tylko sprawdzone materiały i innowacyjne
            rozwiązania technologiczne.
          </ContentSection>
        </Element>
      </Box>

      {/* <FadeInOnScroll direction="right">
        <Element name="oferta">
          <ImageTextSection
            image={lokalizacjaImage}
            title="Idealna Lokalizacja"
            text="Wybieramy tylko najlepsze lokalizacje – bliskość terenów zielonych, dogodny dojazd do centrum oraz rozbudowana infrastruktura to nasze priorytety. Twoje nowe mieszkanie będzie idealnym miejscem do życia, pracy i odpoczynku."
            imageLeft={false}
          />
        </Element> 
      </FadeInOnScroll>*/}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Element name="oferta">
          <ContentSection
            imageSrc={lokalizacjaImage}
            title="Idealna Lokalizacja"
            imageOnLeft={true}
          >
            Wybieramy tylko najlepsze lokalizacje – bliskość terenów zielonych, dogodny dojazd do centrum oraz
            rozbudowana infrastruktura to nasze priorytety. Twoje nowe mieszkanie będzie idealnym miejscem do życia,
            pracy i odpoczynku."
          </ContentSection>
        </Element>
      </Box>

      <FadeInOnScroll direction="left">
        <NearbyPlaces />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <Element name="oferta">
          <ImageTextSection
            image={designImage}
            title="Trzy warianty bezczynszowych mieszkań do wyboru"
            text="Czekająna Ciebie bezczynszowe mieszkania, różniące się m.in. powierzchnią i układem wnętrz. Na parterze znajdują się lokale o powierzchni...."
            imageLeft={true}
          />
          <FadeInOnScroll>
            <LocationMap />
          </FadeInOnScroll>
        </Element>
      </FadeInOnScroll>
      <FadeInOnScroll>
        <Element name="kontakt">
          <ContactForm />
          <GoogleMap />
        </Element>
      </FadeInOnScroll>
    </>
  );
}
