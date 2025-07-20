import { useState } from 'react';
import { Fab, Box, Typography, useScrollTrigger, Fade,Collapse } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export function TransparentDeveloperBadge() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });
  const [isExpanded,setIsExpaned]=useState(false);

  const handleToggle=()=>{
    setIsExpaned((prev)=>!prev);
  }

  return (
    <Fade in={trigger}>
      <Fab
        variant="extended"
        onClick={handleToggle}
        sx={{
          position: 'fixed',
          bottom: 59,
          right: 39,
          textTransform: 'none',
          backgroundColor: 'white',
          color: 'text.primary',
          py: 1.5, 
          transition: 'background-color 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <CheckCircleIcon sx={{
          mr: 1.5,
          fontSize: '2.2rem', 
          color: 'secondary.main',
        }} />

        <Collapse in={isExpanded} orientation="horizontal" timeout="auto">
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            ml: 0.5, 
            whiteSpace:'nowrap'
          }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem', lineHeight: 1.3 }}>
              TRANSPARENTNY DEWELOPER
            </Typography>
            <Typography sx={{ fontSize: '0.8rem', lineHeight: 1.3 }}>
              Prezentujemy ceny zgodnie z ustawą
            </Typography>
          </Box>
        </Collapse>
      </Fab>
    </Fade>
  );
}