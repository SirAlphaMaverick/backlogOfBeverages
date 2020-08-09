import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Beveragelog from "./components/beveragelog.component";
import AddBeveragelog from "./components/addbeveragelog.component";
import Navbar from './components/navbar.component';
import SearchDrug from './components/searchdrug.component'

function App() {
  return (

    <div>

      <Router>

        <Navbar />
        <Route path="/" exact component={Beveragelog} />
        <Route path="/add" exact component={AddBeveragelog} />
        <Route path="/drug" exact component={SearchDrug} />
        
      </Router>

    </div>

  );
}

export default App;
