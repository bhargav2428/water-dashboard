
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartView = ({ stateCounts }) => {
  const [chartData, setChartData] = useState({
    barData: {
      labels: [],
      datasets: [{
        label: 'State Wise Station Count',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }],
    },
    doughnutData: {
      labels: ['Monitored Manual', 'Telemetry Stations'],
      datasets: [{
        data: [300, 50],
        backgroundColor: ['#FF6384', '#36A2EB'],
      }],
    }
  });

  const [totalStations, setTotalStations] = useState(0);

  useEffect(() => {
    if (stateCounts.length > 0) {
      const labels = stateCounts.map(item => item.state_name);
      const counts = stateCounts.map(item => item.count);

      const total = counts.reduce((acc, curr) => acc + curr, 0);
      setTotalStations(total);

      setChartData(prevState => ({
        ...prevState,
        barData: {
          ...prevState.barData,
          labels: labels,
          datasets: [{
            ...prevState.barData.datasets[0],
            data: counts,
          }],
        },
      }));
    }
  }, [stateCounts]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Total Stations: {totalStations}</Typography>
      <Typography variant="h6">State Wise Station Count</Typography>
      <Bar
        data={chartData.barData}
        options={{
          scales: {
            x: {
              title: {
                display: true,
                text: 'States',
                color: '#333',
                font: {
                  weight: 'bold',
                  size: 16,
                },
              },
              ticks: {
                color: '#333',
                font: {
                  weight: 'bold',
                  size: 9, 
                },
              },
            },
            y: {
              title: {
                display: true,
                text: 'Count',
                color: '#333',
                font: {
                  weight: 'bold',
                  size: 16,
                },
              },
              ticks: {
                color: '#333',
                font: {
                  size: 12,
                },
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: '#333',
                font: {
                  size: 12,
                },
              },
            },
          },
        }}
      />
      <Typography variant="h6">Monitored Manual & Telemetry Stations</Typography>
      <Doughnut
        data={chartData.doughnutData}
        options={{
          aspectRatio: 5,
          plugins: {
            legend: {
              display: true,
              position: 'right',
              labels: {
                color: '#333',
                font: {
                  size: 12,
                },
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default ChartView;
