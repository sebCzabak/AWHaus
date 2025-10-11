import { Box, Typography } from '@mui/material';

export function GoogleMap() {
  return (
    <Box sx={{ height: '400px', width: '100%', position: 'relative', mt: 4 }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24016.850729344747!2d17.897915657825777!3d50.62963166949668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4711acd98f4aca2d%3A0xbb0afb321c77b3e3!2sStawowa%2014%2C%2046-060%20G%C3%B3rki!5e1!3m2!1spl!2spl!4v1760180749978!5m2!1spl!2spl" 
        width="100%"
        height="100%"
        style={{ border: 0 }}
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