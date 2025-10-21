import  { useState, useEffect, useMemo } from 'react';
import { Box, Modal, IconButton, CircularProgress, useTheme, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HTMLFlipBook from 'react-pageflip';
import { storage } from '../data/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

const FlipBook: any = HTMLFlipBook;

interface Props {
  open: boolean;
  onClose: () => void;
}

const PAGE_WIDTH = 1024;
const PAGE_HEIGHT = 725;
const PAGE_ASPECT_RATIO = PAGE_WIDTH / PAGE_HEIGHT;
const SPREAD_ASPECT_RATIO = (PAGE_WIDTH * 2) / PAGE_HEIGHT;

export function CatalogFlipbook({ open, onClose }: Props) {
  const [pageUrls, setPageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const dimensions = useMemo(() => {
    const vh = window.innerHeight * 0.9;
    const vw = window.innerWidth * 0.9;

    if (isMobile) {
      const ratio = PAGE_ASPECT_RATIO;
      let width = vw;
      let height = width / ratio;

      if (height > vh) {
        height = vh;
        width = height * ratio;
      }
      return { width, height };
    } else {
      const ratio = SPREAD_ASPECT_RATIO;
      let width = vw;
      let height = width / ratio;

      if (height > vh) {
        height = vh;
        width = height * ratio;
      }
      return { width, height };
    }
  }, [isMobile, open]);

  useEffect(() => {
    if (open && pageUrls.length === 0) {
      setLoading(true);
      const fetchPages = async () => {
        try {
          const listRef = ref(storage, 'katalog');
          const response = await listAll(listRef);
          
          const urls = await Promise.all(
            response.items.map(itemRef => getDownloadURL(itemRef))
          );
          
          urls.sort(); 
          setPageUrls(urls);
        } catch (error) {
          console.error("Błąd podczas pobierania stron katalogu:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPages();
    }
  }, [open, pageUrls.length]);

  return (
    // --- POCZĄTEK ZMIANY ---
    // Używamy Flexboxa na Modalu, aby wycentrować zawartość
    <Modal 
      open={open} 
      onClose={onClose} 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      {/* Ten Box jest teraz dzieckiem Flexboxa i będzie idealnie wyśrodkowany */}
      <Box sx={{ 
        width: dimensions.width,
        height: dimensions.height, 
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', // Pozycja dla przycisku zamknięcia
      }}>
        <IconButton
          onClick={onClose}
          sx={{ 
            position: 'absolute', 
            top: -40, // Przycisk nad katalogiem
            right: 0, 
            zIndex: 10, 
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
        
        {loading ? (
          <Box sx={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', bgcolor: 'white', borderRadius: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <FlipBook
            width={isMobile ? dimensions.width : dimensions.width / 2} 
            height={dimensions.height} 
            key={`${dimensions.width}x${dimensions.height}`}
            style={{ boxShadow: '0 0 20px rgba(0,0,0,0.3)' }}
            showCover={true}
            mobileScrollSupport={true}
          >
            {pageUrls.map((url, index) => (
              <Box key={index} sx={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
                <img 
                  src={url} 
                  alt={`Strona ${index + 1}`} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain'
                  }} 
                />
              </Box>
            ))}
          </FlipBook>
        )}
      </Box>
    </Modal>
  );
}