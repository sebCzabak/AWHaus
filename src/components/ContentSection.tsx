import React from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface Props {
  imageSrc: string;
  title: string;
  children: React.ReactNode;
  imageOnLeft?: boolean;
}

export function ContentSection({ imageSrc, title, children, imageOnLeft = false }: Props) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <Box
      ref={ref}
      sx={{ py: { xs: 4, md: 8 }, overflow: 'hidden' }}

    >
      {/* Używamy teraz pełnej szerokości lg */}
      <Container maxWidth="lg">
        <Box sx={{ position: 'relative' }}>
          {/* Paper (tło) - logika bez zmian */}
          <Paper
            elevation={2}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
               backgroundColor: '##f4f6f8', 
              borderRadius: { xs: 2, md: '12px' },
              zIndex: 0,
              transform: inView ? 'translateX(0)' : imageOnLeft ? 'translateX(100%)' : 'translateX(-100%)',
              opacity: inView ? 1 : 0,
              transition: 'transform 0.8s ease-out, opacity 1s ease-out',
            }}
          />

          {/* Grid (treść) - logika bez zmian */}
          <Grid
            container
            spacing={4}
            alignItems="center"
            direction={imageOnLeft ? 'row' : 'row-reverse'}
            sx={{
              position: 'relative',
              zIndex: 1,
              transform: inView ? 'translateX(0)' : imageOnLeft ? 'translateX(-100%)' : 'translateX(100%)',
              opacity: inView ? 1 : 0,
              transition: 'transform 0.9s ease-out 0.3s, opacity 1s ease-out 0.3s',
            }}
          >
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ p: { xs: 2, md: 4 } }}>
                <ImageWithSkeleton
                  src={imageSrc}
                  alt={title}
                  height={450}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ p: { xs: 2, md: 4 } }}>
                <Typography
                  variant="h2"
                  component="h2"
                >
                  {title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                >
                  {children}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
