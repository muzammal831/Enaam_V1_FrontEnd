import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css'; // If you're using Font Awesome for icons
import '../css/Styles.css'; // Import any custom CSS for styling if needed

const Header = () => {
    return (
        <header id="site-header" className="fixed-top">
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg stroke">
                    {/* Logo */}
                    <a className="navbar-brand" href="/">
                        <img src={require("../images/logo.png")} alt="Enaam.pk" title="Enaam" style={{ height: '69px', marginLeft: 10 }} />
                    </a>

                    {/* Toggler */}
                    <button className="navbar-toggler collapsed bg-gradient" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon fa icon-expand fa-bars"></span>
                        <span className="navbar-toggler-icon fa icon-close fa-times"></span>
                    </button>

                    {/* Desktop Navigation */}
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
                                <a className="nav-link" href="/winners">Winners</a>
                            </li>
                            {/* <li className="nav-item">
                                <p>&nbsp;&nbsp;&nbsp;</p>
                            </li> */}
                            <li className="nav-item align-items-center x-efeected-li">
                                <div id="userState" className="d-flex align-items-center">
                                    <img id="user-image" src={require("../images/user-icon.png")} alt="User Profile" title="" className="rounded-circle" style={{ height: '30px' }} />
                                    <a id="login-link" href="" className="nav-link" data-toggle="modal" data-target="#modalLoginForm">Login</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Google Translate */}
                    {/* <div className="translate-box">
                        <div id="google_translate_elementone"></div>
                        <script type="text/javascript">
                            function googleTranslateElementInit() {
                                new window.google.translate.TranslateElement({
                                    pageLanguage: 'en', includedLanguages: 'en,ur', autoDisplay: false,
                                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
                                }, 'google_translate_elementone')
                            }
                        </script>
                    </div> */}

                    {/* Mobile Navigation */}
                    <div className="collapse navbar-collapse on-mobile" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-lg-auto">
                            <li className="nav-item">
                                <div id="google_translate_element"></div>
                            </li>
                            <li className="nav-item">
                                <div id="mobUserState" className="d-flex align-items-center">
                                    <a href="profile.php">
                                        <img id="mob-user-image" src={require("../images/user-icon.png")} alt="User Profile" title="" className="rounded-circle" style={{ height: '30px' }} />
                                    </a>
                                    <a href="profile.php">
                                        <span id="mob-user-name"></span>
                                    </a>
                                    <a id="mob-login-link" href="" className="nav-link" data-toggle="modal" data-target="#modalLoginForm">Login</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="prizes.php">Prizes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="winner-list.php">Winners</a>
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
        </header>
    );
};

export default Header;
