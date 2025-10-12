export interface OverlayData {
  id: string;
  top: string;
  left: string;
  width: string;
  height: string;
  clipPath?: string;
  placeholderTitle?: string;
  placeholderSubtitle?: string;
}

export const sitePlanCoordinates: OverlayData[] = [
  { 
    id: '1a',
    top: '9.5%',
    left: '3.9%',
    width: '39%',
    height: '10%',
    // Kształt: prostokąt z "wycięciem" po prawej stronie na górze
    clipPath: 'polygon(0% 35%, 70% 0%, 70% 72%, 100% 72%, 100% 100%, 0% 100%)'
  },
  { id: '1b',     
    top: '19%', 
    left: '3.9%', 
    width: '39%',
    height: '4.6%',
    // Kształt: prostokąt z "wycięciem" po prawej stronie na dole
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 70% 50%, 70% 100%, 0% 100%)' },
  { id: '2b',    
    top: '23.4%', 
    left: '3.9%', 
    width: '39%',
    height: '4.5%',
    // Kształt: prostokąt z "wycięciem" po prawej stronie na dole
    clipPath: 'polygon(75% 0%, 75% 50%, 100% 50%, 100% 100%, 0 100%, 0 5%)' 
  },
  { id: '2a',   top: '27.6%', 
    left: '3.9%', 
    width: '39%',
    height: '5.8%',
    // Kształt: prostokąt z "wycięciem" po prawej stronie na dole
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 70% 50%, 70% 100%, 0% 100%)' 
  },

{ 
    id: '3a', 
    top: '33.5%', 
    left: '3.9%', 
    width: '39%',
    height: '6%',
    // Kształt: prostokąt z "wycięciem" po prawej stronie na dole
    clipPath: 'polygon(75% 5%, 75% 50%, 100% 50%, 100% 100%, 0 100%, 0 5%)' 
  },
  { id: '3b',   
     top: '39%', 
    left: '3.9%', 
    width: '39%',
    height: '4.5%',
    // Kształt: prostokąt z "wycięciem" po prawej stronie na dole
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 70% 50%, 70% 100%, 0% 100%)' 
  },
  { id: '4b',     top: '43.1%', 
    left: '3.9%', 
    width: '39%',
    height: '4.5%',
    // Kształt: prostokąt z "wycięciem" po prawej stronie na dole
    clipPath: 'polygon(75% 5%, 75% 50%, 100% 50%, 100% 100%, 0 100%, 0 5%)' 
  },
  { id: '4a',     top: '47.7%', 
    left: '3.9%', 
    width: '39%',
    height: '5.5%',
    // Kształt: prostokąt z "wycięciem" po prawej stronie na dole
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 70% 50%, 70% 100%, 0% 100%)' 
  },



  // {
  //   id: '9a',
  //   top: '1.8%',
  //   left: '53.8%',
  //   width: '44%',
  //   height: '13.8%',
  //   clipPath: 'polygon(100% 4%, 100% 82%, 0 83%, 0 41%)',
  // },
  // { id: '9b', top: '13.1%', left: '53.8%', width: '44%', height: '4.2%'},
  // { id: '10b', top: '17.2%', left: '53.8%', width: '44%', height: '4.2%' },
  // { id: '10a', top: '21.3%', left: '53.8%', width: '44%', height: '4.8%' },

  

  // { id: '11a', top: '29.6%', left: '53.8%', width: '44%', height: '4.8%' },
  // { id: '11b', top: '34.3%', left: '53.8%', width: '44%', height: '4%' },
  // { id: '12b', top: '38.3%', left: '53.8%', width: '44%', height: '3.9%' },
  // { id: '12a', top: '42%', left: '53.8%', width: '44%', height: '4.8%' },

  { id: 'etap-2', top: '1%', left: '53%', width: '40%', height: '49%',placeholderTitle: '- II Etap Budowy -',
    placeholderSubtitle: 'Dostępny wkrótce', },
  { id: 'etap-3', top: '46%', left: '1%', width: '96%', height: '50%',placeholderTitle: '- III Etap Budowy -',
    placeholderSubtitle: 'Planowany',
 },
];
