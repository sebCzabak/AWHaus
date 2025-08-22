import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Box } from '@mui/material';

interface Props {
  children: React.ReactElement;
  direction?: 'left' | 'right' | 'up';
  delay?: number;
}

export function FadeInOnScroll({ children, direction = 'up', delay = 0 }: Props) {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animacja uruchomi się tylko raz
    threshold: 0.3, // Uruchom, gdy 20% elementu jest widoczne
  });

  const getTransform = () => {
    if (direction === 'left') return 'translateX(-50px)';
    if (direction === 'right') return 'translateX(50px)';
    return 'translateY(50px)';
  };

  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : getTransform(),
        transition: `opacity 0.7s ease-out, transform 0.5s ease-out`,
        transitionDelay: `${delay}ms`,
        // Dodajemy większy odstęp między sekcjami
        my: { xs: 4, md: 8 },
      }}
    >
      {children}
    </Box>
  );
}
