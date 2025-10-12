import { Box, Typography } from '@mui/material';

export function GoogleMap() {
  return (
    <Box sx={{ height: '800px', width: '100%', position: 'relative', mt: 4 }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.3959611700952!2d17.929762576835987!3d50.59376647703419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4711ab9310e34c19%3A0xfe186df706e839d8!2sGREL!5e1!3m2!1spl!2spl!4v1760277305280!5m2!1spl!2spl"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          p: 3,
          borderRadius: 2,
          boxShadow: 5,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6">Nasze Biuro</Typography>
        <Typography>ul. PLAC WOLNOŚCI 6, 45-018 OPOLE
</Typography>
      </Box>
    </Box>
  );
}