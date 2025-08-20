export interface OverlayData {
  id: string; // Musi pasować do ID mieszkania, np. "1a"
  top: string; // Pozycja od góry w %
  left: string; // Pozycja od lewej w %
  width: string; // Szerokość w %
  height: string; // Wysokość w %
}

export const sitePlanCoordinates: OverlayData[] = [
  { id: '1a', top: '10.4%', left: '18%', width: '27%', height: '5%' },
  { id: '1b', top: '15.4%', left: '18%', width: '27%', height: '4.6%' },
  { id: '2a', top: '23.8%', left: '18%', width: '27%', height: '5%' },
  { id: '2b', top: '19.4%', left: '18%', width: '27%', height: '4.6%' },
  // ... i tak dalej dla wszystkich 32 mieszkań
  { id: '9a', top: '3.5%', left: '53%', width: '27%', height: '5%' },
  { id: '9b', top: '8.5%', left: '53%', width: '27%', height: '4.6%' },
  { id: '10a', top: '17.8%', left: '53%', width: '27%', height: '5%' },
  { id: '10b', top: '13%', left: '53%', width: '27%', height: '4.6%' },
];
