import React from "react";
import { Link, useHistory } from "react-router-dom";

export const Nav = () => {
    const history = useHistory();
    function hapus() {
        sessionStorage.clear();
        history.push('/login')
    }
  return (
    <div className="mt-2 mb-2">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
        <Link to="/admin">
        <a href className="navbar-brand">Dashboard</a>
        </Link>
          
          <li className="nav-item list-unstyled">Email : {sessionStorage.getItem('email')}</li>
          <li className="nav-item list-unstyled">posisi : {sessionStorage.getItem('level')}</li>
            <button onClick={hapus} className="btn btn-outline-success" type="submit">
              Logout
            </button>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
