import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, Typography, RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';
import MapView from './MapView';

const Sidebar = ({ filters, setFilters }) => {
  const [districts, setDistricts] = useState([]);
  const [geojsonData, setGeojsonData] = useState(null);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    if (name === 'unitType') {
      setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    } else if (name === 'state') {
      setFilters((prevFilters) => ({ ...prevFilters, [name]: value, district: '' }));
      const { districts, geoData } = await fetchDistrictsAndGeoData(value);
      setDistricts(districts);
      setGeojsonData(geoData);
    } else {
      setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const updatedDateRange = [...filters.dateRange];
    if (name === 'startDate') {
      updatedDateRange[0] = value;
    } else {
      updatedDateRange[1] = value;
    }
    setFilters({ ...filters, dateRange: updatedDateRange });
  };

  useEffect(() => {
    if (filters.state) {
      fetchDistrictsAndGeoData(filters.state).then(({ districts, geoData }) => {
        setDistricts(districts);
        setGeojsonData(geoData);
      });
    }
  }, [filters.state]);

  const fetchDistrictsAndGeoData = async (selectedState) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/geodata/?state=${selectedState}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const districts = Array.from(new Set(data.map((item) => item.station_name)));
      const geoData = {
        type: 'FeatureCollection',
        features: data.map((item) => ({
          type: 'Feature',
          geometry: item.geometry,
          properties: {
            station_name: item.station_name,
            lat: item.lat,
            long: item.long
          }
        }))
      }; 
      return { districts, geoData };
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return { districts: [], geoData: null };
    }
  };

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
  ];

  const basemapOptions = [
    'Basemap Option 1',
    'Basemap Option 2',
    'Basemap Option 3',
  
  ];

  const layerListAttributes = [
    'State Boundary',
    'Ground Water Level Station',
    'District Boundary',
    
  ];

  return (
    <Box sx={{ padding: 2, width: 200, backgroundColor: '#fff', color: '#333' }}>
      <Typography variant="h6">Unitwise Selection</Typography>
      <FormControl component="fieldset" fullWidth margin="normal">
        <RadioGroup row name="unitType" value={filters.unitType} onChange={handleInputChange}>
          <FormControlLabel value="State" control={<Radio />} label="State" />
          <FormControlLabel value="Basin" control={<Radio />} label="Basin" />
        </RadioGroup>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Source</InputLabel>
        <Select name="source" value={filters.source} onChange={handleInputChange}>
          <MenuItem value="CGWB">CGWB</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>State</InputLabel>
        <Select name="state" value={filters.state} onChange={handleInputChange}>
          <MenuItem value="">Select</MenuItem>
          {states.map((state, index) => (
            <MenuItem key={index} value={state}>{state}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>District</InputLabel>
        <Select name="district" value={filters.district || ''} onChange={handleInputChange}>
          <MenuItem value="">Select</MenuItem>
          {districts.map((district, index) => (
            <MenuItem key={index} value={district}>{district}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Timestep</InputLabel>
        <Select name="timestep" value={filters.timestep || ''} onChange={handleInputChange}>
          <MenuItem value="">Select</MenuItem>
          <MenuItem value="Monthly">Monthly</MenuItem>
          <MenuItem value="Yearly">Yearly</MenuItem>
        </Select>
      </FormControl>
      <Box display="flex" justifyContent="space-between">
        <TextField
          margin="normal"
          type="month"
          label="Start Date"
          name="startDate"
          value={filters.dateRange[0]}
          onChange={handleDateChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="normal"
          type="month"
          label="End Date"
          name="endDate"
          value={filters.dateRange[1]}
          onChange={handleDateChange}
          InputLabelProps={{ shrink: true }}
        />
      </Box>
      <FormControl fullWidth margin="normal">
        <InputLabel>Station Type</InputLabel>
        <Select name="stationType" value={filters.stationType} onChange={handleInputChange}>
          <MenuItem value="All">All</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
        Data / Report Download
      </Button>
      <FormControl fullWidth margin="normal">
        <InputLabel>Basemap Gallery</InputLabel>
        <Select name="basemap" value="" onChange={handleInputChange}>
          <MenuItem value="">Select</MenuItem>
          {basemapOptions.map((option, index) => (
            <MenuItem key={index} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Layer List</InputLabel>
        <Select name="layer" value="" onChange={handleInputChange}>
          <MenuItem value="">Select</MenuItem>
          {layerListAttributes.map((attribute, index) => (
            <MenuItem key={index} value={attribute}>{attribute}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {geojsonData && <MapView geojsonData={geojsonData} />}
    </Box>
  );
};

export default Sidebar;
