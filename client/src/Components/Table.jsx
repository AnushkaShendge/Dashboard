import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, TextField, Select, MenuItem, Chip
} from '@mui/material';

const rows = [
  { employee: 'John Doe', callType: 'Outgoing', duration: '5:23', timestamp: '22 March 2024, 3:45 PM', sentimentScore: 'Positive' },
  { employee: 'Jane Smith', callType: 'Incoming', duration: '8:10', timestamp: '21 March 2024, 1:15 PM', sentimentScore: 'Neutral' },
  { employee: 'Chris Adams', callType: 'Missed', duration: '0:00', timestamp: '20 March 2024, 4:10 PM', sentimentScore: 'Negative' },
  { employee: 'Diana Prince', callType: 'Outgoing', duration: '2:45', timestamp: '19 March 2024, 11:10 AM', sentimentScore: 'Positive' },
];

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

const CallLogTable = () => {
  const [filters, setFilters] = useState({ callType: '', employee: '' });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredRows = rows.filter(row => (
    (!filters.callType || row.callType === filters.callType) &&
    (!filters.employee || row.employee.includes(filters.employee))
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
            {filteredRows.map((row, index) => (
              <TableRow key={index} hover>
                <TableCell>{row.employee}</TableCell>
                <TableCell>
                  <Chip 
                    label={row.callType} 
                    sx={{
                      ...getStatusColor(row.callType),
                      padding: '5px 10px',
                      borderRadius: '10px',
                      color: getStatusColor(row.callType).color // Ensure text color is set dynamically
                    }} 
                    className='font-semibold'
                  />
                </TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>{row.timestamp}</TableCell>
                <TableCell>{row.sentimentScore}</TableCell>
                <TableCell>
                  <Button variant="text" sx={{ color: '#2979ff' }}>Play</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CallLogTable;
