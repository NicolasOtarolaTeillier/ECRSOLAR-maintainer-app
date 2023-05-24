import React, { useState } from 'react';
import { Modal } from "@mui/material";

function ModalPlanning() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="Modal">
      <button onClick={handleOpenModal}>Abrir modal</button>
      
      {modalVisible && <Modal open={modalVisible} onClose={handleCloseModal}></Modal>}
    </div>
  );
}

export default ModalPlanning;
