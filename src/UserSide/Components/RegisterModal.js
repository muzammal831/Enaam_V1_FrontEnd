// src/components/modals/RegisterModal.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Styles.css'; // Import any custom CSS for styling if needed
import Register from '../../Dashboard/Register';

const RegisterModal = () => {
    return (
        <div
            className="modal fade"
            id="modalRegisterForm"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modalRegisterFormLabel"
            aria-hidden="true"
            data-backdrop="false"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalRegisterFormLabel">Register</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Register />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterModal;
