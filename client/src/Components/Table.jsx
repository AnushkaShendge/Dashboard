import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, TextField, Select, MenuItem, Chip
} from '@mui/material';


// Function to determine the chip color based on call type
const getStatusColor = (status) => {
  switch (status) {
    case 'Incoming':
      return { backgroundColor: '#a5d6a7', color: '#1b5e20' }; // Darker green
    case 'Missed':
      return { backgroundColor: '#ef9a9a', color: '#b71c1c' }; // Darker red
    case 'Outgoing':
      return { backgroundColor: '#90caf9', color: '#0d47a1' }; // Darker blue
    default:
      return {};
  }
};

const CallLogTable = ({ rows }) => {
  const [filters, setFilters] = useState({ callType: '', employee: '' });

  // Handle changes in the filter inputs
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Ensure rows.callLogs is an array, or default to an empty array
  const callLogs = rows && rows.callLogs ? rows.callLogs : [];

  // Map over the `callLogs` and filter based on filters
  const filteredRows = callLogs.filter(row => (
    (!filters.callType || row.callType === filters.callType) &&
    (!filters.employee || row.employeeName.toLowerCase().includes(filters.employee.toLowerCase()))
  ));

  return (
    <div className='w-full p-4'>
      {/* Filter Section */}
      <div className="mb-4 flex gap-4">
        <TextField
          label="Employee Name"
          name="employee"
          value={filters.employee}
          onChange={handleFilterChange}
          variant="outlined"
        />
        <Select
          label="Call Type"
          name="callType"
          value={filters.callType}
          onChange={handleFilterChange}
          variant="outlined"
          displayEmpty
        >
          <MenuItem value="">All Types</MenuItem>
          <MenuItem value="Incoming">Incoming</MenuItem>
          <MenuItem value="Outgoing">Outgoing</MenuItem>
          <MenuItem value="Missed">Missed</MenuItem>
        </Select>
      </div>

      <TableContainer component={Paper} sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>Call Logs</Typography>
        <Table aria-label="call log table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Employee Name</strong></TableCell>
              <TableCell><strong>Call Type</strong></TableCell>
              <TableCell><strong>Duration</strong></TableCell>
              <TableCell><strong>Timestamp</strong></TableCell>
              <TableCell><strong>Sentiment Score</strong></TableCell>
              <TableCell><strong>Playback</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row, index) => (
                <TableRow key={index} hover>
                  <TableCell>{row.employeeName}</TableCell>
                  <TableCell>
                    <Chip 
                      label={row.callType} 
                      sx={{
                        ...getStatusColor(row.callType),
                        padding: '5px 10px',
                        borderRadius: '10px',
                        color: getStatusColor(row.callType).color 
                      }} 
                      className='font-semibold'
                    />
                  </TableCell>
                  <TableCell>{row.duration}</TableCell>
                  <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{row.sentimentScore >= 0.8 ? 'Positive' : row.sentimentScore >= 0.5 ? 'Neutral' : 'Negative'}</TableCell>
                  <TableCell>
                    <Button 
                      variant="text" 
                      sx={{ color: '#2979ff' }} 
                      onClick={() => window.open(row.playbackUrl, '_blank')}
                    >
                      Play
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No call logs available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CallLogTable;
