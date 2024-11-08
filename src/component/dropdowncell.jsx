import { MenuItem, Select } from '@mui/material';
import React, { useState, useEffect } from 'react';

export const DropdownCell = ({ row, onChange, isEditable }) => {
  const [selectedValue, setSelectedValue] = useState(row.reason);

  useEffect(() => {
    setSelectedValue(row.reason); // Sync selected value with row's reason
  }, [row.reason]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(row.id, newValue); // Notify parent component of the change
  };

  return (
    // <div style={{ display: 'flex', alignItems: 'center' }}>
      <Select
        value={selectedValue}
        onChange={handleChange}
        disabled={!isEditable} 
        fullWidth
      >
        <MenuItem value="">Select a reason</MenuItem>
        <MenuItem value="accepted">Accepted</MenuItem>
        <MenuItem value="rejected">Rejected</MenuItem>
        <MenuItem value="modify">Modify</MenuItem>
        {/* Add other options as needed */}
      </Select>
    // </div>
  );
};
