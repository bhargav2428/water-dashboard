

import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import Sidebar from './Sidebar';
import MapView from './MapView';
import ChartView from './ChartView';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    source: '',
    state: '',
    dateRange: '',
    stationType: '',
  });

  const [stateCounts, setStateCounts] = useState([]);
  const [totalStationCount, setTotalStationCount] = useState(0);
  const [geojsonData, setGeojsonData] = useState([]);
  const [filteredGeojsonData, setFilteredGeojsonData] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/geodata/`)
      .then(response => response.json())
      .then(data => {
        setGeojsonData(data);

        const countsMap = new Map();
        data.forEach(station => {
          const stateName = station.state_name;
          if (countsMap.has(stateName)) {
            countsMap.set(stateName, countsMap.get(stateName) + 1);
          } else {
            countsMap.set(stateName, 1);
          }
        });

        const countsArray = Array.from(countsMap, ([state_name, count]) => ({ state_name, count }));
        setStateCounts(countsArray);

        setTotalStationCount(data.length); 
      })
      .catch(error => console.error('Error fetching state counts:', error));
  }, []);

  useEffect(() => {
    const filteredData = geojsonData.filter(station => station.state_name === filters.state);
    setFilteredGeojsonData(filteredData);
  }, [filters, geojsonData]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Sidebar filters={filters} setFilters={setFilters} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MapView geojsonData={filteredGeojsonData} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <ChartView stateCounts={stateCounts} totalStationCount={totalStationCount} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
