import React from 'react';

const Footer = () => {
    return (
        <footer style={FooterStyle}>
            <h1>Copyrights (c)</h1>
        </footer>
    );
}

const FooterStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px',
    clear: 'both'
}

export default Footer;