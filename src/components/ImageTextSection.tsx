import { Container, Grid, CardMedia, Typography, Box } from '@mui/material';

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
        <Grid container spacing={4} alignItems="center" direction={imageLeft ? 'row' : 'row-reverse'}>
          <Grid size={{xs:12, md:6}}>
            <CardMedia
              component="img"
              image={image}
              alt={title}
              sx={{ width: '100%', borderRadius:  imageLeft ? '0px 50px 0px 50px' : '50px 0px 50px 0px', boxShadow: 3,}}
            />
          </Grid>
          <Grid size={{xs:12, md:6}}>
            <Typography variant="h2" component="h2">{title}</Typography>
            <Typography variant="body1">{text}</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}