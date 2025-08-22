import { Element } from 'react-scroll';

import { Hero } from '../components/Hero';
import { ContactForm } from '../components/ContactForm';
import { GoogleMap } from '../components/GoogleMap';

import architekturaImage from '../assets/wizualizacja/24.jpg';
import lokalizacjaImage from '../assets/wizualizacja/18.jpg';
import dImage from '../assets/wizualizacja/19.jpg';
import { KeyFeatures } from '../components/KeyFeatures';
import { NearbyPlaces } from '../components/NearbyPlaces';
import { LocationMap } from '../components/LocationMap';
import { AnimatedStats } from '../components/AnimatedStats';
import { ContentSection } from '../components/ContentSection';
import { FadeInOnScroll } from '../components/FadeInOnScroll';



export function HomePage() {
  return (
    <>
      <Element name="start">
        <Hero />
      </Element>

    <FadeInOnScroll>
      <KeyFeatures />
       </FadeInOnScroll>
       <FadeInOnScroll direction="right">
      <NearbyPlaces />
          </FadeInOnScroll >
      <LocationMap />

      <AnimatedStats />

      <Element name="o-nas">
        <ContentSection
          imageSrc={architekturaImage}
          title="Nowoczesna Architektura"
          imageOnLeft={true}
        >
          Nasze inwestycje charakteryzują się nowoczesnym designem i wysoką jakością wykonania. Dbamy o każdy detal, aby zapewnić komfort i prestiż przyszłym mieszkańcom. Stosujemy tylko sprawdzone materiały i innowacyjne rozwiązania technologiczne.
        </ContentSection>
      </Element>

      <Element name="oferta">
        <ContentSection
          imageSrc={lokalizacjaImage}
          title="Idealna Lokalizacja"
          imageOnLeft={false}
        >
          Wybieramy tylko najlepsze lokalizacje – bliskość terenów zielonych, dogodny dojazd do centrum oraz rozbudowana infrastruktura to nasze priorytety. Twoje nowe mieszkanie będzie idealnym miejscem do życia, pracy i odpoczynku.
        </ContentSection>
      </Element>

      <Element name="oferta">
        <ContentSection
          imageSrc={dImage}
          title="Idealna Lokalizacja"
          imageOnLeft={true}
        >
          Wybieramy tylko najlepsze lokalizacje – bliskość terenów zielonych, dogodny dojazd do centrum oraz rozbudowana infrastruktura to nasze priorytety. Twoje nowe mieszkanie będzie idealnym miejscem do życia, pracy i odpoczynku.
        </ContentSection>
      </Element>

      <Element name="kontakt">
        <ContactForm />
        <GoogleMap />
      </Element>
    </>
  );
}