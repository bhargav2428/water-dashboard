import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const StationDetails = ({ station }) => {
  return (
    <Paper>
      <Box padding={2}>
        <Typography variant="h6">Station Details</Typography>
        <Typography><strong>Name:</strong> {station.name}</Typography>
        <Typography><strong>Type:</strong> {station.type}</Typography>
        <Typography><strong>State:</strong> {station.state}</Typography>
        <Typography><strong>Latitude:</strong> {station.latitude}</Typography>
        <Typography><strong>Longitude:</strong> {station.longitude}</Typography>
      </Box>
    </Paper>
  );
};

export default StationDetails;
