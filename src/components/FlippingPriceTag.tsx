import { useState, useEffect } from 'react';
import { Paper, Typography, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

import { db } from '../data/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { type Investment } from '../data/investments';

export function FlippingPriceTag() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [lowestPrice, setLowestPrice] = useState<string | null>(null);
  const [lowestPricePerSqm, setLowestPricePerSqm] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchPrices = async () => {
      let minTotalPrice = Infinity;
      let minPricePerSqm = Infinity;

      const querySnapshot = await getDocs(collection(db, 'investments'));
      querySnapshot.forEach((doc) => {
        const investment = doc.data() as Investment;
        investment.apartments?.forEach((apt) => {
          // Upewniamy się, że mieszkanie ma cenę i poprawny metraż > 0
          // Price is now a number in Firestore
          if (apt.price && typeof apt.price === 'number' && apt.area && apt.area > 0) {
            const priceNum = apt.price;

            // Only process valid numbers and filter out unrealistic prices (likely data errors)
            // Assume prices should be between 100,000 and 5,000,000 PLN (reasonable apartment prices)
            if (!isNaN(priceNum) && isFinite(priceNum) && priceNum >= 100000 && priceNum <= 5000000) {
              if (priceNum < minTotalPrice) {
                minTotalPrice = priceNum;
              }

              const pricePerSqm = priceNum / apt.area;
              // Price per m² should be reasonable (between 5,000 and 20,000 PLN/m²)
              if (pricePerSqm < minPricePerSqm && pricePerSqm >= 5000 && pricePerSqm <= 20000) {
                minPricePerSqm = pricePerSqm;
              }
            }
          }
        });
      });

      if (minTotalPrice !== Infinity && minTotalPrice > 0) {
        // Format with dots as thousands separators (Polish format: 499.000)
        const formatted = Math.round(minTotalPrice).toLocaleString('pl-PL', { useGrouping: true });
        setLowestPrice(formatted.replace(/\s/g, '.')); // Replace spaces with dots
      }
      if (minPricePerSqm !== Infinity && minPricePerSqm > 0) {
        // Format with dots as thousands separators, no decimals (Polish format: 8.600)
        const formatted = Math.round(minPricePerSqm).toLocaleString('pl-PL', {
          useGrouping: true,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });
        setLowestPricePerSqm(formatted.replace(/\s/g, '.')); // Replace spaces with dots
      }
    };
    fetchPrices();
  }, []);

  // Infinite animation for mobile
  const mobileAnimation = {
    rotateY: [0, 180, 360],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: [0.4, 0, 0.2, 1] as const, // cubic-bezier equivalent to easeInOut
    },
  };

  // Hover-based animation for desktop
  const desktopAnimation = {
    rotateY: isFlipped ? 180 : 0,
    transition: { duration: 0.9 },
  };

  return (
    <motion.div
      onHoverStart={() => !isMobile && setIsFlipped(true)}
      onHoverEnd={() => !isMobile && setIsFlipped(false)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ position: 'relative', transformStyle: 'preserve-3d', minWidth: 250, textAlign: 'center' }}
        animate={isMobile ? mobileAnimation : desktopAnimation}
      >
        {/* --- POCZĄTEK POPRAWKI WYRÓWNANIA --- */}
        {/* PRZÓD: Jest teraz elementem statycznym, który nadaje wysokość całemu komponentowi */}
        <Paper
          sx={{
            p: '12px 16px',
            backgroundColor: 'rgba(255,255,255,0.9)',
            color: 'black',
            backfaceVisibility: 'hidden',
            position: 'relative', // Zamiast 'absolute'
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>
            Cena za m² już od{' '}
            <span style={{ color: '#22af88' }}>{lowestPricePerSqm ? `${lowestPricePerSqm} zł` : '...'}</span>
          </Typography>
        </Paper>

        {/* TYŁ: Jest pozycjonowany absolutnie, aby nałożyć się na przód */}
        <Paper
          sx={{
            p: '12px 16px',
            backgroundColor: 'rgba(255,255,255,0.9)',
            color: 'black',
            backfaceVisibility: 'hidden',
            position: 'absolute', // Pozostaje 'absolute'
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotateY(180deg)',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>
            Mieszkania już od <span style={{ color: '#22af88' }}>{lowestPrice ? `${lowestPrice} zł` : '...'}</span>
          </Typography>
        </Paper>
        {/* --- KONIEC POPRAWKI WYRÓWNANIA --- */}
      </motion.div>
    </motion.div>
  );
}
