import React from 'react';
import './ConfirmDelete.css'; // Import the CSS file

const ConfirmDelete = ({ show, handleClose, handleConfirm, message }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Confirmar</h2>
          <button className="close-button" onClick={handleClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={handleConfirm}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;