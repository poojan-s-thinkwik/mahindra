import React from "react";
import { Modal, Button } from "rsuite";

interface ConfirmModalProps {
  show: boolean;
  message: string;
  onClose: (result: boolean) => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ show, message, onClose }) => {
  return (
    <Modal open={show} onClose={() => onClose(false)} size="xs">
      <Modal.Header>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onClose(true)} appearance="primary">
          Yes
        </Button>
        <Button onClick={() => onClose(false)} appearance="subtle">
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
