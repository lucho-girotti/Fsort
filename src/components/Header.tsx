import React from 'react';
import logo from '../assets/logo.svg';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Fsort</h1>
      </div>
    </header>
  );
};

export default Header;