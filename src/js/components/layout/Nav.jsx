/* global location localStorage*/
import React from 'react';
import { IndexLink, Link } from 'react-router';

// Nav Component
const Nav = (props) => {
  /**
   * Logs out user from website
   * @param {event} e Takes in onClick event
   */
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('User');
    location.reload();
  };
  const img = props.info.imageURL;
  const name = props.info.name;
  return (
    <div>
      <ul id="dropdown1" className="dropdown-content">
        <li><img className="pic" src={img} alt="profile" />
        </li>
        <li className="divider" />
        <li ><Link to="/logout" onClick={logout}>Logout</Link></li>
      </ul>
      <nav>
        <div className="nav-wrapper teal lighten-1">
          <a href="#!" className="brand-logo">E-News</a>
          <a href="#!" data-activates="mobile-demo" className="button-collapse">
            <img className="pic" src={img} alt="profile" />
          </a>
          <ul className="right hide-on-med-and-down">
            <li><IndexLink to="/">Home</IndexLink></li>

            <li><a className="dropdown-button" href="#!" data-activates="dropdown1">
              {name}<i className="material-icons right">
                arrow_drop_down
                </i>
            </a>
            </li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li><Link to="/">Home</Link></li>
            <li className="divider" />
            <li> <Link to="/logout" onClick={logout}>Logout</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
