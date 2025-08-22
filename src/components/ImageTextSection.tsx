import { Container, Grid, Typography, Box } from '@mui/material';
import { ImageWithOffsetBg } from './ImageWithOffsetBg';

interface ImageTextSectionProps {
  image: string;
  title: string;
  text: string;
  imageLeft?: boolean;
}

export function ImageTextSection({ image, title, text, imageLeft = false }: ImageTextSectionProps) {
  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <Grid
          container
          spacing={4}
          alignItems="center"
          direction={imageLeft ? 'row' : 'row-reverse'}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <ImageWithOffsetBg
              src={image}
              alt={title}
              offsetDirection='bottom-right'
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h2"
              component="h2"
            >
              {title}
            </Typography>
            <Typography variant="body1">{text}</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
