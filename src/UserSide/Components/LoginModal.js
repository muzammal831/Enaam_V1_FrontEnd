


// src/components/modals/LoginModal.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Styles.css'; // Import any custom CSS for styling if needed
import Login from '../../Dashboard/Login';
import RegisterModal from './RegisterModal'; // Import the RegisterModal

const LoginModal = () => {
    return (
        <>
            <div
                className="modal fade"
                id="modalLoginForm"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="modalLoginFormLabel"
                aria-hidden="true"
                data-backdrop="false"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLoginFormLabel">Login</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Login />
                            <p className="mt-3">
                                Don't have an account? <a href="#modalRegisterForm" data-toggle="modal" data-dismiss="modal">Register here</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Register Modal */}
            <RegisterModal />
        </>
    );
};

export default LoginModal;
