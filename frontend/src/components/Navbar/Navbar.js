import React from 'react';
import logo from '../assets/logo.png';
import cart from '../assets/shopping-cart.png';
import user from '../assets/user.png';
import '../Navbar/Navbar.css';
import { Link } from 'react-router-dom';

function Navbar({ loggedIn, setLoggedIn }) {
    const handleLogout = () => {
        setLoggedIn(false);
    };

    return (
        <nav className='navbar'>
            <div className='container'>
                <img src={logo} alt='Logo' className='logo' height="80" width="120" />
                {loggedIn ? (
                    <button className='login' onClick={handleLogout}>Logout</button>
                ) : (
                    <Link to='/login'>
                        <button className='login'>Login/Register</button>
                    </Link>
                )}
                <img className='user' src={user} alt='User' height="50" width="50" />
                <Link to='/cart'>
                    <img className='cart-logo' src={cart} alt='Cart' height="50" width="60" />
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
