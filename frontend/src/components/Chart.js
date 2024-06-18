import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';

const ChartView = ({ data }) => {
  const totalStations = data.reduce((total, d) => total + d.count, 0);

  const totalMonitoredStations = data.reduce((total, d) => {
    if (d.monitored) {
      return total + d.count;
    }
    return total;
  }, 0);

  const doughnutData = {
    labels: ['Total Stations', 'Monitored Stations'],
    datasets: [{
      data: [0, totalMonitoredStations],
      backgroundColor: ['#FF6384', '#36A2EB'],
    }],
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">State Wise Station Count</Typography>
      <Bar data={barData} />
      <Typography variant="h6">Monitored Manual & Telemetry Stations</Typography>
      <Doughnut data={doughnutData} />
      <Typography variant="body1">Total Stations: {totalStations}</Typography>
      <Typography variant="body1">Total Monitored Stations: {totalMonitoredStations}</Typography>
    </Box>
  );
};

export default ChartView;
