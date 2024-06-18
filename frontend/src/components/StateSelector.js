import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const StateSelector = ({ states, selectedState, onStateChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="state-selector-label">Select State</InputLabel>
      <Select
        labelId="state-selector-label"
        value={selectedState}
        onChange={e => onStateChange(e.target.value)}
      >
        {states.map((state, index) => (
          <MenuItem key={index} value={state}>{state}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StateSelector;
