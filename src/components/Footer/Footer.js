import React from 'react';
import './Footer.css';


const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="static-bottom">
            <p>Alexander Gudkov Technologies. All rights reserved ⓒ {year}</p>
        </footer>
    )
}

export default Footer;