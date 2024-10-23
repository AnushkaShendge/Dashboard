import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Importing chart.js to support chart rendering
import myAudio from './assets/my-audio-file.mp3'; // Adjust the path as necessary


function CallGraph({ id }) {
  const [callData, setCallData] = useState({});
  const [sentimentData, setSentimentData] = useState({});

  useEffect(() => {
    // Simulating API call by setting dummy data instead of fetching from backend
    // Commenting out the axios part
    /*
    async function fetchCallDetails() {
      const res = await axios.get(`http://localhost:4000/calls/${id}/insights`);
      if (res.data) {
        setCallData(res.data.callPlayback);
        setSentimentData(res.data.sentimentAnalysis);
      }
    }
    fetchCallDetails();
    */

    // Dummy data
    const dummyCallData = {
      summary: "This is a sample summary of the call. The conversation went well with the customer.",
      audioUrl: myAudio, // Replace with a real audio link
    };

    const dummySentimentData = {
      sentimentBreakdown: [
        { type: 'Positive' },
        { type: 'Neutral' },
        { type: 'Negative' },
        { type: 'Positive' },
        { type: 'Negative' },
        { type: 'Positive' },
      ],
    };

    setCallData(dummyCallData);
    setSentimentData(dummySentimentData);

  }, [id]);

  // Using the dummy sentiment data to generate the chart data
  const sentimentFlowData = {
    labels: sentimentData.sentimentBreakdown
      ? sentimentData.sentimentBreakdown.map((item, idx) => `Point ${idx + 1}`)
      : [],
    datasets: [
      {
        label: 'Sentiment Flow',
        data: sentimentData.sentimentBreakdown
          ? sentimentData.sentimentBreakdown.map(item => {
              if (item.type === 'Positive') return 0.75;
              if (item.type === 'Negative') return -0.75;
              return 0.0; // Neutral or other sentiments
            })
          : [],
        fill: false,
        borderColor: 'blue',
        tension: 0.1,
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
        <h2 className="text-xl font-semibold mb-2">Sentiment Flow Throughout the Conversation</h2>
        <Line data={sentimentFlowData} />
      </div>
    </div>
  );
}

export default CallGraph;
