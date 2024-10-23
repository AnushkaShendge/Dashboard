import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const CallDetails = ({ callId }) => {
  const [callDetails, setCallDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchCallDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/call/${callId}`);
        setCallDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching call details');
        setLoading(false);
      }
    };

    fetchCallDetails();
  }, [callId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="call-details-container">
      {callDetails ? (
        <div className="call-details-box">
          <h2 className="call-title">Call Details</h2>
          <p><strong>Employee:</strong> {callDetails.employee}</p>
          <p><strong>Call Type:</strong> {callDetails.callType}</p>
          <p><strong>Duration:</strong> {callDetails.duration}</p>
          <p><strong>Timestamp:</strong> {callDetails.timestamp}</p>
          <p><strong>Sentiment Score:</strong> {callDetails.sentimentScore}</p>
          <p><strong>Summary:</strong> {callDetails.summary}</p>

          <h3 className="audio-title">Call Recording</h3>
          <audio
            ref={audioRef}
            src={`http://localhost:4000${callDetails.audioFile}`}
            controls
            className="audio-player"
          />
        </div>
      ) : (
        <div>No details available</div>
      )}
    </div>
  );
};

export default CallDetails;
