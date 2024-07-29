import {Routes,Route} from 'react-router-dom';
import SideNav from './SideNav';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiDrawer from '@mui/material/Drawer';

function Admin(){
    return(
    <Box sx={{ display: 'flex' }}>
        <SideNav />
    </Box>
    );
}
export default Admin;
