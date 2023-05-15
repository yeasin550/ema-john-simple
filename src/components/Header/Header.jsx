import React, { useContext } from 'react';
import './Header.css'
import logo from "../../images/Logo.svg"
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Header = () => {
  const { user, loggedOut } = useContext(AuthContext);

  const handleLogOut = () => {
    loggedOut()
      .then(() => { })
    .catch(error => console.log(error))
  }


    return (
      <nav className="header">
        <img src={logo} alt="" />
        <div>
          <Link to="/">Shop</Link>
          <Link to="/orders">Order Review</Link>
          <Link to="/inventory">Manage Inventory</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          {user && (
            <span className="text-white">
              Welcome {user.email}{" "}
              <button className="glow-on-hover" onClick={handleLogOut}>
                Sign Up
              </button>{" "}
            </span>
          )}
        </div>
      </nav>
    );
};

export default Header;