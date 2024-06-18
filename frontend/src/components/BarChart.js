import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const BarChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (data && data.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      const states = [...new Set(data.map(station => station.state))];
      const stationCounts = states.map(state => data.filter(station => station.state === state).length);

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: states,
          datasets: [{
            label: 'Water Stations',
            data: stationCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'category',
              labels: states
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;
