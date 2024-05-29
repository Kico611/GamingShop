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
import { Route, Routes } from 'react-router-dom';
import { CartProvider } from './CartContext';

function App() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <CartProvider>
            <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <Menu onCategoryChange={handleCategoryChange} />
            <Routes>
                <Route path="/" element={[<Ads key="ads"/>, <Main key="main" selectedCategory={selectedCategory} />]} />
                <Route path="/mouse" element={[<Ads key="ads"/>, <Main key="main" selectedCategory={1} />]} />
                <Route path="/headphone" element={[<Ads key="ads"/>, <Main key="main" selectedCategory={3} />]} />
                <Route path="/keyboard" element={[<Ads key="ads"/>, <Main key="main" selectedCategory={2} />]} />
                <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
        </CartProvider>
    );
}

export default App;

