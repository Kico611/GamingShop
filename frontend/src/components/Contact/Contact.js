import React from 'react';
import '../Contact/Contact.css';
function Contact(){
    return(
    <>
    <div className='contact'>
        <div className='contact-info'>
            <h1 className="contact-us">Contact Us</h1>
            <p className='contact-desc'>Welcome to Level Up, where gaming enthusiasts <br></br>come together to experience the thrill of intense shooting games.<br></br> We value your feedback, questions, and suggestions, and we're here to <br></br>assist you in any way we can.
            <br></br>Customer Support:<br></br>
                  Our dedicated customer support team is ready to address your inquiries and concerns.</p>
            <div className='contact-ape'>  
                <p>Adress: Ulica Matice Hrvatske</p>
                <p>Phone: +387 63 431 241</p>
                <p>Email: levelup@gmail.com</p>
            </div> 
        </div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2901.5087407654573!2d17.794202775640073!3d43.34546797228062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134b43baf0325777%3A0xec9b6e4c7d5a9bfc!2sSveu%C4%8Dili%C5%A1te%20u%20Mostaru!5e0!3m2!1shr!2sba!4v1706035247603!5m2!1shr!2sba" className='map'></iframe>
    </div>
    </>
    );
}
export default Contact;