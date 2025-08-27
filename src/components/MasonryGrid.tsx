import { Box, Paper, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';
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

// Komponent pomocniczy (z nowym efektem hover)
const MasonryCard = ({ item }: { item: MasonryItem }) => {
  if (item.type === 'image' && item.img) {
    return (
      <Box sx={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: 3,transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'translateY(-8px)' } }}>
        <Box sx={{ width: '100%', height: '100%' }}>
          <ImageWithSkeleton src={item.img} alt={item.title} height="100%" />
        </Box>
      </Box>
    );
  }
  return (
    <Paper elevation={2} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: '12px' }}>
      <Typography variant="h5" component="h3" gutterBottom>{item.title}</Typography>
      <Typography color="text.secondary">{item.content}</Typography>
    </Paper>
  );
};

export function MasonryGrid({ items }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Dzielimy dane na kawałki dla łatwiejszego zarządzania
  const item1 = items[0];
  const item2 = items[1];
  const item3 = items[2];
  const item4 = items[3];
  const item5 = items[4];
  const item6 = items[5];

  // Jeśli to nie jest mobile, renderujemy stary, stabilny układ desktopowy
  if (!isMobile) {
    return (
      <Grid container spacing={2}>
        <Grid size={{ xs:12, md:3}} sx={{ height: 250 }}><MasonryCard item={item1} /></Grid>
        <Grid size={{ xs:12, md:6}} sx={{ height: 250 }}><MasonryCard item={item2} /></Grid>
        <Grid size={{ xs:12, md:3}} sx={{ height: 250 }}><MasonryCard item={item3} /></Grid>
        <Grid size={{ xs:12, md:4}} sx={{ height: 250 }}><MasonryCard item={item4} /></Grid>
        <Grid size={{ xs:12, md:3}} sx={{ height: 250 }}><MasonryCard item={item5} /></Grid>
        <Grid size={{ xs:12, md:5}} sx={{ height: 250 }}><MasonryCard item={item6} /></Grid>
      </Grid>
    );
  }

  // --- NOWY, SPECJALNY UKŁAD DLA WERSJI MOBILNEJ ---
  return (
    <Grid container spacing={2}>
      {/* Wiersz 1: Duże zdjęcie, mały tekst */}
      <Grid size={{xs:7}} sx={{ height: 300 }}>
        <MasonryCard item={item2} />
      </Grid>
      <Grid size={{xs:5}} sx={{ height: 300 }}>
        <MasonryCard item={item1} />
      </Grid>

      {/* Wiersz 2: Mały tekst, duże zdjęcie */}
      <Grid size={{xs:5}} sx={{ height: 200 }}>
        <MasonryCard item={item3} />
      </Grid>
      <Grid size={{xs:7}} sx={{ height: 200 }}>
        <MasonryCard item={item4} />
      </Grid>

      {/* Wiersz 3: Duże zdjęcie, mały tekst */}
      <Grid size={{xs:7}} sx={{ height: 250 }}>
        <MasonryCard item={item6} />
      </Grid>
      <Grid size={{xs:5}} sx={{ height: 250 }}>
        <MasonryCard item={item5} />
      </Grid>
    </Grid>
  );
}