import { useState } from 'react';
import { Box, Paper, Typography, Grid, useTheme, useMediaQuery, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithSkeleton } from './ImageWithSkeleton';

export interface MasonryItem {
  type: 'image' | 'text';
  img?: string;
  title: string;
  content?: string;
}

interface Props {
  items: MasonryItem[];
}

// Komponent dla widoku rozwiniętego, który pojawia się na wierzchu
function ExpandedView({ item, onClose }: { item: MasonryItem; onClose: () => void }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    // Półprzezroczyste tło
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      {/* Właściwy, animowany kontener */}
      <motion.div
        layoutId={`card-${item.title}`}
        style={{
          width: 'clamp(300px, 90vw, 1100px)',
          height: isMobile ? '80vh' : 'auto',
        }}
      >
        <Paper
          elevation={12}
          sx={{ borderRadius: '16px', overflow: 'hidden', height: '100%' }}
          onClick={(e) => e.stopPropagation()} // Zapobiega zamykaniu po kliknięciu w treść
        >
          <Box sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <Grid container>
              <Grid size={{ xs: 12, md: 7 }}>
                {item.img && (
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                )}
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Box sx={{ p: { xs: 3, md: 5 } }}>
                  <Typography
                    variant="h3"
                    component="h2"
                    gutterBottom
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{ mt: 2 }}
                    color="text.secondary"
                  >
                    {item.content}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </motion.div>
      <IconButton
        onClick={onClose}
        sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1201 }}
      >
        <CloseIcon />
      </IconButton>
    </motion.div>
  );
}

// Główny komponent siatki
export function MasonryGrid({ items }: Props) {
  const [selectedItem, setSelectedItem] = useState<MasonryItem | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const gridLayout = (mobile = false) => {
    if (mobile) {
      // Mobile: naprzemienny układ text-picture, picture-text
      // Grupujemy elementy w pary
      const pairs: Array<[MasonryItem | null, MasonryItem | null]> = [];
      for (let i = 0; i < items.length; i += 2) {
        pairs.push([items[i] || null, items[i + 1] || null]);
      }

      return (
        <Grid
          container
          spacing={2}
          sx={{ width: '100%' }}
        >
          {pairs.map((pair, pairIndex) => {
            const [first, second] = pair;
            const isEvenRow = pairIndex % 2 === 0; // Parzyste rzędy: text-picture, nieparzyste: picture-text

            // Określamy kolejność elementów w rzędzie
            let leftItem: MasonryItem | null = null;
            let rightItem: MasonryItem | null = null;

            if (isEvenRow) {
              // Parzyste rzędy: text | picture
              if (first?.type === 'text') {
                leftItem = first;
                rightItem = second;
              } else if (second?.type === 'text') {
                leftItem = second;
                rightItem = first;
              } else {
                // Jeśli nie ma text, zostawiamy oryginalną kolejność
                leftItem = first;
                rightItem = second;
              }
            } else {
              // Nieparzyste rzędy: picture | text
              if (first?.type === 'image') {
                leftItem = first;
                rightItem = second;
              } else if (second?.type === 'image') {
                leftItem = second;
                rightItem = first;
              } else {
                // Jeśli nie ma image, zostawiamy oryginalną kolejność
                leftItem = first;
                rightItem = second;
              }
            }

            return (
              <Grid
                container
                key={`pair-${pairIndex}`}
                spacing={2}
                sx={{ width: '100%', mb: 2 }}
              >
                {leftItem && (
                  <Grid
                    size={{ xs: 6 }}
                    sx={{ height: 200 }}
                  >
                    <motion.div
                      layoutId={`card-${leftItem.title}`}
                      onClick={() => setSelectedItem(leftItem)}
                      whileHover={{ y: -8 }}
                      style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                    >
                      {leftItem.type === 'image' && leftItem.img ? (
                        <Box
                          sx={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid #e0e0e0',
                          }}
                        >
                          <ImageWithSkeleton
                            src={leftItem.img}
                            alt={leftItem.title}
                            height="100%"
                          />
                        </Box>
                      ) : (
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0',
                            transition: 'border-color 0.3s ease',
                            '&:hover': {
                              borderColor: 'primary.main',
                            },
                          }}
                        >
                          <Typography
                            variant="h6"
                            component="h3"
                            gutterBottom
                            sx={{ fontWeight: 600, color: '#212121' }}
                          >
                            {leftItem.title}
                          </Typography>
                          <Typography
                            color="text.secondary"
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              color: '#757575',
                              fontSize: '0.9rem',
                            }}
                          >
                            {leftItem.content}
                          </Typography>
                        </Paper>
                      )}
                    </motion.div>
                  </Grid>
                )}
                {rightItem && (
                  <Grid
                    size={{ xs: 6 }}
                    sx={{ height: 200 }}
                  >
                    <motion.div
                      layoutId={`card-${rightItem.title}`}
                      onClick={() => setSelectedItem(rightItem)}
                      whileHover={{ y: -8 }}
                      style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                    >
                      {rightItem.type === 'image' && rightItem.img ? (
                        <Box
                          sx={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid #e0e0e0',
                          }}
                        >
                          <ImageWithSkeleton
                            src={rightItem.img}
                            alt={rightItem.title}
                            height="100%"
                          />
                        </Box>
                      ) : (
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0',
                            transition: 'border-color 0.3s ease',
                            '&:hover': {
                              borderColor: 'primary.main',
                            },
                          }}
                        >
                          <Typography
                            variant="h6"
                            component="h3"
                            gutterBottom
                            sx={{ fontWeight: 600, color: '#212121' }}
                          >
                            {rightItem.title}
                          </Typography>
                          <Typography
                            color="text.secondary"
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              color: '#757575',
                              fontSize: '0.9rem',
                            }}
                          >
                            {rightItem.content}
                          </Typography>
                        </Paper>
                      )}
                    </motion.div>
                  </Grid>
                )}
              </Grid>
            );
          })}
        </Grid>
      );
    }

    // Desktop layout
    return (
      <Grid
        container
        spacing={2}
        sx={{ width: '100%' }}
      >
        {items.map((item, index) => {
          // Desktop: układ masonry dla 9 elementów - różne rozmiary dla wizualnego zainteresowania
          // Ostatnia para (index 7 i 8) zajmuje całą szerokość (6+6=12)
          let gridSize;
          const isLastPair = index === items.length - 2 || index === items.length - 1;

          if (isLastPair) {
            // Ostatnia para - każdy element po 6 kolumn (cała szerokość)
            gridSize = 6;
          } else if (index === 0) gridSize = 4; // tekst
          else if (index === 1) gridSize = 5; // obraz większy
          else if (index === 2) gridSize = 3; // tekst mniejszy
          else if (index === 3) gridSize = 4; // tekst
          else if (index === 4) gridSize = 4; // obraz
          else if (index === 5) gridSize = 4; // tekst
          else if (index === 6) gridSize = 4; // tekst
          else gridSize = 4; // domyślnie

          return (
            <Grid
              key={item.title}
              size={{ md: gridSize }}
              sx={{ height: 280 }}
            >
              <motion.div
                layoutId={`card-${item.title}`}
                onClick={() => setSelectedItem(item)}
                whileHover={{ y: -8 }}
                style={{ width: '100%', height: '100%', cursor: 'pointer' }}
              >
                {item.type === 'image' && item.img ? (
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid #e0e0e0',
                    }}
                  >
                    <ImageWithSkeleton
                      src={item.img}
                      alt={item.title}
                      height="100%"
                    />
                  </Box>
                ) : (
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0',
                      transition: 'border-color 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 600, color: '#212121' }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        color: '#757575',
                      }}
                    >
                      {item.content}
                    </Typography>
                  </Paper>
                )}
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      {isMobile ? gridLayout(true) : gridLayout(false)}

      <AnimatePresence>
        {selectedItem && (
          <ExpandedView
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </Box>
  );
}
