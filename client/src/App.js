import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/Home";
import Contratos from "./components/Contratos";

class App extends Component {
  render() {
      let styles = {
          marginLeft: '10px',
      };
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/home" className="navbar-brand" style={styles}>
            Home
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/contratos"} className="nav-link">
                Contratos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Agregar
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contratos" element={<Contratos />} />
            {/* <Route exact path="/add" component={AddTutorial} />
            <Route path="/tutorials/:id" component={Tutorial} /> */}
          </Routes>
        </div>
      </div>

      // <Routes>
      //     <Route path="/" element={<Home />} />
      // </Routes>
    );
  }
}

export default App;
