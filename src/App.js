import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Beveragelog from "./components/beveragelog.component";
import AddBeveragelog from "./components/addbeveragelog.component";
import Navbar from './components/navbar.component';

function App() {
  return (

    <div className="container">

      <Router>

        <Navbar />
        <Route path="/" exact component={Beveragelog} />
        <Route path="/add" exact component={AddBeveragelog} />

      </Router>

    </div>

  );
}

export default App;
