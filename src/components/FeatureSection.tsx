import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { ImageWithSkeleton } from './ImageWithSkeleton';


interface Props {
  imageSrc: string;
  title: string;
  subheading?: string; 
  children: React.ReactNode;
  imageOnLeft?: boolean;
  backgroundColor?: string; 
}

export function FeatureSection({ 
  imageSrc, 
  title, 
  subheading,
  children, 
  imageOnLeft = false,
  backgroundColor = 'white' // Domyślnie białe tło
}: Props) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    // Główny Box, który rozciąga tło na całą szerokość ekranu
    <Box 
      ref={ref}
      sx={{ 
        py: { xs: 4, md: 10 },
        backgroundColor: backgroundColor,
        opacity: inView ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
      }}
    >
       <Grid 
        container 
        spacing={5} 
        alignItems="center" 
        direction={imageOnLeft ? 'row' : 'row-reverse'}
      >
        <Grid size={{xs:12, md:6}}>
          <Box sx={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : (imageOnLeft ? '-50px' : '50px'),
            transition: 'opacity 0.8s ease-out 0.2s, transform 0.6s ease-out 0.2s',
          }}>
          <Box sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 15 }}>
                <ImageWithSkeleton 
                  src={imageSrc} 
                  alt={title} 
                  height={500} 
                />
          </Box>
          </Box>
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <Box sx={{ 
            p: { xs: 3, md: 8 }, 
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : (imageOnLeft ? '50px' : '-50px'),
            transition: 'opacity 0.8s ease-out 0.4s, transform 0.6s ease-out 0.4s',
          }}>
            {subheading && (
              <Typography sx={{ color: 'primary.main', textTransform: 'uppercase', mb: 1, fontWeight: 'bold' }}>
                {subheading}
              </Typography>
            )}
            <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold' }}>{title}</Typography>
            <Box sx={{ mt: 3, fontSize: '1.1rem', maxWidth: '700px', color: 'text.secondary' }}>
              {children}
            </Box>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}