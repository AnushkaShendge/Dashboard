import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function CallGraph({ id }) {
  const [callData, setCallData] = useState({});
  const [sentimentData, setSentimentData] = useState({});

  useEffect(() => {
    async function fetchCallDetails() {
      const res = await axios.get(`http://localhost:4000/calls/${id}/insights`);
      if (res.data) {
        setCallData(res.data.callPlayback);
        setSentimentData(res.data.sentimentAnalysis);
      }
    }

    fetchCallDetails();
  }, [id]);

  // Calculate sentiment counts dynamically
  const sentimentCounts = {
    Positive: sentimentData.sentimentBreakdown
      ? sentimentData.sentimentBreakdown.filter(item => item.type === 'Positive').length
      : 0,
    Negative: sentimentData.sentimentBreakdown
      ? sentimentData.sentimentBreakdown.filter(item => item.type === 'Negative').length
      : 0,
    Neutral: sentimentData.sentimentBreakdown
      ? sentimentData.sentimentBreakdown.filter(item => item.type === 'Neutral').length
      : 0, // Assuming neutral is part of the data
  };

  // Update pie chart data dynamically based on sentiment counts
  const pieData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Sentiment Distribution',
        data: [sentimentCounts.Positive, sentimentCounts.Negative, sentimentCounts.Neutral],
        backgroundColor: ['#4caf50', '#f44336', '#ffeb3b'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Call Summary</h2>
        <p>{callData.summary}</p>
        <audio controls src={callData.audioUrl} className="mt-4">
          Your browser does not support the audio element.
        </audio>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Sentiment Breakdown</h2>
        {sentimentData.sentimentBreakdown && sentimentData.sentimentBreakdown.map((item, index) => (
          <div key={index}>
            <strong>{item.type} Sentiment:</strong>
            <ul>
              {item.timestamps.map((time, i) => (
                <li key={i}>{time}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Sentiment Distribution</h2>
        <Pie data={pieData} />
      </div>
    </div>
  );
}

export default CallGraph;
