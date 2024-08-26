import React, { useState, useEffect, useCallback } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, TextField, Button, Divider, Box, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from '@mui/material/Modal';
import AddProduct from './AddProduct';
import EditProduct from './EditProducts'; // Import EditProduct component
import Swal from 'sweetalert2';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Define column configuration
const columns = [
  { id: 'ProductID', label: 'ProductID', minWidth: 170 },
  { id: 'Name', label: 'Name', minWidth: 170 },
  { id: 'Brand', label: 'Brand', minWidth: 100 },
  {
    id: 'Price',
    label: 'Price',
    minWidth: 170,
    align: 'right',
    format: (value) =>
      value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }),
  },
  {
    id: 'StockQuantity',
    label: 'Stock Quantity',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'CategoryID',
    label: 'Category',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 150,
    align: 'left',
  },
];

// Define category ID to name mapping
const categoryMap = {
  1: 'Mouse',
  2: 'Keyboard',
  3: 'Headphone',
};

export default function ProductList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(13);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleOpenAdd = () => setAddOpen(true);
  const handleCloseAdd = () => setAddOpen(false);

  const handleOpenEdit = (id) => {
    setSelectedProductId(id);
    setEditOpen(true);
  };
  const handleCloseEdit = () => {
    setSelectedProductId(null);
    setEditOpen(false);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/dohvati'); // Adjust URL as needed
      const data = await response.json();
      console.log('Fetched data:', data); // Log data to check structure
      setRows(data);
      setFilteredRows(data); // Initialize filtered rows with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (id) => {
    handleOpenEdit(id);
  };

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        const response = await fetch(`/deleteProduct/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setRows(rows.filter(row => row.ProductID !== id));
          setFilteredRows(filteredRows.filter(row => row.ProductID !== id));
          Swal.fire('Deleted!', 'Product has been deleted.', 'success');
        } else {
          Swal.fire('Error!', 'Failed to delete product.', 'error');
        }
      } catch (error) {
        Swal.fire('Error!', 'An error occurred while deleting the product.', 'error');
      }
    }
  };

  // Function to filter data based on search query
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query) {
      const filtered = rows.filter(row =>
        row.Name.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredRows(filtered);
    } else {
      setFilteredRows(rows);
    }
  };

  return (
    <>
      <Modal
        open={addOpen}
        onClose={handleCloseAdd} // Ensure modal closes when clicking outside
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <AddProduct handleClose={handleCloseAdd} refreshData={fetchData} />
        </Box>
      </Modal>

      <Modal
        open={editOpen}
        onClose={handleCloseEdit} // Ensure modal closes when clicking outside
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          {selectedProductId && (
            <EditProduct
              handleClose={handleCloseEdit}
              refreshData={fetchData}
              productId={selectedProductId}
            />
          )}
        </Box>
      </Modal>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: '20px' }}
        >
          Products List
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack direction="row" spacing={2} className="my-2 mb-2">
          <TextField
            size="small"
            label="Search Products"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            sx={{ width: 300 }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpenAdd}>
            Add
          </Button>
        </Stack>
        <Box height={10} />
        <TableContainer sx={{ maxHeight: 1000 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.ProductID}>
                    {columns.map((column) => {
                      let value = row[column.id];

                      if (column.id === 'CategoryID') {
                        const categoryId = parseInt(value, 10);
                        value = !isNaN(categoryId) && categoryMap[categoryId]
                          ? categoryMap[categoryId]
                          : 'Unknown';
                      }

                      return column.id === 'action' ? (
                        <TableCell key={column.id} align={column.align}>
                          <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: '20px',
                                color: 'blue',
                                cursor: 'pointer',
                              }}
                              onClick={() => handleEdit(row.ProductID)}
                            />
                            <DeleteIcon
                              style={{
                                fontSize: '20px',
                                color: 'darkred',
                                cursor: 'pointer',
                              }}
                              onClick={() => handleDelete(row.ProductID)}
                            />
                          </Stack>
                        </TableCell>
                      ) : (
                        <TableCell
                          key={column.id}
                          align={column.align || 'left'}
                        >
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

