import SideNav from './SideNav';
import Box from '@mui/material/Box';
import ProductList from './ProductList';
function Products(){
    return(
    <Box sx={{ display: 'flex' }}>
        <SideNav />
        <ProductList />
    </Box>
    );
}
export default Products;
