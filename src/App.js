import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  {DashboardRoutes}from './Dashboard/index.js'
import UserSide from './UserSide/index.js';


function App() {
    return (
        <Router>
            <UserSide/>
            <DashboardRoutes/>
        </Router>
    );
}

export default App;