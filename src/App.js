import React from "react";
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import { useState} from "react";

import "./styles/footer.css";
import "./styles/login.css";
import "./styles/main.css";
import "./styles/navbar.css";
import "./styles/dashboard.css";
import "./styles/pagination.css";

import Login from "./pages/Login";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {

    const [showButton, setShowButton] = useState("");
    
    return(
        <div className="page">
            <BrowserRouter>
                <Navbar showButton = {showButton}/>
                <Switch>
                    <Route exact path="/">
                        <Login setShowButton = {setShowButton}/>
                    </Route>
                    <Route path="/dashboard">
                        <Dashboard setShowButton = {setShowButton}/>
                    </Route>
                    <Redirect to = {Login} />
                </Switch>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default App;
