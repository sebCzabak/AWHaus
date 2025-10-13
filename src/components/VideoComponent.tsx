import { Box } from '@mui/material';

function VideoComponent() {
  return (
    <Box
      sx={{
        position: 'relative',
        paddingBottom: '56.25%' /* Proporcje 16:9 */,
        height: 0,
        overflow: 'hidden',
        borderRadius: '12px',
        boxShadow: 5,
      }}
    >
      <iframe
        src="https://www.youtube.com/embed/xyykqsI5JU0" // <-- Wklej tutaj link z YouTube
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0,
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Wizualizacja Inwestycji"
      ></iframe>
    </Box>
  );
}

export default VideoComponent;
