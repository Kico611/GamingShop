import SideNav from './SideNav';
import Box from '@mui/material/Box';
import UserList from './UserList';
function Users(){
    return(
    <Box sx={{ display: 'flex' }}>
        <SideNav />
        <UserList />
    </Box>
    );
}
export default Users;