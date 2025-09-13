import  { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
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
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
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
              <Grid size={{xs:12, md:7}}>
                {item.img && <img src={item.img} alt={item.title} style={{ width: '100%', height: 'auto', display: 'block' }} />}
              </Grid>
               <Grid size={{xs:12, md:5}}>
                <Box sx={{ p: { xs: 3, md: 5 } }}>
                  <Typography variant="h3" component="h2" gutterBottom>{item.title}</Typography>
                  <Typography sx={{ mt: 2 }} color="text.secondary">{item.content}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </motion.div>
      <IconButton onClick={onClose} sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1201 }}>
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

  // Dzielimy dane dla łatwiejszego zarządzania układem
  const [item1, item2, item3, item4, item5, item6] = items;

  const gridLayout = (mobile = false) => (
    <Grid container spacing={2}>
      {items.map((item, index) => (
        <Grid
          key={item.title}
          size={{
            xs: mobile ? (index % 3 === 1 ? 7 : 5) : undefined,
            md: mobile ? undefined : (
              index === 0 || index === 2 ? 3 :
              index === 1 || index === 5 ? 6 :
              index === 3 ? 4 : 2
            ),
          }}
          sx={{ height: mobile ? (index < 2 ? 300 : index < 4 ? 200 : 250) : 250 }}
        >
          <motion.div
            layoutId={`card-${item.title}`}
            onClick={() => setSelectedItem(item)}
            whileHover={{ y: -8 }}
            style={{ width: '100%', height: '100%', cursor: 'pointer' }}
          >
            {item.type === 'image' && item.img ? (
              <Box sx={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: 3 }}>
                <ImageWithSkeleton src={item.img} alt={item.title} height="100%" />
              </Box>
            ) : (
              <Paper elevation={2} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: '12px' }}>
                <Typography variant="h5" component="h3" gutterBottom>{item.title}</Typography>
                <Typography color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                  {item.content}
                </Typography>
              </Paper>
            )}
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box>
      {isMobile ? gridLayout(true) : gridLayout(false)}
      
      <AnimatePresence>
        {selectedItem && <ExpandedView item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>
    </Box>
  );
}