import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

// Definiujemy animację "pływania"
const float = keyframes`
  0% { transform: translateY(0px); opacity: 1; }
  50% { transform: translateY(-10px); opacity: 0.7; }
  100% { transform: translateY(0px); opacity: 1; }
`;

export function FloatingSquares() {
  return (
    // Używamy position: 'relative', aby pozycjonować kwadraty wewnątrz tego Boxa
    <Box sx={{ position: 'relative', width: 60, height: 60 }}>
      {/* Każdy kwadrat ma nieco inne style i opóźnienie animacji */}
      <Box
        sx={{
          position: 'absolute',
          width: 40,
          height: 40,
          border: '2px solid',
          borderColor: 'primary.main',
          bottom: 0,
          left: 0,
          animation: `${float} 4s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 25,
          height: 25,
          border: '2px solid',
          borderColor: 'primary.main',
          top: '30%',
          left: '50%',
          animation: `${float} 4s ease-in-out infinite 0.5s`, // Opóźnienie 0.5s
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 35,
          height: 35,
          border: '2px solid',
          borderColor: 'primary.main',
          top: 0,
          right: 0,
          animation: `${float} 5s ease-in-out infinite 1s`, // Dłuższa animacja i większe opóźnienie
        }}
      />
    </Box>
  );
}