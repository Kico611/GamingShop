import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const categoryOptions = [
  { value: 3, label: 'Headphone' },
  { value: 2, label: 'Keyboard' },
  { value: 1, label: 'Mouse' },
];

const EditProduct = ({ handleClose, refreshData, productId }) => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://gamingshop.studenti.sum.ba/getProduct/${productId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProductName(data.Name);
        setCategory(data.CategoryID);
        setBrand(data.Brand);
        setDescription(data.Description);
        setPrice(data.Price);
        setColor(data.Color);
        setStockQuantity(data.StockQuantity);
        setExistingImage(data.Image || null); // Save existing image
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productId]);

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

    if (image) {
      formData.append('Image', image);
    } else if (existingImage) {
      formData.append('ExistingImage', existingImage);
    }

    try {
      const response = await fetch(`http://gamingshop.studenti.sum.ba/updateProduct/${productId}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update product');
      }

      await refreshData();
      handleClose();
    } catch (error) {
      alert(`Error updating product: ${error.message}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <TextField
        label="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
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
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Stock Quantity"
        type="number"
        value={stockQuantity}
        onChange={(e) => setStockQuantity(e.target.value)}
        fullWidth
        margin="normal"
      />
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files[0]) {
            setImage(e.target.files[0]);
          }
        }}
      />
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button onClick={handleClose} variant="outlined" color="secondary" sx={{ ml: 2 }}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditProduct;