import React from 'react';
import './CustomModal.css'; // Import custom styles for the modal

const CustomModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // Don't render anything if the modal is closed

    return (
        <div className="custom-modal-overlay" onClick={onClose}>
            <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="custom-modal-close" onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
};

export default CustomModal;
