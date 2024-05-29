import React from 'react';
import '../Menu/Menu.css';
import {Link} from 'react-router-dom';

function Menu({ onCategoryChange }){

    return(
    <>
        <section className='menu-bar'>
            <div className='menu'>
            <ul>
            <li><Link to="/"><a onClick={() => onCategoryChange('0')}>HOME</a></Link></li>
            <li><Link to="/mouse" style={{ textDecoration: 'none', textAlign: 'center' }}><a onClick={() => onCategoryChange('1')}>MICE</a></Link></li>
            <li><Link to="/keyboard" style={{ textDecoration: 'none', textAlign: 'center' }}><a onClick={() => onCategoryChange('2')}>KEYBOARD</a></Link></li>
            <li><Link to="/headphone" style={{ textDecoration: 'none', textAlign: 'center' }}><a onClick={() => onCategoryChange('3')}>HEADPHONE</a></Link></li>
            <li><Link to="/contact" style={{ textDecoration: 'none', textAlign: 'center' }}><a>CONTACT</a></Link></li>
            </ul>
            </div>
        </section>
    </>
    );
}

export default Menu;