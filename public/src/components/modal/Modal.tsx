import { ReactNode, useEffect, useState } from 'react';
import { Modal } from 'rsuite';

interface ModalProps {
  backdrop: boolean | 'static' | undefined;
  toggleModal: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const IModal: React.FC<ModalProps> = ({
  backdrop,
  toggleModal,
  onClose,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(toggleModal);
  useEffect(() => {
    setIsOpen(toggleModal);
  }, [toggleModal]);
  return (
    <Modal
      backdrop={backdrop || 'static'}
      keyboard={false}
      open={toggleModal}
      onClose={onClose}
      className={`modal-dialog ${isOpen ? 'modal-enter' : 'modal-exit'}`}
    >
      {children}
    </Modal>
  );
};

export default IModal;
