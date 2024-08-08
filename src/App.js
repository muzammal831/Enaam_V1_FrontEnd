import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DashboardRoutes } from './Dashboard/index.js'
import UserSide from './UserSide/index.js';
import { AppProvider } from './UserSide/Services/AppContext.js';


function App() {
    return (

        <AppProvider>
            <Router>
                <UserSide />
                <DashboardRoutes />
            </Router>
        </AppProvider>
    );
}

export default App;