import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Props {
  images: string[];
}

export function CustomImageCarousel({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <Box sx={{ height: 400, position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
      {/* Przyciski nawigacyjne */}
      <IconButton
        onClick={goToPrevious}
        sx={{ position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)', color: 'white', backgroundColor: 'rgba(0,0,0,0.4)', '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' } }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        onClick={goToNext}
        sx={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', color: 'white', backgroundColor: 'rgba(0,0,0,0.4)', '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' } }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
      
      {/* Kontener na obrazek z efektem przejścia */}
      <Box
        component="div"
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: 2,
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.5s ease-in-out',
        }}
      />

      {/* Kropki wskazujące aktualny slajd */}
      <Box sx={{ display: 'flex', justifyContent: 'center', position: 'absolute', bottom: 16, width: '100%' }}>
        {images.map((_, slideIndex) => (
          <Box
            key={slideIndex}
            onClick={() => setCurrentIndex(slideIndex)}
            sx={{
              height: 12,
              width: 12,
              borderRadius: '50%',
              backgroundColor: currentIndex === slideIndex ? 'primary.main' : 'rgba(255,255,255,0.7)',
              mx: 1,
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}