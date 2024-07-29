import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Menu from './components/Menu/Menu';
import Ads from './components/Ads/Ads';
import Main from './components/Main/Main';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import Contact from './components/Contact/Contact';
import Cart from './components/Cart/Cart';
import Admin from './components/Admin/Admin';
import Products from './components/Admin/Products';
import Users from './components/Admin/Users';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CartProvider } from './CartContext';
import { UserProvider } from './UserContext'; // Import UserProvider

function App() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };
    const [loggedIn, setLoggedIn] = useState(false);

    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <CartProvider>
            <UserProvider> {/* Wrap with UserProvider */}
                {!isAdminRoute && <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
                {!isAdminRoute && <Menu onCategoryChange={handleCategoryChange} />}
                <Routes>
                    <Route path="/" element={[<Ads key="ads" />, <Main key="main" selectedCategory={selectedCategory} />]} />
                    <Route path="/mouse" element={[<Ads key="ads" />, <Main key="main" selectedCategory={1} />]} />
                    <Route path="/headphone" element={[<Ads key="ads" />, <Main key="main" selectedCategory={3} />]} />
                    <Route path="/keyboard" element={[<Ads key="ads" />, <Main key="main" selectedCategory={2} />]} />
                    <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin/products" element={<Products />} />
                    <Route path="/admin/users" element={<Users />} />
                </Routes>
                {!isAdminRoute && <Footer />}
            </UserProvider>
        </CartProvider>
    );
}

export default App;
