import React from 'react';
import ad1 from '../assets/Ad1.webp'
import ad2 from '../assets/Ad2.jpg' 
import '../Ads/Ads.css'
function Ads(){
    return(
        <div className='ads'>
            <img className='ad1' src={ad1} alt="ad1" height="350"/>
            <img className='ad2' src={ad2} alt="ad2" height="350"/>
        </div>
    );
}
export default Ads;