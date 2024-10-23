// src/components/CallPieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CallPieChart = ({ incomingCalls, outgoingCalls, missedCalls }) => {
  const data = {
    labels: ['Incoming', 'Outgoing', 'Missed'],
    datasets: [
      {
        label: 'Call Distribution',
        data: [incomingCalls, outgoingCalls, missedCalls],
        backgroundColor: ['#4CAF50', '#2196F3', '#F44336'], // Green, Blue, Red
        borderColor: ['#388E3C', '#1976D2', '#D32F2F'], // Dark Green, Dark Blue, Dark Red
        borderWidth: 2,
        hoverBackgroundColor: ['#66BB6A', '#42A5F5', '#EF5350'], // Lighter Green, Lighter Blue, Lighter Red
        hoverBorderColor: ['#2E7D32', '#0D47A1', '#B71C1C'], // Even Darker Green, Darker Blue, Darker Red

      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const total = dataset.data.reduce((sum, value) => sum + value, 0);
            const currentValue = dataset.data[tooltipItem.dataIndex];
            const percentage = ((currentValue / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${currentValue} (${percentage}%`;
          },
        },
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 10,
        bottom: 10,
      },
    },
  };

  return (
    <div className="w-full h-64 p-4 bg-white rounded-lg shadow-lg">
      <Pie data={data} options={options} />
    </div>
  );
};

export default CallPieChart;
