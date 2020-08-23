import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from './logo-main.png'
class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed" style={{ boxShadow: '1px 0px 3px rgb(41, 36, 42,0.9)'}} >
        <nav className="z-depth-0">
          <div className="nav-wrapper white" >
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className=""
            >
              <img className="img-fluid" src={logo} alt="" width='200px' height='50px'/>
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;