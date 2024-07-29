import React, { useState } from 'react';
import { TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

export default function AddForm({ handleClose, refreshData }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('guest');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    return password.length >= minLength && hasNumber.test(password) && hasSpecialChar.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};

    if (username.length < 3) {
      errors.username = 'Username must be at least 3 characters long';
    }
    if (!validatePassword(password)) {
      errors.password = 'Password must be at least 8 characters long and contain a number and a special character.';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await fetch('http://gamingshop.studenti.sum.ba/createUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Username: username, Password: password, Role: role }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('User created successfully!');
        setTimeout(() => {
          setMessage('');
          handleClose(); // Close modal after successful creation
          refreshData(); // Refresh the list of users
        }, 2000); // Close after 2 seconds
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <Box sx={{ position: 'relative', padding: 2 }}>
      <button
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          color: 'rgba(0, 0, 0, 0.54)', // Adjust color to match your theme
        }}
      >
        &times;
      </button>
      <Typography variant="h5" gutterBottom>
        Create User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Role"
          >
            <MenuItem value="guest">guest</MenuItem>
            <MenuItem value="admin">admin</MenuItem>
            <MenuItem value="superadmin">superadmin</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create User
        </Button>
      </form>
      {message && <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
}

