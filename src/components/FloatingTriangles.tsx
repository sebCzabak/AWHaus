import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

// Animacja rotacji dla trójkątów
const rotate = keyframes`
  0% { transform: rotate(0deg); opacity: 0.6; }
  50% { transform: rotate(180deg); opacity: 1; }
  100% { transform: rotate(360deg); opacity: 0.6; }
`;

export function FloatingTriangles() {
  return (
    <Box sx={{ position: 'relative', width: 80, height: 80 }}>
      {/* Pierwszy trójkąt - największy, z tyłu */}
      <Box
        sx={{
          position: 'absolute',
          width: 0,
          height: 0,
          borderLeft: '25px solid transparent',
          borderRight: '25px solid transparent',
          borderBottom: '43px solid',
          borderBottomColor: 'primary.main',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.4,
          animation: `${rotate} 12s linear infinite`,
          zIndex: 1,
        }}
      />

      {/* Drugi trójkąt - średni, w środku */}
      <Box
        sx={{
          position: 'absolute',
          width: 0,
          height: 0,
          borderLeft: '20px solid transparent',
          borderRight: '20px solid transparent',
          borderBottom: '35px solid',
          borderBottomColor: 'primary.main',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.6,
          animation: `${rotate} 8s linear infinite reverse`,
          zIndex: 2,
        }}
      />

      {/* Trzeci trójkąt - najmniejszy, z przodu */}
      <Box
        sx={{
          position: 'absolute',
          width: 0,
          height: 0,
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderBottom: '26px solid',
          borderBottomColor: 'primary.main',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.8,
          animation: `${rotate} 6s linear infinite`,
          zIndex: 3,
        }}
      />
    </Box>
  );
}
