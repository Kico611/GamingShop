import React, { useState, useEffect, useCallback } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Swal from 'sweetalert2'; // Ensure you have sweetalert2 installed
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddForm from './AddForm'; // Ensure the path is correct
import EditUser from './EditUser'; // Ensure the path is correct

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

const columns = [
  { id: 'UserID', label: 'UserID', minWidth: 100 },
  { id: 'Username', label: 'Username', minWidth: 170 },
  { id: 'Password', label: 'Password', minWidth: 170 },
  { id: 'role', label: 'Role', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 150, align: 'left' },
];

// Define enum to text mapping
const roleMapping = {
  'guest': 'Guest',
  'admin': 'Administrator',
  'superadmin': 'Super Administrator'
};

export default function UserList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(13);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditOpen = (id) => {
    setEditUserId(id);
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/korisnici'); // Adjust URL as needed
      if (!response.ok) throw new Error('Network response was not ok');
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
    handleEditOpen(id);
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
        const response = await fetch(`/deleteUser/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await fetchData(); // Refresh data after deletion
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
        } else {
          Swal.fire('Error!', 'Failed to delete user.', 'error');
        }
      } catch (error) {
        Swal.fire('Error!', 'An error occurred while deleting the user.', 'error');
      }
    }
  };

  // Function to filter data based on search query
  const handleSearch = (event, value) => {
    setSearchQuery(value);
    if (value) {
      const filtered = rows.filter(row =>
        row.Username.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRows(filtered);
    } else {
      setFilteredRows(rows);
    }
  };

  const handleAdd = () => {
    console.log('Add new user');
    // Implement add functionality here, e.g., open a form or dialog
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose} // Ensure modal closes when clicking outside
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddForm handleClose={handleClose} refreshData={fetchData} /> {/* Pass fetchData as a prop */}
        </Box>
      </Modal>

      <Modal
        open={editOpen}
        onClose={handleEditClose} // Ensure modal closes when clicking outside
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditUser handleClose={handleEditClose} refreshData={fetchData} userId={editUserId} /> {/* Pass fetchData and userId as props */}
        </Box>
      </Modal>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: '20px' }}
        >
          Users List
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack direction="row" spacing={2} className="my-2 mb-2">
          <Autocomplete
            disablePortal
            id="search-user"
            options={rows}
            sx={{ width: 300 }}
            onInputChange={handleSearch}
            getOptionLabel={(option) => option.Username || ""}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Search Users" />
            )}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.UserID}>
                    {columns.map((column) => {
                      const value = row[column.id] || 'N/A'; // Default to 'N/A' if value is missing

                      // Map enum value to readable text
                      const displayValue = column.id === 'role'
                        ? roleMapping[value] || 'Unknown'
                        : value;

                      return column.id === 'action' ? (
                        <TableCell key={column.id} align={column.align}>
                          <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: '20px',
                                color: 'blue',
                                cursor: 'pointer',
                              }}
                              onClick={() => handleEdit(row.UserID)}
                            />
                            <DeleteIcon
                              style={{
                                fontSize: '20px',
                                color: 'darkred',
                                cursor: 'pointer',
                              }}
                              onClick={() => handleDelete(row.UserID)}
                            />
                          </Stack>
                        </TableCell>
                      ) : (
                        <TableCell
                          key={column.id}
                          align={column.align || 'left'}
                        >
                          {displayValue}
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

