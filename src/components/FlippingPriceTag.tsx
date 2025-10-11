import  { useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import { db } from '../data/firebase';
import { collection, getDocs } from 'firebase/firestore';
import {type Investment } from '../data/investments';

export function FlippingPriceTag() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [lowestPrice, setLowestPrice] = useState<string | null>(null);
  const [_lowestPricePerSqm, setLowestPricePerSqm] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      let minTotalPrice = Infinity;
      let minPricePerSqm = Infinity;

      const querySnapshot = await getDocs(collection(db, "investments"));
      querySnapshot.forEach((doc) => {
        const investment = doc.data() as Investment;
        investment.apartments?.forEach(apt => {
          // Upewniamy się, że mieszkanie ma cenę i poprawny metraż > 0
          if (apt.price && apt.area && apt.area > 0) {
            const priceNum = parseFloat(apt.price.replace(/[^\d.-]/g, ''));
            
            if (priceNum < minTotalPrice) {
              minTotalPrice = priceNum;
            }

            const pricePerSqm = priceNum / apt.area;
            if (pricePerSqm < minPricePerSqm) {
              minPricePerSqm = pricePerSqm;
            }
          }
        });
      });

      if (minTotalPrice !== Infinity) {
        setLowestPrice(minTotalPrice.toLocaleString('pl-PL'));
      }
      if (minPricePerSqm !== Infinity) {
        setLowestPricePerSqm(Math.round(minPricePerSqm).toLocaleString('pl-PL'));
      }
    };
    fetchPrices();
  }, []);

  return (
    <motion.div
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ position: 'relative', transformStyle: 'preserve-3d', minWidth: 250, textAlign: 'center' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.9 }}
      >
        {/* --- POCZĄTEK POPRAWKI WYRÓWNANIA --- */}
        {/* PRZÓD: Jest teraz elementem statycznym, który nadaje wysokość całemu komponentowi */}
        <Paper 
          sx={{ 
            p: '12px 16px', backgroundColor: 'rgba(255,255,255,0.9)', color: 'black', 
            backfaceVisibility: 'hidden',
            position: 'relative', // Zamiast 'absolute'
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>
            Cena za m² już od <span style={{ color: '#83907c' }}>8650 zł</span>
          </Typography>
        </Paper>

        {/* TYŁ: Jest pozycjonowany absolutnie, aby nałożyć się na przód */}
        <Paper 
          sx={{ 
            p: '12px 16px', backgroundColor: 'rgba(255,255,255,0.9)', color: 'black',
            backfaceVisibility: 'hidden', 
            position: 'absolute', // Pozostaje 'absolute'
            top: 0, left: 0, width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: 'rotateY(180deg)'
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>
            Mieszkania już od <span style={{ color: '#83907c' }}>{lowestPrice ? `${lowestPrice} zł` : '...'}</span>
          </Typography>
        </Paper>
        {/* --- KONIEC POPRAWKI WYRÓWNANIA --- */}
      </motion.div>
    </motion.div>
  );
}