import osiedleImage from '../assets/wizualizacja/25.png';
import wizualizacja1 from '../assets/wizualizacja/1.png';
import wizualizacja2 from '../assets/wizualizacja/2.png';
import wizualizacja3 from '../assets/wizualizacja/3.png';
import wizualizacja4 from '../assets/wizualizacja/4.png';
import wizualizacja5 from '../assets/wizualizacja/5.png';

import inwestycjaWiz1 from '../assets/aksonometrie/AKSONOMETRIA (1).png';
import inwestycjaWiz2 from '../assets/aksonometrie/AKSONOMETRIA (13).png';
import inwestycjaWiz3 from '../assets/aksonometrie/AKSONOMETRIA (14).png';

export interface Apartment {
  floor: number;
  id: string;
  price: string;
  rooms: number;
  area: number;
  status: 'dostępne' | 'zarezerwowane' | 'sprzedane';
  planUrl?: string;
  description?: string;
  galleryImages?: string[];
}
export interface Investment {
  id: string;
  name: string;
  location: string;
  description: string;
  mainImage: string;
  apartments: Apartment[];
  investmentGallery?: string[];
  isPremium?: boolean;
  cenaM2?: number;
}

export const investmentsData: Investment[] = [
  {
    id: 'osiedle-symfonia',
    name: 'Osiedle Symfonia',
    location: 'Górki koło Opola',
    description:
      'Nowoczesne osiedle w spokojnej miejscowości Górki, idealne dla rodzin i osób ceniących sobie komfort i bliskość natury.',
    investmentGallery: [inwestycjaWiz1, inwestycjaWiz2, inwestycjaWiz3],
    mainImage: `${osiedleImage}`,
    apartments: [
      {
        id: '1a',
        price: '590000 zł',
        floor: 1,
        rooms: 7,
        area: 94,
        status: 'dostępne',
        description:
          'Przestronny, dwupoziomowy apartament z dużym salonem i otwartą kuchnią. Idealny dla dużej rodziny, z prywatnym ogródkiem i bezpośrednim wyjściem na tereny zielone.',
        galleryImages: [wizualizacja1, wizualizacja2, wizualizacja3, wizualizacja4, wizualizacja5],
      },
      {
        id: '1b',
        price: '590000 zł',
        floor: 1,
        rooms: 6,
        area: 59,
        status: 'dostępne',
        description:
          'Przestronny, dwupoziomowy apartament z dużym salonem i otwartą kuchnią. Idealny dla dużej rodziny, z prywatnym ogródkiem i bezpośrednim wyjściem na tereny zielone.',
        galleryImages: [wizualizacja1, wizualizacja2, wizualizacja3, wizualizacja4, wizualizacja5],
      },
      {
        id: '2a',
        price: '590000 zł',
        floor: 1,
        rooms: 7,
        area: 67,
        status: 'dostępne',
        description:
          'Przestronny, dwupoziomowy apartament z dużym salonem i otwartą kuchnią. Idealny dla dużej rodziny, z prywatnym ogródkiem i bezpośrednim wyjściem na tereny zielone.',
        galleryImages: [wizualizacja1, wizualizacja2, wizualizacja3, wizualizacja4, wizualizacja5],
      },
      {
        id: '2b',
        price: '590000 zł',
        floor: 1,
        rooms: 6,
        area: 59,
        status: 'dostępne',
        description:
          'Przestronny, dwupoziomowy apartament z dużym salonem i otwartą kuchnią. Idealny dla dużej rodziny, z prywatnym ogródkiem i bezpośrednim wyjściem na tereny zielone.',
        galleryImages: [wizualizacja1, wizualizacja2, wizualizacja3, wizualizacja4, wizualizacja5],
      },
      {
        id: '3a',
        price: '590000 zł',
        floor: 1,
        rooms: 7,
        area: 94,
        status: 'dostępne',
        description:
          'Przestronny, dwupoziomowy apartament z dużym salonem i otwartą kuchnią. Idealny dla dużej rodziny, z prywatnym ogródkiem i bezpośrednim wyjściem na tereny zielone.',
        galleryImages: [wizualizacja1, wizualizacja2, wizualizacja3, wizualizacja4, wizualizacja5],
      },
      {
        id: '3b',
        price: '590000 zł',
        floor: 1,
        rooms: 6,
        area: 59,
        status: 'dostępne',
        description:
          'Przestronny, dwupoziomowy apartament z dużym salonem i otwartą kuchnią. Idealny dla dużej rodziny, z prywatnym ogródkiem i bezpośrednim wyjściem na tereny zielone.',
        galleryImages: [wizualizacja1, wizualizacja2, wizualizacja3, wizualizacja4, wizualizacja5],
      },
      { id: '4a', price: '590000 zł', floor: 1, rooms: 7, area: 67, status: 'dostępne' },
      { id: '4b', price: '590000 zł', floor: 1, rooms: 6, area: 59, status: 'dostępne' },
      { id: '5a', price: '590000 zł', floor: 1, rooms: 7, area: 94, status: 'dostępne' },
      { id: '5b', price: '590000 zł', floor: 1, rooms: 6, area: 59, status: 'dostępne' },
      { id: '6a', price: '590000 zł', floor: 1, rooms: 7, area: 67, status: 'dostępne' },
      { id: '6b', price: '590000 zł', floor: 1, rooms: 6, area: 59, status: 'dostępne' },
      { id: '7a', price: '590000 zł', floor: 1, rooms: 7, area: 94, status: 'dostępne' },
      { id: '7b', price: '590000 zł', floor: 1, rooms: 6, area: 59, status: 'dostępne' },
      { id: '8a', price: '590000 zł', floor: 1, rooms: 7, area: 67, status: 'dostępne' },
      { id: '8b', price: '590000 zł', floor: 1, rooms: 6, area: 59, status: 'dostępne' },
      { id: '9a', price: '590000 zł', floor: 1, rooms: 7, area: 94, status: 'dostępne' },
      { id: '9b', price: '590000 zł', floor: 1, rooms: 6, area: 59, status: 'dostępne' },
      { id: '10a', price: '590000 zł', floor: 1, rooms: 7, area: 67, status: 'dostępne' },
      { id: '10b', price: '590000 zł', floor: 1, rooms: 6, area: 59, status: 'dostępne' },
      { id: '11a', price: '590000 zł', floor: 1, rooms: 7, area: 94, status: 'dostępne' },
      { id: '11b', price: '590000 zł', floor: 1, rooms: 6, area: 59, status: 'dostępne' },
      { id: '12a', price: '590000 zł', floor: 1, rooms: 7, area: 67, status: 'dostępne' },
      { id: '12b', price: '590000 zł', floor: 1, rooms: 6, area: 59, status: 'dostępne' },
      { id: '13a', price: '590000 zł', floor: 1, rooms: 7, area: 94, status: 'dostępne' },
      { id: '13b', price: '590000 zł', floor: 1, rooms: 6, area: 59, status: 'dostępne' },
      { id: '14a', price: '590000 zł', floor: 1, rooms: 7, area: 67, status: 'dostępne' },
      { id: '14b', price: '590000 zł', floor: 1, rooms: 6, area: 59, status: 'dostępne' },
      { id: '15a', price: '590000 zł', floor: 1, rooms: 7, area: 94, status: 'dostępne' },
      { id: '15b', price: '590000 zł', floor: 1, rooms: 6, area: 59, status: 'dostępne' },
      { id: '16a', price: '590000 zł', floor: 1, rooms: 7, area: 67, status: 'dostępne' },
      { id: '16b', price: '590000 zł', floor: 1, rooms: 6, area: 59, status: 'dostępne' },
    ],
  },
];
