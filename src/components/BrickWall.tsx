import { Box } from '@mui/material';
import { keyframes } from '@mui/system';
import { useState, useEffect } from 'react';

// Animacja pojawiania się cegiełki
const buildBrick = keyframes`
  0% { 
    opacity: 0; 
    transform: translateY(-15px) scale(0.7);
  }
  100% { 
    opacity: 0.8; 
    transform: translateY(0) scale(1);
  }
`;

interface BrickWallProps {
  loop?: boolean; // Czy animacja ma się powtarzać w pętli
  loopDelay?: number; // Opóźnienie między powtórzeniami (w sekundach)
}

export function BrickWall({ loop = false, loopDelay = 2 }: BrickWallProps) {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (loop) {
      // Obliczamy całkowity czas animacji (najdłuższy delay + czas animacji)
      const totalBricks = 4 + 3 + 4 + 3; // 14 cegiełek
      const maxDelay = totalBricks * 0.08;
      const animationDuration = 0.5;
      const totalTime = (maxDelay + animationDuration + loopDelay) * 1000;

      const interval = setInterval(() => {
        setAnimationKey((prev) => prev + 1);
      }, totalTime);

      return () => clearInterval(interval);
    }
  }, [loop, loopDelay]);
  // Definiujemy układ cegiełek w murze (naprzemienny układ)
  const brickRows = [
    [true, true, true, true], // Rząd 1: 4 pełne cegiełki
    [false, true, true, true, false], // Rząd 2: zaczyna się od połowy, 3 pełne, kończy się połową
    [true, true, true, true], // Rząd 3: 4 pełne cegiełki
    [false, true, true, true, false], // Rząd 4: zaczyna się od połowy, 3 pełne, kończy się połową
  ];

  const brickWidth = 18;
  const brickHeight = 10;
  const brickGap = 2;

  return (
    <Box
      sx={{
        position: 'relative',
        width: brickWidth * 4 + brickGap * 3,
        height: brickHeight * 4 + brickGap * 3,
      }}
    >
      {brickRows.map((row, rowIndex) =>
        row.map((isFull, brickIndex) => {
          // Pomijamy "false" (puste miejsca dla naprzemiennego układu)
          if (!isFull) return null;

          const isHalfStart = rowIndex % 2 === 1 && brickIndex === 0;
          const isHalfEnd = rowIndex % 2 === 1 && brickIndex === row.length - 1;

          // Obliczamy pozycję
          const xOffset = rowIndex % 2 === 1 ? brickWidth / 2 : 0; // Przesunięcie dla naprzemiennego układu
          const x = brickIndex * (brickWidth + brickGap) - xOffset;
          const y = rowIndex * (brickHeight + brickGap);

          // Opóźnienie animacji - cegiełki pojawiają się jedna po drugiej
          // Liczymy tylko pełne cegiełki (pomijamy false)
          let brickCount = 0;
          for (let r = 0; r < rowIndex; r++) {
            brickCount += brickRows[r].filter(Boolean).length;
          }
          for (let b = 0; b < brickIndex; b++) {
            if (row[b]) brickCount++;
          }
          const delay = brickCount * 0.08;

          return (
            <Box
              key={`${animationKey}-${rowIndex}-${brickIndex}`}
              sx={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                width: isHalfStart || isHalfEnd ? `${brickWidth / 2}px` : `${brickWidth}px`,
                height: `${brickHeight}px`,
                backgroundColor: 'primary.main',
                border: '1px solid',
                borderColor: 'primary.dark',
                opacity: 0, // Zaczynamy od 0
                transform: 'translateY(-15px) scale(0.7)',
                animation: `${buildBrick} 0.5s ease-out ${delay}s forwards`,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '2px',
                  left: '2px',
                  right: '2px',
                  height: '1px',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            />
          );
        })
      )}
    </Box>
  );
}
