import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const categoryOptions = [
  { value: 3, label: 'Headphone' },
  { value: 2, label: 'Keyboard' },
  { value: 1, label: 'Mouse' },
];

const AddProduct = ({ handleClose, refreshData }) => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!productName || !category) {
      alert('Product Name and Category are required.');
      return;
    }

    const formData = new FormData();
    formData.append('ProductName', productName);
    formData.append('CategoryID', category);
    formData.append('Brand', brand);
    formData.append('Description', description);
    formData.append('Price', parseFloat(price) || null);
    formData.append('Color', color || null);
    formData.append('StockQuantity', parseInt(stockQuantity) || null);
    formData.append('Image', image || null);

    try {
      const response = await fetch('/addProduct', { // Ensure this URL is correct
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await refreshData(); // Refresh data after adding
        handleClose(); // Close the modal
      } else {
        const error = await response.json();
        alert(`Failed to add product: ${error.message}`);
      }
    } catch (error) {
      alert(`Error adding product: ${error.message}`);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <h2>Add Product</h2>
      <TextField
        label="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />
      <FormControl required sx={{ minWidth: 120 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        >
          {categoryOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Price"
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextField
        label="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <TextField
        label="Stock Quantity"
        type="number"
        value={stockQuantity}
        onChange={(e) => setStockQuantity(e.target.value)}
      />
      <input
        accept="image/*"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <Button type="submit" variant="contained">
        Add Product
      </Button>
    </Box>
  );
};

export default AddProduct;
