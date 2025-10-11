import React, { useMemo } from 'react';
import { Paper, Grid, Box, Typography, Button, Stack, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { Investment } from '../data/investments';

import investmentLogo from '../assets/logo-inwestycji.png';

// Ikony
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { ImageWithShapedCutout } from './ImageWithShapedCutout ';

interface Props {
  investment: Investment;
}

const Stat = ({ icon, value, label }: { icon: React.ReactNode; value: string | number; label: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '150px' }}>
    {icon}
    <Box ml={1.5}>
      <Typography
        variant="body1"
        sx={{ fontWeight: 'bold' }}
      >
        {value}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ textTransform: 'uppercase' }}
      >
        {label}
      </Typography>
    </Box>
  </Box>
);

export function InvestmentListItem({ investment }: Props) {
  // Obliczamy statystyki na podstawie danych mieszkań
  const stats = useMemo(() => {
    if (!investment.apartments || investment.apartments.length === 0) {
      return { count: 0, minArea: 0, maxArea: 0, minPrice: 'Brak danych' };
    }
    const areas = investment.apartments.map((apt) => apt.area);

    // Filtrujemy, aby upewnić się, że mieszkanie ma poprawną cenę
    const validPricedApartments = investment.apartments.filter(
      (apt) => typeof apt.price === 'string' && apt.price.length > 0
    );

    if (validPricedApartments.length === 0) {
      return {
        count: investment.apartments.length,
        minArea: Math.min(...areas),
        maxArea: Math.max(...areas),
        minPrice: 'Brak danych',
      };
    }

    const prices = validPricedApartments.map((apt) => parseFloat(apt.price.replace(/[^\d.-]/g, '')));
    

    return {
      count: investment.apartments.length,
      minArea: Math.min(...areas),
      maxArea: Math.max(...areas),
      minPrice: Math.min(...prices).toLocaleString('pl-PL'),
    };
  }, [investment.apartments]);

  return (
    <Paper
      elevation={3}
      sx={{ borderRadius: '12px' }}
    >
      <Grid container>
        {/* --- LEWA KOLUMNA: Duże zdjęcie z wycięciem (teraz szersza) --- */}
        <Grid size={{ xs: 12, md: 7 }}>
          <ImageWithShapedCutout
            imageSrc={investment.mainImage}
            logoSrc={investmentLogo}
            alt={investment.name}
            height={350} // Możesz dostosować wysokość całego bloku obrazka
          />
        </Grid>

        {/* --- PRAWA KOLUMNA: Informacje (teraz węższa i bardziej zwarta) --- */}
        <Grid
          size={{
            xs: 12,
            md: 5,
          }}
        >
          <Stack sx={{ height: '100%', p: 3 }}>
            <Box>
              <Typography
                variant="h4"
                component="h2"
                sx={{ fontWeight: 'bold' }}
              >
                {investment.name}
              </Typography>
              <Typography color="text.secondary">{investment.location}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Statystyki w nowym układzie 2x2 */}
            <Grid
              container
              spacing={2}
              sx={{ my: 1 }}
            >
              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <Stat
                  icon={<HomeWorkOutlinedIcon color="primary" />}
                  value={stats.count}
                  label="Apartamentów"
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <Stat
                  icon={<SquareFootOutlinedIcon color="primary" />}
                  value={`${stats.minArea}-${stats.maxArea}m²`}
                  label="Metraż"
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <Stat
                  icon={<MonetizationOnOutlinedIcon color="primary" />}
                  label="Cena od"
                  value={`${stats.minPrice} zł`}
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <Stat
                  icon={<CheckCircleOutlineOutlinedIcon color="primary" />}
                  label="Status"
                  value={`W BUDOWIE`}
                />
              </Grid>
            </Grid>

            <Box sx={{ flexGrow: 1 }} />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <Button
                component={RouterLink}
                to={`/oferta/${investment.id}`}
                variant="contained"
              >
                Zobacz inwestycję
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
