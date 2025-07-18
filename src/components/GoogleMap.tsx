import { Box, Typography } from '@mui/material';

export function GoogleMap() {
  return (
    <Box sx={{ height: '400px', width: '100%', position: 'relative', mt: 4 }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.918990476483!2d16.82023267711472!3d52.23098597198758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47045b348043652d%3A0xf672f3d3c8c7d666!2sRynek%2C%2064-000%20Ko%C5%9Bcian!5e0!3m2!1spl!2spl!4v1721322040685!5m2!1spl!2spl"
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
        <Typography>Rynek 1, 64-000 Kościan</Typography>
      </Box>
    </Box>
  );
}