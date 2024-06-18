import React from 'react';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';

const LayersControl = () => {
  const [checked, setChecked] = React.useState({
    stations: true,
  });

  const handleChange = (event) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };

  return (
    <Box>
      <Typography variant="h6">Layer Control</Typography>
      <FormControlLabel
        control={<Switch checked={checked.stations} onChange={handleChange} name="stations" />}
        label="Water Stations"
      />
    </Box>
  );
};

export default LayersControl;
