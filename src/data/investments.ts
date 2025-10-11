export interface Apartment {
  id: string;
  price: string;
  rooms: number;
  area: number;
  status: 'dostępne' | 'zarezerwowane' | 'sprzedane';
  planUrl?: string;
  description?: string;
  galleryImages?: string[];
  isPremium?: boolean;
  cenaM2?: number;
  exposure?: string;
}

export interface Investment {
  id: string;
  name: string;
  location: string;
  description: string;
  mainImage: string;
  apartments: Apartment[];
  investmentGallery?: string[];
  cenaM2?: number;
}
