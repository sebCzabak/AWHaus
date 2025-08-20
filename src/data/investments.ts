export interface Apartment {
  id: string;
  price: string;
  rooms: number;
  area: number;
  status: 'dostępne' | 'zarezerwowane' | 'sprzedane';
  planUrl?: string;
  description?: string;
  galleryImages?: string[];
  floor?: number;
  isPremium?: boolean;
  cenam2?: number;
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
