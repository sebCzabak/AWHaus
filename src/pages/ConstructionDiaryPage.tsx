import { useState } from 'react';
import { Container, Typography, Paper, ImageList, ImageListItem, ImageListItemBar, IconButton } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// Przykładowe dane - w prawdziwej aplikacji pochodziłyby z CMS lub API
const constructionImages = [
  { src: 'https://source.unsplash.com/random/1600x900?construction-site', title: 'Rozpoczęcie prac - Czerwiec 2025' },
  { src: 'https://source.unsplash.com/random/1600x900?foundation-work', title: 'Wylewanie fundamentów' },
  { src: 'https://source.unsplash.com/random/1600x900?excavator', title: 'Prace ziemne' },
  { src: 'https://source.unsplash.com/random/1600x900?building-frame', title: 'Stan surowy otwarty - Lipiec 2025' },
  { src: 'https://source.unsplash.com/random/1600x900?scaffolding', title: 'Montaż rusztowań' },
  { src: 'https://source.unsplash.com/random/1600x900?crane', title: 'Prace na wysokości' },
  { src: 'https://source.unsplash.com/random/1600x900?roofing', title: 'Konstrukcja dachu - Sierpień 2025' },
  { src: 'https://source.unsplash.com/random/1600x900?bricklayer', title: 'Prace murarskie' },
];

export function ConstructionDiaryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <title>Postęp Prac: Osiedle Symfonia w Opolu | Dziennik Budowy AWHaus</title>
      <meta
        name="description"
        content="Śledź postęp prac na budowie Osiedla Symfonia w Opolu. Zobacz aktualne zdjęcia i galerię z każdego etapu budowy Twojego nowego domu z AWHaus Deweloper."
      />
      <Container
        maxWidth="lg"
        sx={{ py: 5 }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
        >
          Dziennik Budowy
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          paragraph
        >
          Śledź z nami na bieżąco postępy prac na osiedlu [Nazwa Osiedla]. Regularnie publikujemy zdjęcia z placu
          budowy.
        </Typography>

        <Paper sx={{ p: { xs: 1, md: 2 }, mt: 4 }}>
          {/* Używamy komponentu ImageList z MUI do stworzenia siatki zdjęć */}
          <ImageList
            variant="quilted"
            cols={4}
            rowHeight={250}
          >
            {constructionImages.map((item, index) => (
              <ImageListItem
                key={item.src}
                cols={index % 5 === 0 ? 2 : 1}
                rows={index % 5 === 0 ? 2 : 1}
              >
                <img
                  src={`${item.src}&sig=${index}`} // sig=index, aby dostać różne losowe zdjęcia
                  alt={item.title}
                  loading="lazy"
                  style={{ cursor: 'pointer', objectFit: 'cover', width: '100%', height: '100%' }}
                  onClick={() => handleImageClick(index)}
                />
                <ImageListItemBar
                  title={item.title}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      onClick={() => handleImageClick(index)}
                    >
                      <ZoomInIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Paper>
      </Container>

      {/* Komponent Lightbox, który wyświetla się na pełnym ekranie */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={constructionImages}
        index={imageIndex}
        // Włączamy dodatkowe wtyczki
        plugins={[Thumbnails, Zoom]}
      />
    </>
  );
}
