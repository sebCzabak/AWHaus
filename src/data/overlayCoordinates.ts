export interface OverlayData {
  id: string;
  top: string;
  left: string;
  width: string;
  height: string;
  clipPath?: string;
}

export const sitePlanCoordinates: OverlayData[] = [
  {
    id: '1a',
    top: '7.6%',
    left: '3.9%',
    width: '39%',
    height: '19.2%',
    clipPath: 'polygon(100% 4%, 100% 62%, 0 61%, 0 31%)',
  },
  { id: '1b', top: '19.3%', left: '3.9%', width: '39%', height: '4.2%' },
  { id: '2b', top: '23.4%', left: '3.9%', width: '39%', height: '4.2%' },
  { id: '2a', top: '27.6%', left: '3.9%', width: '39%', height: '4.8%' },

  {
    id: '9a',
    top: '1.8%',
    left: '53.8%',
    width: '44%',
    height: '13.8%',
    clipPath: 'polygon(100% 4%, 100% 82%, 0 83%, 0 41%)',
  },
  { id: '9b', top: '13.1%', left: '53.8%', width: '44%', height: '4.2%' },
  { id: '10b', top: '17.2%', left: '53.8%', width: '44%', height: '4.2%' },
  { id: '10a', top: '21.3%', left: '53.8%', width: '44%', height: '4.8%' },

  { id: '3a', top: '34.5%', left: '3.9%', width: '39%', height: '4.8%' },
  { id: '3b', top: '39.2%', left: '3.9%', width: '39%', height: '4%' },
  { id: '4b', top: '43.1%', left: '3.9%', width: '39%', height: '3.9%' },
  { id: '4a', top: '46.9%', left: '3.9%', width: '39%', height: '4.8%' },

  { id: '11a', top: '29.6%', left: '53.8%', width: '44%', height: '4.8%' },
  { id: '11b', top: '34.3%', left: '53.8%', width: '44%', height: '4%' },
  { id: '12b', top: '38.3%', left: '53.8%', width: '44%', height: '3.9%' },
  { id: '12a', top: '42%', left: '53.8%', width: '44%', height: '4.8%' },

  { id: 'etap-2', top: '46%', left: '1%', width: '90%', height: '50%' },
];
