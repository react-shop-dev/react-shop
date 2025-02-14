import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        placeContent: 'center',
        flex: 1,
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Home page
      </Typography>
    </Box>
  );
}
