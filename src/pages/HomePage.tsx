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

export function HomePage() {
  return (
    <>
      <Element name="start">
        <Hero />
      </Element>
      <FadeInOnScroll>
        <KeyFeatures />
      </FadeInOnScroll>

      <FadeInOnScroll direction="left">
        <Element name="o-nas">
          <ImageTextSection
            image={architekturaImage}
            title="Nowoczesna Architektura"
            text="Nasze inwestycje charakteryzują się nowoczesnym designem i wysoką jakością wykonania. Dbamy o każdy detal, aby zapewnić komfort i prestiż przyszłym mieszkańcom. Stosujemy tylko sprawdzone materiały i innowacyjne rozwiązania technologiczne."
            imageLeft={true}
          />
        </Element>
      </FadeInOnScroll>

      <FadeInOnScroll direction="right">
        <Element name="oferta">
          <ImageTextSection
            image={lokalizacjaImage}
            title="Idealna Lokalizacja"
            text="Wybieramy tylko najlepsze lokalizacje – bliskość terenów zielonych, dogodny dojazd do centrum oraz rozbudowana infrastruktura to nasze priorytety. Twoje nowe mieszkanie będzie idealnym miejscem do życia, pracy i odpoczynku."
            imageLeft={false}
          />
        </Element>
      </FadeInOnScroll>
      <FadeInOnScroll>
        <NearbyPlaces />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <Element name="oferta">
          <ImageTextSection
            image={designImage}
            title="Trzy warianty bezczynszowych mieszkań do wyboru"
            text="Czekająna Ciebie bezczynszowe mieszkania, różniące się m.in. powierzchnią i układem wnętrz. Na parterze znajdują się lokale o powierzchni 55,61 m² z prywatnym ogródkiem, salonem z aneksem kuchennym, 2 sypialniami i łazienką. Na piętrze dostępne są dwa warianty do wyboru: o powierzchni 72,99 m² lub 77,99 m², z balkonem, salonem z aneksem kuchennym, 2 sypialniami i łazienką na poziomie piętra oraz dodatkowo z zamkniętą sypialnią główną na antresoli (11,50 m² lub 16,50 m²)."
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
