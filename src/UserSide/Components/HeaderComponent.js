import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomModal from './CustomModal'; // Import the CustomModal component
import Logout from '../../Dashboard/Logout'; // Import the Logout component
import Login from '../../Dashboard/Login';
import Register from '../../Dashboard/Register'; // Import the Register component
import { useApp } from '../Services/AppContext';
import '../css/Styles.css'; // Import any custom CSS for styling if needed

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const { userData, logout } = useApp();


    useEffect(() => {
        const mainContent = document.getElementById('main-content');
        if (isModalOpen) {
            mainContent.classList.add('blurred');
        } else {
            mainContent.classList.remove('blurred');
        }
    }, [isModalOpen]);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const toggleComponent = () => {
        setShowLogin(!showLogin);
    };

    return (
        <>
            <header id="site-header" className="fixed-top">
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg stroke">
                        <a className="navbar-brand" href="/">
                            <img src={require("../images/logo.png")} alt="Enaam.pk" title="Enaam" style={{ height: '69px', marginLeft: 10 }} />
                        </a>
                        <button className="navbar-toggler collapsed bg-gradient" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon fa icon-expand fa-bars"></span>
                            <span className="navbar-toggler-icon fa icon-close fa-times"></span>
                        </button>
                        <div className="collapse navbar-collapse on-desktop" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-lg-auto">
                                <li className="nav-item">
                                    Need help? Contact Us <a href="tel:+924235131693">Call +92-42-35 131 693</a>
                                </li>
                            </ul>
                        </div>
                        <div className="collapse navbar-collapse on-desktop" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-lg-auto main-menu">
                                <li className="nav-item">
                                    <a className="nav-link" href="/prizes">Prizes</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/recentLuckyDraws">Winners</a>
                                </li>
                                <li className="nav-item dropdown align-items-center x-efeected-li">
                                    <div id="userState" className="d-flex align-items-center">
                                        {userData ? (
                                            <>
                                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                                                    <img id="user-image" src={require("../images/user-icon.png")} alt="User Profile" title={userData.name} className="rounded-circle" style={{ height: '30px' }} />
                                                    <span>{userData.name}</span>
                                                </a>
                                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <a className="dropdown-item" href="/profileScreen">Profile</a>
                                                    <a className="dropdown-item" href="#" onClick={() => { logout() }}>Logout</a>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <a href="/profile">
                                                    <img id="mob-user-image" src={require("../images/user-icon.png")} alt="User Profile" className="rounded-circle" style={{ height: '30px', }} />
                                                </a>
                                                <a id="mob-login-link" href="#" className="nav-link" onClick={handleModalOpen}>Login</a>
                                            </>
                                        )}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="collapse navbar-collapse on-mobile" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-lg-auto">
                                <li className="nav-item">
                                    <div id="google_translate_element"></div>
                                </li>
                                <li className="nav-item">
                                    <div id="mobUserState" className="d-flex align-items-center">
                                        {userData ? (
                                            <>
                                                <a href="/profile">
                                                    <img id="mob-user-image" src={require("../images/user-icon.png")} alt="User Profile" title={userData.name} className="rounded-circle" style={{ height: '30px', }} />
                                                </a>
                                                <a href="/profile">
                                                    <span id="mob-user-name" >{userData.name}</span>
                                                </a>
                                                <Logout />
                                            </>
                                        ) : (
                                            <>
                                                <a href="/profile">
                                                    <img id="mob-user-image" src={require("../images/user-icon.png")} alt="User Profile" className="rounded-circle" style={{ height: '30px', }} />
                                                </a>
                                                <a id="mob-login-link" href="#" className="nav-link" onClick={handleModalOpen}>Login</a>
                                            </>
                                        )}
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/prizes">Prizes</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/recentLuckyDraws">Winners</a>
                                </li>
                                <li className="nav-item">
                                    Need help? Contact Us
                                </li>
                                <li>
                                    <a href="tel:+924235131693">Call +92-42-35 131 693</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                <CustomModal isOpen={isModalOpen} onClose={handleModalClose}>
                    <div>
                        {showLogin ? <Login /> : <Register />}
                        <button
                            onClick={toggleComponent}
                            className="btn btn-link mt-2"
                            style={{ textDecoration: 'underline', color: '#007bff', cursor: 'pointer' }}
                        >
                            {showLogin ? 'Don\'t have an account? Go to Register' : 'Already have an account? Go to Login'}
                        </button>
                    </div>
                </CustomModal>
            </header>
            <div id="main-content">
                {/* Main content goes here */}
            </div>
        </>
    );
};

export default Header;
