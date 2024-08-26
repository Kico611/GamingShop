import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'superadmin', label: 'Super Admin' },
  { value: 'guest', label: 'Guest' },
];

const EditUser = ({ handleClose, refreshData, userId }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/getUser/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        setUsername(data.username || '');
        setPassword(data.password); 
        setRole(data.role || '');
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !role) {
      alert('Username and Role are required.');
      return;
    }

    const userData = {
      Username: username,
      Password: password, // Only include password if it was changed
      Role: role,
    };

    try {
      const response = await fetch(`/updateUser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        await refreshData(); // Refresh data after updating
        handleClose(); // Close the modal
      } else {
        const error = await response.json();
        alert(`Failed to update user: ${error.message}`);
      }
    } catch (error) {
      alert(`Error updating user: ${error.message}`);
    }
  };

  // Render a loading indicator or form based on the loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <h2>Edit User</h2>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        // Consider making password optional or hiding it if not being changed
      />
      <FormControl required sx={{ minWidth: 120 }}>
        <InputLabel>Role</InputLabel>
        <Select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          label="Role"
        >
          {roleOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">
        Update User
      </Button>
    </Box>
  );
};

export default EditUser;
